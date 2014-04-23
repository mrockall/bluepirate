BluePirate::App.controllers :players do
  
  get ":id", :provides => [:json, :xml] do
    @player = Player.find_by_id params[:id]
    error 404 unless @player.present?
    render "players/item"
  end

end
