class Api::V1::TagsController < ApplicationController
  def index 
    render json: Tag.all
  end

  def update 
    tag = Tag.find(tag_params)
    project = Project.find(project_params)

    tag.projects << project
    tag.save
  end

  def tag_params
    params.require(:tag).permit(:id)
  end

  def project_params
    params.require(:project).permit(:id)
  end
end