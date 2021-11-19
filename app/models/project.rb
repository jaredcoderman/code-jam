class Project < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true, length: { minimum: 20 }
  validates :owner, presence: true

  has_many :user_projects
  has_many :users, through: :user_projects
end