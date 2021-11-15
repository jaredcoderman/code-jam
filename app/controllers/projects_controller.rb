class ProjectsController < ApplicationController

  def index 

  end

  def search
    query = "%#{params[:query]}%"
    @projects = Project
      .where('name ilike ? or description ilike ?',
             query, query)
    render :index
  end
end