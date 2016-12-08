require 'omniauth'
require 'omniauth-facebook'
require 'omniauth-google-oauth2'
require_relative '../ruby/environment.rb'

use OmniAuth::Builder do
  provider :facebook, ENV['FACEBOOK_ID'], ENV['FACEBOOK_SECRET']
  provider :google_oauth2, ENV['GOOGLE_ID'], ENV['GOOGLE_SECRET'], {access_type: "offline", prompt: "consent", scope: 'userinfo.email, userinfo.profile'}
end

get '/auth/:provider/callback' do
  puts JSON.pretty_generate(request.env['omniauth.auth'])
  slim :logged_in
end

get '/auth/:provider/deauthorized' do
  "App Deauthorized"
end