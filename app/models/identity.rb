class Identity < OmniAuth::Identity::Models::ActiveRecord
    
  belongs_to :player
  
end