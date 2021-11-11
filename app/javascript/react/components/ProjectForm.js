import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

const ProjectForm = () => {
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

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  const postProject = async () => {
    const response = await fetch("/api/v1/projects", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({project: formData, user: currentUser})
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
      <h1 className="text-center">Create A Project</h1>
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

export default ProjectForm