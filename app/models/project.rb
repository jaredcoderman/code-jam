class Project < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true, length: { minimum: 20 }

  has_many :user_projects
  has_many :users, through: :user_projects
end