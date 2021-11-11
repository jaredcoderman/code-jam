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

  describe "POST#index" do
    it "should successfully permit a new project" do
      project_json = {
        project: {
          name: "Fly a Kite",
          description: "Because flying kites is fun"
        },
        user: {
          name: curr_user.name,
          id: curr_user.id,
          email: curr_user.email,
          created_at: curr_user.created_at,
          updated_at: curr_user.updated_at,
          provider: curr_user.provider,
          uid: curr_user.uid
        }
      }

      previous_project_count = Project.count
      post(:create, params: project_json, format: :json)

      expect(Project.count).to eq (previous_project_count + 1)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json; charset=utf-8")

      posted_project = Project.last
      expect(posted_project.users.first).to eq curr_user
      expect(posted_project.name).to eq "Fly a Kite"
      expect(posted_project.description).to eq("Because flying kites is fun")
    end
  end
end