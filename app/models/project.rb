class Project < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true, length: { minimum: 20 }
  validates :owner, presence: true

  has_many :user_projects
  has_many :users, through: :user_projects

  belongs_to :owner, class_name: "User"

  has_many :join_requests
  has_many :user_requests, through: :join_requests, source: :user

  has_many :comments
  
  has_many :project_tags
  has_many :tags, through: :project_tags
end