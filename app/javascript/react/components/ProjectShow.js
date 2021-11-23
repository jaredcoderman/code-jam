import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import _ from "lodash"

const ProjectShow = props => {
  const { id } = props.match.params
  const [project, setProject] = useState({})
  const [editRedirect, setEditRedirect] = useState(false)
  const [deleteRedirect, setDeleteRedirect] = useState(false)
  const [userRole, setUserRole] = useState("viewer")
  const [joinResponse, setJoinResponse] = useState("")
  const [userRequests, setUserRequests] = useState([])
  const [users, setUsers] = useState([])

  const fetchProject = async () => {
    const response = await fetch(`/api/v1/projects/${id}`)
    const responseBody = await response.json()
    setProject(responseBody.project)
    setUserRole(responseBody.role)
    setUserRequests(responseBody.requests)
    setUsers(responseBody.users)
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

  const postJoin = async event => {
    event.preventDefault()
    const response = await fetch("/api/v1/projects/join", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({project: {id: id}})
    })
    const responseBody = await response.json()
    setJoinResponse(responseBody.response)
  }

  const postAccept = async (userId) => {
    const response = await fetch("/api/v1/projects/accept", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({project: {id: id}, user: {id: userId}})
    })
    const responseBody = response.json()
    if(responseBody.response == "User joined successfully") {
      setUserRole("member")
    }
  }

  if(deleteRedirect) {
    return <Redirect to="/my_projects" />
  }

  if(editRedirect) {
    return <Redirect to={`/projects/${project.id}/edit`} />
  }

  let button  
  if(userRole == "viewer") {
    button = <button onClick={postJoin} className="button">JOIN</button>
  }
  let requests
  if(userRole == "owner") {
    requests = userRequests.map(request => {
      const acceptRequest = () => {
        postAccept(request.id)
      }
      return <button onClick={acceptRequest} className="button">{request.name}</button>
    })
  }

  let userTiles = users.map(user => {
    return <p>{user.name}</p>
  })

  return (
    <div>
      {joinResponse}
      <div className="project-show-header">
        <h1 className="project-show-title black-and-blue-text">{project.name}</h1>
        <h3 className="project-show-desc">{project.description}</h3>
        {button}
      </div>
      <div className="grid-x text-center">
        <div className="cell small-5" />
        <div className="cell small-1">
            <button className="button" onClick={editFunc}>Edit</button>
          </div>
          <div className="cell small-1">
            <button className="button" onClick={deleteFunc}>Delete</button>
        </div>
        {requests}
      </div>
      <p>Users:</p>
      {userTiles}
    </div>

  )
}

export default ProjectShow