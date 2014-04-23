class CreateFirstEvent < ActiveRecord::Migration
  def self.up
    event = Event.create({
        :date => Date.new(2014,4,26),
        :course => Course.find_by_name('Athenry Golf Club')
      })

    Player.create([{
        :name => 'Mike Rockall',
        :handicap => 17
      },{
        :name => 'Liam Rockall',
        :handicap => 18
      },{
        :name => 'Steve Horgan',
        :handicap => 21
      },{
        :name => 'Ryan Kelly',
        :handicap => 28
      },{
        :name => 'Danny Finn',
        :handicap => 28
      },{
        :name => 'Brendan Considine',
        :handicap => 20
      },{
        :name => 'David Flanagan',
        :handicap => 22
      },{
        :name => 'Daire Greene',
        :handicap => 28
      },{
        :name => 'Rob Kennedy',
        :handicap => 20
      }])

    event.tee_times.create([{
        :player => Player.find_by_name('Daire Greene'),
        :time => '13:30:00'
      },{
        :player => Player.find_by_name('Brendan Considine'),
        :time => '13:30:00'
      },{
        :player => Player.find_by_name('Rob Kennedy'),
        :time => '13:30:00'
      },{
        :player => Player.find_by_name('Liam Rockall'),
        :time => '13:40:00'
      },{
        :player => Player.find_by_name('Steve Horgan'),
        :time => '13:40:00'
      },{
        :player => Player.find_by_name('David Flanagan'),
        :time => '13:40:00'
      },{
        :player => Player.find_by_name('Mike Rockall'),
        :time => '13:50:00'
      },{
        :player => Player.find_by_name('Danny Finn'),
        :time => '13:50:00'
      },{
        :player => Player.find_by_name('Ryan Kelly'),
        :time => '13:50:00'
      }])
  end

  def self.down
  end
end
