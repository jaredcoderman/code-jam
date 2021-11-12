import React, { useState } from "react"
import { Redirect } from "react-router-dom"

const UserProjectTile = props => {
  const { project } = props
  const [editRedirect, setEditRedirect] = useState(false)

  const editFunc = () => {
    setEditRedirect(true)
  }

  const deleteFunc = async () => {
    await fetch(`/api/v1/projects/${project.id}`, {
      method: "DELETE",
    })
    props.reRender()
  }

  if(editRedirect) {
    return <Redirect to={`/projects/${project.id}/edit`} />
  }

  return (
    <div>
      <div className="grid-x grid-margin-x">
          <h2 className="cell small-11">{project.name}</h2>
        <div className="cell small-1">
          <button onClick={editFunc} className="button">EDIT</button>
        </div>
        <h4 className="cell small-11">{project.description}</h4>
        <button onClick={deleteFunc} className="button">DELETE</button>
      </div>
      <hr />
    </div>
  )
}

export default UserProjectTile