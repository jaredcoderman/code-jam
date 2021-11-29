class ProjectsController < ApplicationController

  def index 
  end

  def search
    query = "%#{params[:query]}%"
    @projects = Project
      .where('name ilike ?',
             query)
    render :index
    if @projects.length == 0
      @projects = Project.all
    end
  end
end