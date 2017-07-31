require 'sinatra'

Dir.chdir File.expand_path(File.dirname(__FILE__))

set :bind, '0.0.0.0'
set :views, 'slim'


require_relative 'ruby/database.rb'

Dir["auth/models/*.rb"].each { |file| require File.expand_path(file); }
Dir["auth/*.rb"].each { |file| require File.expand_path(file); }
Dir["ruby/*.rb"].each { |file| require File.expand_path(file); }


# Thu 11/18 9pm - 1am 4hrs
# Sat 11/26 3pm - 6pm 3hrs

# Mon 11/28 7pm - 12am  5hrs  ( FretXApi Module )
# Tue 11/29 10pm - 3am  5hrs  ( FretXApi Module )
# Wed 11/30 9pm - 2am   5hrs  ( light delay, preroll, searchlist and player cleanup )

# Wed 12/07 9pm - 1am   4hrs  ( Authentication & Authorization )

# Mon 12/12 10pm - 1am  3hrs  ( Authentication & Authorization )
# Tue 12/13 10pm - 12am 2hrs  ( API updates, Work With Onur )
# Wed 12/14 10pm - 2am  4hrs  ( Landing Page, Styling, New Page Flow )