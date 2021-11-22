class AddOwnerToProjects < ActiveRecord::Migration[6.1]
  def change
    add_column :projects, :owner_id, :bigint, index: true, null: false
  end
end
