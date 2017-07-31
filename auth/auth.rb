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
  redirect '/login'
end

get '/current_user' do
  content_type :json
  user = session[:user]
  halt 404 if user.nil?
  JSON.generate({ :name => user.name, :photo_url => user.photo_url })	
end