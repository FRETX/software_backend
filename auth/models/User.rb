class User < Sequel::Model
	one_to_many :omniaccounts
	many_to_many :roles

  def self.get_from_omniauth(auth)

  end

end
