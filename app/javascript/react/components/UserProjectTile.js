import React, { useState } from "react"
import { Redirect, Link } from "react-router-dom"

const UserProjectTile = props => {
  const { project } = props

  return (
    <div>
      <div className="grid-x grid-margin-x">
          <h2 className="cell small-11">
            <Link to={`/projects/${project.id}`}>
              {project.name}
            </Link>
          </h2>
        <h4 className="cell small-11">{project.description}</h4>
        <h4 className="cell small-11">Owner: {project.owner.name}</h4>
      </div>
      <hr />
    </div>
  )
}

export default UserProjectTile