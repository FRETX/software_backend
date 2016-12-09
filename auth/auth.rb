enable :sessions

set(:auth) do |role|
  condition do
  	redirect '/login' unless logged_in?
  	redirect '/' unless session[:user].has_role? role
  	true
  end
end

def logged_in?
  p session[:user] unless session[:user].nil?
  !session[:user].nil?
end