class Score < ActiveRecord::Base
  attr_accessor :result

  belongs_to :tee_time
  belongs_to :hole
  belongs_to :player
  has_one :event, through: :tee_time

  before_save :calculate_points, :if => ->(s) { s.score_changed? }
  after_save :update_tee_time

  def calculate_points
    s = self.hole.adjusted_par(self.player) - self.score + 2
    self.points = s >= 0 ? s : 0
  end

  def update_tee_time
    self.tee_time.update_scores
  end

  def result?
    return "" if self.score.nil?
    
    if (self.score || 0) == self.hole.adjusted_par(self.player)
      "par"
    elsif (self.score || 0) + 1 == self.hole.adjusted_par(self.player)
      "birdie"
    elsif (self.score || 0) < self.hole.adjusted_par(self.player)
      "eagle"
    elsif (self.score || 0) - 1 == self.hole.adjusted_par(self.player)
      "bogey"
    else
      "dbl_bogey"
    end
  end

end
