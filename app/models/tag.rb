class Tag < ApplicationRecord
  validates :name, presence: true

  has_many :project_tags
  has_many :projects, through: :project_tags
end