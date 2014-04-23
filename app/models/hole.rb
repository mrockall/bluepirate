class Hole < ActiveRecord::Base

  belongs_to :course

  def adjusted_par(player)
    self.par + player.handicap/18 + (self.index <= player.handicap%18 ? 1 : 0)
  end
  
end
