BluePirate::App.controllers :events do

  get ":id", :provides => [:json, :xml] do
    @event = Event.find_by_id params[:id]
    error 404 unless @event.present?
    render "events/item"
  end

  get "/:id/scores", :provides => :json do
    data = {}
    params[:player_ids].each do |pid|
      score = Score.find_by_player_id_and_hole_id pid, params[:hole_id]
      data[pid] = score.score
    end
    {:players => data, :hole => Hole.find_by_id(params[:hole_id])}.to_json
  end

  post "/:id/scores", :provides => :json do
    params[:players].each do |pid|
      score = Score.find_by_player_id_and_hole_id pid[0], params[:hole_id]
      score.score = pid[1].to_i
      score.save
    end
    {:result => true}.to_json
  end

end
