class Api::V1::ProjectsController < ApplicationController
  
  def index 
    @projects = current_user.projects
    render json: @projects
  end

  def show
    @project = Project.find(params["id"])
    render json: @project
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
    choice = params["choice"]
    if choice == "accept"
      project.users << user
      project.user_requests.delete(user)
      if project.save 
        render json: {user: {id: user.id, name: user.name}, response: "User added successfully"}
      end
    else  
      project.user_requests.delete(user)
      render json: {user: {id: user.id}, response: "Request denied successfully"}
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