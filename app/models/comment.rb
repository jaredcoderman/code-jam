class Comment < ApplicationRecord
  validates :description, presence: true, length: {minimum: 10}

  belongs_to :project
  belongs_to :user
end