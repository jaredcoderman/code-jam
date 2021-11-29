class ProjectsController < ApplicationController

  def index 
  end

  def search
    query = "%#{params[:query]}%"
    @projects = Project
      .where('name ilike ?',
             query)
    render :index
  end
end