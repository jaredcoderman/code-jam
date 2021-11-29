class CreateProjectTags < ActiveRecord::Migration[6.1]
  def change
    create_table :project_tags do |t|
      t.belongs_to :tag, null: false
      t.belongs_to :project, null: false

      t.timestamps
    end
  end
end
