class CreateScores < ActiveRecord::Migration
  def self.up
    create_table :scores do |t|
      t.integer :tee_time_id
      t.integer :hole_id
      t.integer :player_id
      t.integer :score
      t.integer :points
      t.timestamps
    end
  end

  def self.down
    drop_table :scores
  end
end
