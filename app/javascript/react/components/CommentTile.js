import React from "react"

const CommentTile = props => {
  const {comment} = props
  return (
    <div className="show-comment-container">
      <p className="comment-author">{comment.author}</p>
      <h4 className="comment-body">{comment.description}</h4>
      <p className="comment-date">{comment.formatted_date}</p>
    </div>
  )
}

export default CommentTile