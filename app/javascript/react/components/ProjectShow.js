import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import _, { set } from "lodash"
import CommentTile from "./CommentTile"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"

const ProjectShow = props => {
  const { id } = props.match.params
  const [project, setProject] = useState({})
  const [editRedirect, setEditRedirect] = useState(false)
  const [deleteRedirect, setDeleteRedirect] = useState(false)
  const [userRole, setUserRole] = useState("viewer")
  const [joinResponse, setJoinResponse] = useState("")
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")

  const fetchProject = async () => {
    const response = await fetch(`/api/v1/projects/${id}`)
    const responseBody = await response.json()
    setProject(responseBody.project)
    setUserRole(responseBody.project.role)
  }

  useEffect(() => {
    fetchProject()
  }, [])


  const editFunc = () => {
    setEditRedirect(true)
  }

  const deleteFunc = async () => {
    let bool = confirm("Are you sure you want to delete this project?")
    if(bool === true) {
      await fetch(`/api/v1/projects/${project.id}`, {
        method: "DELETE",
      })
      setDeleteRedirect(true)
    }
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
    const responseBody = await response.json()
    if(responseBody.response == "User added successfully") {
      setProject({
        ...project,
        users: project.users.concat(responseBody.user),
        requests: project.requests.filter(user => user.id !== responseBody.user.id)
      })
    }
  }

  if(deleteRedirect) {  
    return <Redirect to="/my_projects" />
  }

  if(editRedirect) {
    return <Redirect to={`/projects/${project.id}/edit`} />
  }

  let joinButton  
  if(userRole == "viewer") {
    joinButton = <button onClick={postJoin} className="show-button">JOIN</button>
  }

  let editButton
  let deleteButton
  if(userRole == "owner") {
    editButton = <button className="show-button" onClick={editFunc}>
                  Edit
                 </button> 
    deleteButton = <button className="show-button" onClick={deleteFunc}>
                    Delete
                   </button>
  }
  
  let requests
  if(userRole == "owner" && !_.isEmpty(project)) {
    requests = project.requests.map(request => {
      const acceptRequest = () => {
        postAccept(request.id)
      }
      return <button 
              onClick={acceptRequest} 
              className="request-tile">
                {request.name}
              </button>
    })
  }

  let userTiles
  if(!_.isEmpty(project)) {
    userTiles = project.users.map(user => {
      return <p className="user-tile">{user.name}</p>
    })
  }

  let comments
  if(!_.isEmpty(project)) {
    comments = project.comments.map(comment => {
      return <CommentTile comment={comment} />
    })
  }
  
  const postComment = async () => {
    const response = await fetch(`/api/v1/projects/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({comment: {description: comment}})
    })
    const responseBody = await response.json()
    setProject({
      ...project,
      comments: project.comments.concat(responseBody.comment)
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if(validateComment() == true) {
      postComment()
      setComment("")
    }
  }

  const validateComment = () => {
    let newError = ""
    if(comment.trim().length < 10) {
      newError = "Comment is too short"
    }
    if(newError == "") {
      return true
    } else {
      setError(newError)
      return false
    }
  }

  const handleChange = event => {
    setComment(event.currentTarget.value)
  }


  const closeFlash = () => {
    setJoinResponse(null)
  }

  let flashMessage
  if(joinResponse) {
    flashMessage = <p className="flash-container">{joinResponse} <FontAwesomeIcon onClick={closeFlash} className="x-button" size="lg" icon={faTimesCircle} /></p>
  }

  return (
    <div>
      {deleteButton}
      {editButton}
      {joinButton}
      <div className="show-margin">
      {error}
      {flashMessage}
      <div className="show-header-container">
        <h1 className="project-show-title">
          {project.name} 
        </h1>
        <p className="project-show-desc">{project.description}</p>
      </div>
      <div className="text-left grid-x grid-margin-x">
        <div className="cell small-9">
          <h4 className="show-sub-header">COMMENTS</h4>
          <form onSubmit={handleSubmit}>
            <textarea 
              className="project-text-area wide" 
              name="description" 
              placeholder="Leave a comment..." 
              value={comment} 
              onChange={handleChange}>
            </textarea>
            <input type="submit" value="Comment" className="show-submit-button" />
          </form>
          {comments}
        </div>
        <div className="text-center cell small-3">
          <h4 className="show-sub-header">MEMBERS</h4>
          {requests}
          {userTiles}
        </div>
      </div>
    </div>
    </div>
  )
}

export default ProjectShow