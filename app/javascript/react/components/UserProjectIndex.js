import React, {useEffect, useState} from "react"
import UserProjectTile from "./UserProjectTile"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const UserProjectIndex = () => {
  const [fetchedProjects, setFetchedProjects] = useState([])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/v1/users/projects")
      if(!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const responseBody = await response.json()
      setFetchedProjects(responseBody.projects)
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const reRender = () => {
    fetchProjects()
  }

  const projects = fetchedProjects.map(project => {
    return <UserProjectTile reRender={reRender} key={project.id} project={project} />
  })

  return (
    <div className="grid-container">
      <h1 className="my-projects-title">Projects</h1>
      <div className="grid-x grid-margin-x">
        {projects}
        <div className="callout secondary cell small-6 grid-x new-project-tile">
          <h1 className="new-project-tile">
            <Link to="/host">
              <FontAwesomeIcon icon={faPlusSquare} size="2x" />
            </Link>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default UserProjectIndex