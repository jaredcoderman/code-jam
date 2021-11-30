class Tag < ApplicationRecord
  validates :name, presence: true

  has_many :project_tags
  has_many :projects, through: :project_tags

  has_many :user_tags
  has_many :users, through: :user_tags
end