class User < Sequel::Model

	one_to_many :omniaccounts
	many_to_many :roles

	def has_role?(role)
	  p roles
      !roles[:role=>Role[:name=>role]].nil?
	end

	def photo_url
      omniaccounts.first.photo_url
	end

end
