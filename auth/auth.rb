enable :sessions

set(:auth) do |role|
  condition do
  	redirect '/login' unless logged_in?
  	binding.pry
  	true
  end
end

def logged_in? 
  !session[:user].nil?
end