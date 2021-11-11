require "rails_helper"

RSpec.describe Api::V1::ProjectsController, type: :controller do
  include Devise::Test::ControllerHelpers

  let!(:curr_user) { FactoryBot.create(:user) }
  let!(:project_one) { FactoryBot.create(:project, users: [curr_user]) }

  describe "GET#index" do
    it "should retrieve a list of project objects" do
      sign_in curr_user
      get :index 
      
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json; charset=utf-8")

      returned_json = JSON.parse(response.body)
      first_project = returned_json["projects"].first

      expect(first_project["name"]).to eq project_one.name
      expect(first_project["description"]).to eq project_one.description
    end
  end
end