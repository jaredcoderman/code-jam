import React from "react"

const UserProjectTile = props => {
  const { project } = props

  return (
    <div>
      <h2>{project.name}</h2>
      <h4>{project.description}</h4>
      <hr />
    </div>
  )
}

export default UserProjectTile