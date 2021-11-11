class Api::V1::ProjectsController < ApiController
  
  def index 
    @projects = current_user.projects
    render json: { projects: @projects }
  end

  def create
    @project = Project.new(project_params)
    @project.users << User.find(user_params["id"])
    if @project.save
      render json: {response: "Project created successfully"}
    else  
      errors = @project.errors.full_messages.to_sentence
      render json: {response: errors}
    end
  end

  private 

  def project_params
    params.require(:project).permit(:name, :description)
  end

  def user_params
    params.require(:user).permit(:id, :email, :name, :created_at, :updated_at, :provider, :uid)
  end
end