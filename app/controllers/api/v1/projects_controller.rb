class Api::V1::ProjectsController < ApplicationController
  
  def index 
    @projects = current_user.projects
    render json: @projects
  end

  def show
    project = Project.find(params["id"])
    role = "viewer"
    if project.users.include?(current_user)
      role = "member"
      if project.owner = current_user 
        role = "owner"
      end
    end
    render json: {project: project, role: role, requests: project.user_requests, users: project.users}
  end

  def join
    project = Project.find(project_params["id"])
    if !project.user_requests.include?(current_user)
      project.user_requests << current_user
      render json: {response: "Request sent successfully"}
    else  
      render json: {response: "Request already sent"}
    end
  end

  def accept
    project = Project.find(project_params["id"])
    user = User.find(user_params["id"])
    project.users << user
    project.user_requests.delete(user)
    if project.save 
      binding.pry
      render json: {response: "User joined successfully"}
    end
  end

  def create
    @project = Project.new(project_params)
    @project.owner = current_user
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