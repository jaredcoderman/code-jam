import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

const ProjectEditForm = props => {
  const { id } = props.match.params

  const [formData, setFormData] = useState({
    name: "",
    description: ""
  })

  const [currentUser, setCurrentUser] = useState({})
  const [postResponse, setPostResponse] = useState("")

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const fetchCurrentUser = async () => {
    const response = await fetch("/api/v1/users/current")
    const responseBody = await response.json()
    setCurrentUser(responseBody.user)
  }

  const fetchProject = async () => {
    const response = await fetch(`/api/v1/projects/${id}`)
    const responseBody = await response.json()
    setFormData(responseBody.project)
  }

  useEffect(() => {
    fetchCurrentUser()
    fetchProject()
  }, [])

  const postProject = async () => {
    const response = await fetch("/api/v1/projects", {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({project: {
        ...formData,
        id: id
      }, user: currentUser})
    })
    const responseBody = await response.json()
  setPostResponse(responseBody.response)
  }

  const handleSubmit = event => {
    event.preventDefault()
    postProject()
  }

  if(postResponse.includes("successfully")) {
    return <Redirect to="/my_projects" />
  }

  return(
    <div>
      <p>{postResponse}</p>
      <h1 className="text-center">Edit</h1>
      <form onSubmit={handleSubmit}>
        <label>
            Name
            <input 
              type="text" 
              name="name" 
              onChange={handleChange} 
              value={formData.name} 
            />
        </label>
        <label>
          Description
          <input 
            type="text" 
            name="description" 
            onChange={handleChange} 
            value={formData.description} 
          />
        </label>
        <input type="submit" className="button" value="Create Project" />
      </form>
    </div>
  )
}

export default ProjectEditForm