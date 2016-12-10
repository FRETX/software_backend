enable :sessions

set(:auth) do |role|
  condition do
  	redirect '/login' unless logged_in?
  	redirect '/' unless session[:user].has_role? role
  	true
  end
end

def logged_in?
  !session[:user].nil?
end

get '/logout' do
  session[:user] = nil
  cookie[:user]  = nil
  redirect '/login'
end