import React from "react"

const LeaveButton = props => {

  const { project, setDeleteRedirect } = props
  const body = {
    project: {
      id: project.id
    },
    user: {
      id: project.user.id
    }
  }

  const leaveFunc = async () => {
    if(confirm("Are you sure?")) {
      try{
        const response = await fetch("/api/v1/projects/remove_user", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          credentials: "same-origin",
          body: JSON.stringify(body)
        })
        if(!response.ok) {
          throw new Error(`${response.status} (${response.statusText})`)
        }
        setDeleteRedirect(true)
      } catch(err) {
        console.error(err)
      }
    }
  }

  return(
    <button className="show-button" onClick={leaveFunc}>
      Leave
    </button>
  )
}

export default LeaveButton