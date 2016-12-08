enable :sessions

set(:auth) do |role|
  condition do
  	redirect '/login' unless logged_in?
  	true
  end
end

def logged_in? 
  !session[:user].nil?
end