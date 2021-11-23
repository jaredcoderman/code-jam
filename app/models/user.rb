class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable, :omniauthable

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.name = auth.info.name
      user.uid = auth.uid
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
    end
  end

  validates :name, presence: true 
  validates :email, presence: true
  validates :encrypted_password, presence: true

  has_many :user_projects
  has_many :projects, through: :user_projects

  has_many :owned_projects, class_name: "Project", foreign_key: "owner_id"

  has_many :join_requests 
  has_many :project_requests, through: :join_requests, source: :project

  has_many :comments
end
