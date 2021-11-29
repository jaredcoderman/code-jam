import React from "react"

const JoinButton = props => {
  const { setJoinResponse, project } = props

  const postJoin = async event => {
    event.preventDefault()
    const response = await fetch("/api/v1/projects/join", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({project: {id: project.id}})
    })
    const responseBody = await response.json()
    setJoinResponse(responseBody.response)
  }

  return (
    <button onClick={postJoin} className="show-button">JOIN</button>
  )
}

export default JoinButton