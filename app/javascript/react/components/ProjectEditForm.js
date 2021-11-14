import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import ProjectShow from "./ProjectShow"

const ProjectEditForm = props => {
  const { id } = props.match.params

  const [formData, setFormData] = useState({
    name: "",
    description: ""
  })
  
  const [postResponse, setPostResponse] = useState("")

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const fetchProject = async () => {
    const response = await fetch(`/api/v1/projects/${id}`)
    const responseBody = await response.json()
    setFormData(responseBody.project)
  }

  useEffect(() => {
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
      }})
    })
    const responseBody = await response.json()
  setPostResponse(responseBody.response)
  }

  const handleSubmit = event => {
    event.preventDefault()
    postProject()
  }

  if(postResponse.includes("successfully")) {
    return <Redirect to={`/projects/${id}`} />
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
        <input type="submit" className="button" value="Submit" />
      </form>
    </div>
  )
}

export default ProjectEditForm