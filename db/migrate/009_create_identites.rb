class CreateIdentites < ActiveRecord::Migration
  def self.up
    create_table :identities do |t|
      t.integer :id
      t.integer :player_id
      t.string :email
      t.string :password_digest
      t.timestamps
    end

    Player.all.each do |player|
      Identity.create({
          :player => player,
          :email => player.name.downcase.tr(' ', '_'),
          :password => player.name.downcase.tr(' ', '_'),
          :password_confirmation => player.name.downcase.tr(' ', '_'),
        })
    end
  end

  def self.down
    drop_table :identities
  end
end
