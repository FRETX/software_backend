require_relative 'environment'
require 'yt'

Yt.configure do |config|
  config.api_key = ENV['YOUTUBE_API_KEY']
  p config.api_key
end

get '/youtube/videodata/:id' do
  content_type :json
  JSON.generate youtube_video_data(params[:id])
end


def youtube_video_data(video_id)
  video = Yt::Video.new id:  video_id
  { :id => video.id, :title => video.title, :description => video.description }
end