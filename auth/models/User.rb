class User < Sequel::Model
	one_to_many :omniaccounts
	many_to_many :roles
end
