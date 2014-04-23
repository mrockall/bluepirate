class AddAthenryGolfClub < ActiveRecord::Migration
  def self.up
    course = Course.create({:name => "Athenry Golf Club"})

    course.holes.create([{
        :number => 1,
        :par => 4,
        :index => 4,
        :length => 371
      },{
        :number => 2,
        :par => 4,
        :index => 10,
        :length => 327
      },{
        :number => 3,
        :par => 3,
        :index => 16,
        :length => 145
      },{
        :number => 4,
        :par => 4,
        :index => 18,
        :length => 247
      },{
        :number => 5,
        :par => 4,
        :index => 8,
        :length => 303
      },{
        :number => 6,
        :par => 3,
        :index => 14,
        :length => 134
      },{
        :number => 7,
        :par => 4,
        :index => 2,
        :length => 410
      },{
        :number => 8,
        :par => 5,
        :index => 12,
        :length => 461
      },{
        :number => 9,
        :par => 4,
        :index => 6,
        :length => 341
      },{
        :number => 10,
        :par => 5,
        :index => 17,
        :length => 435
      },{
        :number => 11,
        :par => 4,
        :index => 9,
        :length => 346
      },{
        :number => 12,
        :par => 3,
        :index => 13,
        :length => 149
      },{
        :number => 13,
        :par => 4,
        :index => 5,
        :length => 366
      },{
        :number => 14,
        :par => 4,
        :index => 3,
        :length => 392
      },{
        :number => 15,
        :par => 3,
        :index => 7,
        :length => 342
      },{
        :number => 16,
        :par => 4,
        :index => 1,
        :length => 359
      },{
        :number => 17,
        :par => 5,
        :index => 15,
        :length => 135
      },{
        :number => 18,
        :par => 4,
        :index => 11,
        :length => 295
      }])
  end

  def self.down
    course.find_by_name("Athenry Golf Club").destroy
  end
end
