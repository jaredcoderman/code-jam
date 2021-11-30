import React from "react"

const TagTile = props => {
  const { tag, updateThisTag, currentClass } = props 

  return(
    <button className={currentClass} onClick={updateThisTag}>{tag.name}</button>
  )
}

export default TagTile