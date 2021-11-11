class Api::V1::UsersController < ApiController
  def current 
    render json: { user: current_user}
  end
end