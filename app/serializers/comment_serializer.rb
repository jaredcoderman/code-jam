class CommentSerializer < ActiveModel::Serializer
  attributes :id, :description, :author, :formatted_date

  def author
    object.user.name
  end

  def formatted_date 
    object.created_at.strftime("%B %d %Y")
  end
end
