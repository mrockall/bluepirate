class CreateTeeTimes < ActiveRecord::Migration
  def self.up
    create_table :tee_times do |t|
      t.integer :event_id
      t.integer :player_id
      t.time :time
      t.integer :through
      t.integer :score
      t.integer :points
      t.timestamps
    end
  end

  def self.down
    drop_table :tee_times
  end
end
