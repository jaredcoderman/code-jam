require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do
  include Devise::Test::ControllerHelpers

  let!(:curr_user) { FactoryBot.create(:user) }
  let!(:project_one) { FactoryBot.create(:project, users: [curr_user]) }

  describe "GET#index" do
    it "should retrieve a list of project objects" do
      sign_in curr_user
      get :current 
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json; charset=utf-8")

      returned_json = JSON.parse(response.body)

      user = returned_json["user"]
      expect(user["email"]).to eq curr_user.email
      expect(user["id"]).to eq curr_user.id
      expect(user["name"]).to eq curr_user.name
    end
  end
end