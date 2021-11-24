import React, { useState } from "react"
import { Redirect, Link } from "react-router-dom"

const UserProjectTile = props => {
  const { project } = props

  return (
    <div className="callout secondary cell small-6 grid-x">
      <h2 className="cell small-11">
        <Link to={`/projects/${project.id}`}>
          {project.name}
        </Link>
      </h2>
      <h4 className="project-text">{project.description}</h4>
    </div>
  )
}

export default UserProjectTile