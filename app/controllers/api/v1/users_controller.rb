class Api::V1::UsersController < ApplicationController
  def current 
    render json: { user: current_user}
  end
end