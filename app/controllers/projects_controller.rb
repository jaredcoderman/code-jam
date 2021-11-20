class ProjectsController < ApplicationController

  def index 
    @current_user = current_user
  end

  def search
    query = "%#{params[:query]}%"
    @projects = Project
      .where('name ilike ? or description ilike ?',
             query, query)
    render :index
  end
end