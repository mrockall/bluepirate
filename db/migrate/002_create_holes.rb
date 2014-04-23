class CreateHoles < ActiveRecord::Migration
  def self.up
    create_table :holes do |t|
      t.integer :course_id
      t.integer :number
      t.integer :par
      t.integer :index
      t.integer :length
      t.timestamps
    end
  end

  def self.down
    drop_table :holes
  end
end
