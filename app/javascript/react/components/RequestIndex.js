import React from "react"
import RequestTile from "./RequestTile"

const RequestIndex = props => {
  const { project, setProject } = props

  const postAccept = async (userId, choice) => {
    const response = await fetch("/api/v1/projects/accept", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({project: {id: project.id}, user: {id: userId}, choice: choice})
    })
    const responseBody = await response.json()
    if(responseBody.response == "User added successfully") {
      setProject({
        ...project,
        users: project.users.concat(responseBody.user),
        requests: project.requests.filter(user => user.id !== responseBody.user.id)
      })
    } else {
      setProject({
        ...project,
        requests: project.requests.filter(user => user.id !== responseBody.user.id)
      })
    }
  }
  const requests = project.requests.map(request => {
    const acceptRequest = () => {
      let choice = confirm("Are you sure?")
      if(choice) {
        postAccept(request.id, "accept")
      }
    }
    const rejectRequest = () => {
      let choice = confirm("Are you sure?")
      if(choice) {
        postAccept(request.id, "reject")
      }
    }
    return (
      <RequestTile acceptRequest={acceptRequest} rejectRequest={rejectRequest} request={request} />
    )      
  })
  return requests
}

export default RequestIndex