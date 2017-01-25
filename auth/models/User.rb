class User < Sequel::Model

	one_to_many :omniaccounts
	many_to_many :roles

	def has_role?(role)
	  role = Role[:name => role]
	  p role
      roles.include? role
	end

	def photo_url
      omniaccounts.first.photo_url
	end

end
