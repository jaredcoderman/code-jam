class Api::V1::CommentsController < ApplicationController
  def show
    # show all comments for a project
  end

  def create 
    project = Project.find(params["id"])
    user = current_user
    comment = Comment.new(comment_params)
    comment.user = user
    comment.project = project
    if comment.save 
      render json: comment
    else  
      render json: {response: "Error adding comment"}
    end
  end

  private 

  def comment_params
    params.require(:comment).permit(:description)
  end
end