object @event

attributes :id, :date

child(:course) { attributes :name }
child(:tee_times) { 
  attributes :time, :through, :points, :score
  child(:player) { attributes :id, :name }
  node :time_parsed do |t|
    t.time.strftime("%l:%M")
  end
}