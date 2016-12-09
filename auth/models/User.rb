class User < Sequel::Model

	one_to_many :omniaccounts
	many_to_many :roles

	def has_role?(role)
	  p "SELF = #{self}"	
	  p "ROLES = #{roles}"
	  role = Role[ :name => role ]
	  p role.id
	  p roles_dataset.where(:id => role.id).all
      roles_dataset.where(:id => role.id).all[0] == role
	end

	def photo_url
      omniaccounts.first.photo_url
	end

end
