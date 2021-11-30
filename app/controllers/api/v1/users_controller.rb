class Api::V1::UsersController < ApplicationController
  def current 
    render json: current_user
  end

  def update_tags
    tag_ids = params[:tags]
    tag_ids.each do |id|
      current_user.tags << Tag.find(id)
    end
  end
end