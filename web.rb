require 'sinatra'

set :views, 'slim'

Dir.chdir File.expand_path(File.dirname(__FILE__))
Dir["ruby/*.rb"].each { |file| require File.expand_path(file); }

# Tue 10/18 10pm - 2am 4hrs
# Mon 10/24 11pm - 2am 3hrs
# Wed 10/26 8pm -  2am 6hrs
# Fri 10/28 5pm -  7pm 2hrs
# Tue 11/01 9pm - 12am 3hrs
# Wed 11/02 8pm - 1am  5hrs
