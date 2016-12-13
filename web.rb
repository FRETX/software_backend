require 'sinatra'
require 'sinatra/cookies'

set :bind, '0.0.0.0'
set :views, 'slim'

Dir.chdir File.expand_path(File.dirname(__FILE__))
require_relative 'ruby/database.rb'
Dir["auth/models/*.rb"].each { |file| require File.expand_path(file); }
Dir["auth/*.rb"].each { |file| require File.expand_path(file); }
Dir["ruby/*.rb"].each { |file| require File.expand_path(file); }


# Tue 10/18 10pm - 2am 4hrs

# Mon 10/24 11pm - 2am 3hrs
# Wed 10/26 8pm -  2am 6hrs
# Fri 10/28 5pm -  7pm 2hrs

# Tue 11/01 9pm - 12am 3hrs
# Wed 11/02 8pm - 1am  5hrs
# Thu 11/03 9pm - 1am  4hrs
# Fri 11/04 9pm - 12a  3hrs

# Mon 11/07 10pm - 1am 3hrs
# Wed 11/09 10pm - 12am 2hrs
# Sat 11/12 9pm  - 1am  4hrs

# Thu 11/18 9pm - 1am 4hrs
# Sat 11/26 3pm - 6pm 3hrs

# Mon 11/28 7pm - 12am 5hrs  ( FretXApi Module )
# Tue 11/29 10pm - 3am 5hrs  ( FretXApi Module )
# Wed 11/30 9pm - 2am  5hrs  ( light delay, preroll, searchlist and player cleanup )
# Wed 12/07 9pm - 1am  4hrs  ( Authentication & Authorization )