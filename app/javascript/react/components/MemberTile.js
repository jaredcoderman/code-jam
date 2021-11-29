import React from "react"

const MemberTile = props => {
  const { user, removeButton } = props 
  return(
    <div className="user-tile">
      <p className="user-tile-name">{user.name}</p>
      {removeButton}
  </div>
  )
}

export default MemberTile 