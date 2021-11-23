class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :user, :role, :requests
  has_many :users
  has_many :comments
  
  def user
    current_user
  end

  def role
    role = "viewer"
    if object.users.include?(current_user)
      role = "member"
      if object.owner == current_user
        role = "owner"
      end
    end
    return role
  end

  def requests 
    object.user_requests
  end

end
