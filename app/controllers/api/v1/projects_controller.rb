class Api::V1::ProjectsController < ApplicationController
  
  def index 
    @projects = current_user.projects
    render json: { projects: @projects }
  end

  def show
    render json: { project: Project.find(params["id"])}
  end

  def create
    @project = Project.new(project_params)
    @project.owner = current_user.id
    @project.users << current_user
    if @project.save
      render json: {response: "Project created successfully"}
    else  
      errors = @project.errors.full_messages.to_sentence
      render json: {response: errors}
    end
  end

  def update 
    @project = Project.find(project_params[:id])
    @project.name = project_params["name"]
    @project.description = project_params["description"]
    if @project.save
      render json: {response: "Project updated successfully"}
    else  
      errors = @project.errors.full_messages.to_sentence
      render json: {response: errors}
    end
  end

  def destroy 
    Project.find(params[:id]).delete
  end

  private 

  def project_params
    params.require(:project).permit(:name, :description, :id)
  end

  def user_params
    params.require(:user).permit(:id, :email, :name, :created_at, :updated_at, :provider, :uid)
  end
end