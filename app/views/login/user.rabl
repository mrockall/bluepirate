object @player

attributes :id, :name, :handicap

child :events do |event|
  node :tee_group do |event|
    players_tee_time = TeeTime.find_by_event_id_and_player_id event.id, @player.id
    tee_times = TeeTime.find_all_by_event_id_and_time event.id, players_tee_time.time

    tee_times.map { |t| {
        :player => Player.find_by_id(t.player_id),
        :position => t.position,
        :points => t.points,
        :through => t.through,
        :time => t.time.strftime("%l:%M"),
        :scores => t.get_scores
      }
    }
  end

  child :course do |course| 
    attributes :id, :name 
    child(:holes) do
      attributes :id, :number, :index, :par, :length
    end
  end
end