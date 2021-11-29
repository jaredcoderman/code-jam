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

  def search_by_tags
    user_tags = current_user.tags
    projects = Project.all
    found_projects = []
    user_tags.each do |tag|
      projects.each do |project|
        if project.tags.include?(tag)
          found_projects << project
        end
      end
    end
    @projects = found_projects
    render :index
    
  end
end