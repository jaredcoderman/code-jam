import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import TagSelection from "./TagSelection"

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  })
  const [postResponse, setPostResponse] = useState("")
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const postProject = async () => {
    const response = await fetch("/api/v1/projects", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify({project: formData, tags: {list: selectedTags}}),
      credentials: "same-origin",
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
      <h1 className="project-title black-and-blue-text">Create a Project</h1>
      <TagSelection 
        selectedTags={selectedTags} 
        setSelectedTags={setSelectedTags}  
        tags={tags}
        setTags={setTags}
      />
      <form onSubmit={handleSubmit}>
        <label className="project-label black-and-blue-text">
            Name
            <input 
              type="text" 
              name="name" 
              onChange={handleChange} 
              value={formData.name} 
              className="project-field"
              autoComplete="off"
            />
        </label>
        <label className="project-label black-and-blue-text">
          Description
          <textarea 
            type="text" 
            name="description" 
            onChange={handleChange} 
            value={formData.description} 
            className="project-text-area"
            autoComplete="off"
          />
        </label>
        <input type="submit" className="submit-button black-and-blue-text" value="Create Project" />
      </form>
    </div>
  )
}

export default ProjectForm