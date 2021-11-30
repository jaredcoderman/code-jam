class CreateUserTags < ActiveRecord::Migration[6.1]
  def change
    create_table :user_tags do |t|
      t.belongs_to :user, null: false
      t.belongs_to :tag, null: false

      t.timestamps
    end
  end
end
