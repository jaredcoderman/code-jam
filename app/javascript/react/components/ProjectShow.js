import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"

const ProjectShow = props => {
  const { id } = props.match.params
  const [project, setProject] = useState({})
  const [editRedirect, setEditRedirect] = useState(false)
  const [deleteRedirect, setDeleteRedirect] = useState(false)

  const fetchProject = async () => {
    const response = await fetch(`/api/v1/projects/${id}`)
    const responseBody = await response.json()
    setProject(responseBody.project)
  }

  useEffect(() => {
    fetchProject()
  }, [])


  const editFunc = () => {
    setEditRedirect(true)
  }

  const deleteFunc = async () => {
    await fetch(`/api/v1/projects/${project.id}`, {
      method: "DELETE",
    })
    setDeleteRedirect(true)
  }

  if(deleteRedirect) {
    return <Redirect to="/my_projects" />
  }

  if(editRedirect) {
    return <Redirect to={`/projects/${project.id}/edit`} />
  }

  return (
    <div>
      <div className="project-show-header">
        <h1 className="project-show-title black-and-blue-text">{project.name}</h1>
        <h3 className="project-show-desc">{project.description}</h3>
      </div>
      <div className="grid-x text-center">
        <div className="cell small-5" />
        <div className="cell small-1">
            <button className="button" onClick={editFunc}>Edit</button>
          </div>
          <div className="cell small-1">
            <button className="button" onClick={deleteFunc}>Delete</button>
        </div>
      </div>
    </div>

  )
}

export default ProjectShow