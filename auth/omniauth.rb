require 'omniauth'
require 'omniauth-facebook'
require 'omniauth-google-oauth2'
require_relative '../ruby/environment.rb'

use OmniAuth::Builder do
  provider :facebook, ENV['FACEBOOK_ID'], ENV['FACEBOOK_SECRET']
  provider :google_oauth2, ENV['GOOGLE_ID'], ENV['GOOGLE_SECRET'], {access_type: "offline", prompt: "consent", scope: 'userinfo.email, userinfo.profile'}
end

get '/auth/:provider/callback' do
  auth = request.env['omniauth.auth']

  data = {
    :uid       => auth["uid"],
    :provider  => auth["provider"],
    :email     => auth["info"]["email"],
    :name      => auth["info"]["name"],
    :photo_url => auth["info"]["image"]
  }
  
  omni = Omniaccount.find_or_create( :provider => data[:provider], :provider_id => data[:uid] ) do |obj|
    obj.photo_url = data[:photo_url]
  end

  user = User.find_or_create( :email => data[:email] ) do |obj|
    obj.name = data[:name]
  end

  user.add_omniaccount(omni)

  session[:user] = user
  cookies[:user] = JSON.generate { :name => user.name, :photo_url => user.photo_url }

  redirect '/editor'
end

get '/auth/:provider/deauthorized' do
  "App Deauthorized"
end