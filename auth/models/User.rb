class User < Sequel::Model

	one_to_many :omniaccounts
	many_to_many :roles

	def has_role?(role)
      !roles[:name=>role].nil?
	end

	def photo_url
      omniaccounts.all[0].photo_url
	end

end
