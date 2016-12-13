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

post '/logout' do
  session[:user] = nil
  cookie[:user]  = nil
  redirect '/login'
end

get '/current_user' do
  content_type :json
  JSON.generate({ :name => user.name, :photo_url => user.photo_url })	
end