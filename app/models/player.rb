class Player < ActiveRecord::Base

  has_many :events, :through => :tee_times
  has_many :tee_times
  has_many :identities

end