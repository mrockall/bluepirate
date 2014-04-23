class TeeTime < ActiveRecord::Base

  default_scope order("points desc, score desc, time asc")

  belongs_to :player
  belongs_to :event
  has_many :scores

  after_create :create_scores, :if => ->(r) { self.player.present? }
  before_save :set_defaults

  def create_scores
    event.course.holes.each do |h|
      Score.create({
          :tee_time => self,
          :hole => h,
          :player => self.player
        })
    end
  end

  def set_defaults
    self.through ||= 0
    self.score ||= 0
    self.points ||= 0
  end

  def update_scores
    self.score = self.scores.map(&:score).reject {|s| s.nil? }.reduce(:+)
    self.points = self.scores.map(&:points).reject {|s| s.nil? }.reduce(:+)
    self.through = self.scores.map {|s| s.score.nil? ? nil : s.hole.id }.reject {|s| s.nil? }.max
    self.save
  end

  def position
    event_tee_times = TeeTime.find_all_by_event_id self.event_id
    (event_tee_times.find_index { |t| t.id == self.id }) + 1
  end

  def get_scores
    self.scores.map { |s| {
      :hole_id => s.hole_id,
      :score => s.score,
      :points => s.points,
      :result => s.result?
    }}
  end
end
