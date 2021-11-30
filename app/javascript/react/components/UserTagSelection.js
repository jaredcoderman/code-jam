import React, {useState} from "react"
import TagSelection from "./TagSelection"

const UserTagSelection = () => {
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  const updateUserTags = async () => {
    const response = await fetch("/api/v1/users/update_tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({tags: selectedTags})
    })
  }

  return(
    <div>
      <h1 className="black-and-blue-text project-title">Select What You Know</h1>
      <TagSelection 
        selectedTags={selectedTags} 
        setSelectedTags={setSelectedTags}  
        tags={tags}
        setTags={setTags}
      />
      <form onSubmit={updateUserTags}>
        <input type="submit" className="black-and-blue-text update-tags" value="Update" />
      </form>
    </div>
  )
}

export default UserTagSelection