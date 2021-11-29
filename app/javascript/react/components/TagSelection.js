import React, {useEffect} from "react"
import TagTile from "./TagTile"

const TagSelection = props => {
  const {selectedTags,  setSelectedTags, tags, setTags } = props

  const updateSelectedTags = (tag) => {
    if(selectedTags.includes(tag.id)) {
      setSelectedTags(selectedTags.filter(filterTag => filterTag != tag.id))
    } else {
      setSelectedTags(selectedTags.concat(tag.id))
    }
  }

  const fetchTags = async () => {
    try {
      const response = await fetch("/api/v1/tags")
      if(!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const tagsResponse = await response.json()
      setTags(tagsResponse.tags)
    } catch(err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  const tagTiles = tags.map(tag => {
    const updateThisTag = () => {
      updateSelectedTags(tag)
    }

    let currentClass
    if(selectedTags.includes(tag.id)) {
      currentClass = "tag-tile selected"
    } else {
      currentClass = "tag-tile"
    }

    return <TagTile currentClass={currentClass} updateThisTag={updateThisTag} key={tag.id} tag={tag} />
  })

  return (
    <div className="tag-container">
      {tagTiles}
    </div>
  )
}

export default TagSelection