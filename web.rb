require 'sinatra'

set :views, 'slim'

Dir.chdir File.expand_path(File.dirname(__FILE__))
Dir["ruby/*.rb"].each { |file| require File.expand_path(file); }

# Wed 09/07 8pm - 3am 7hrs
# Thu 09/08 10pm - 3am 5hrs
