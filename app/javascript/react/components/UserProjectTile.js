import React, { useState } from "react"
import { Redirect } from "react-router-dom"

const UserProjectTile = props => {
  const { project } = props
  const [redirect, setRedirect] = useState(false)

  const handleClick = () => {
    setRedirect(true)
  }

  if(redirect) {
    return <Redirect to={`/projects/${project.id}/edit`} />
  }

  return (
    <div>
      <div className="grid-x grid-margin-x">
        <h2 className="cell small-11">{project.name}</h2>
        <div className="cell small-1">
        <button onClick={handleClick} className="button">EDIT</button>
        </div>
      </div>
      <h4>{project.description}</h4>
      <hr />
    </div>
  )
}

export default UserProjectTile