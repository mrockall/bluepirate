class Event < ActiveRecord::Base

  JSON = [:include => [:course, :tee_times]]

  belongs_to :course
  has_many :tee_times
  has_many :players, through: :tee_times
  
end
