require 'sinatra'

set :bind, '0.0.0.0'
set :views, 'slim'

Dir.chdir File.expand_path(File.dirname(__FILE__))
Dir["ruby/*.rb"].each { |file| require File.expand_path(file); }