class Omniaccount < Sequel::Model
	many_to_one :user

	def self.upsert(args)
      
	end
	
end