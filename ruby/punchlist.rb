require 'sinatra/base'

class PunchlistApi < Sinatra::Base

  get '/' do 
  	"Punchlist Api"
  end

  get '/list' do
  end

end