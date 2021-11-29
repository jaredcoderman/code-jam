import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserMinus } from "@fortawesome/free-solid-svg-icons"
import MemberTile from "./MemberTile"

const MemberIndex = props => {
  const { project, setProject } = props
  let userTiles = project.users.map(user => {
    const removeUser = async () => {
      if(confirm("Are you sure?")) {
        const response = await fetch("/api/v1/projects/remove_user", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          credentials: 'same-origin',
          body: JSON.stringify({user: {id: user.id}, project: {id: project.id}})
        })
        const responseBody = await response.json()
        if(responseBody.response == "User removed successfully") {
          setProject({
            ...project,
            users: project.users.filter(projUser => projUser.id !== user.id)
          })
        }
      }
    }
    let removeButton = null
    if(user.id != project.owner.id && project.role == "owner") {
      removeButton = <FontAwesomeIcon onClick={removeUser} className="request-deny" icon={faUserMinus} />
    }

    return (
      <MemberTile key={user.id} user={user} removeButton={removeButton} />
    )
    })
  return (
    <div>
      {userTiles}
    </div>
  )
}

export default MemberIndex