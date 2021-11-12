import React, {useEffect, useState} from "react"
import UserProjectTile from "./UserProjectTile"

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

  const projects = fetchedProjects.map(project => {
    return <UserProjectTile key={project.id} project={project} />
  })

  return (
    <div>
      <h1 className="text-center">Projects</h1>
      {projects}
    </div>
  )
}

export default UserProjectIndex