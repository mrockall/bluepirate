object @player

attributes :id, :name, :handicap

child :events do |event| 
  attributes :date
  child :course do |course| 
    attributes :id, :name 
    child(:holes) do
      attributes :id, :number, :index, :par, :length
    end
  end
  node(:scores) do |event|
    tee_time = TeeTime.find_by_player_id_and_event_id @player.id, event.id
    scores = Score.find_all_by_tee_time_id tee_time.id
    scores.map { |s| 
      { 
        :hole_id => s.hole_id, 
        :points => s.points, 
        :score => s.score,
        :result => s.result?
      }
    }
  end
end