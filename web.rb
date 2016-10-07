require 'sinatra'

set :views, 'slim'

Dir.chdir File.expand_path(File.dirname(__FILE__))
Dir["ruby/*.rb"].each { |file| require File.expand_path(file); }

# Thu 09/15 8pm - 2am 6hrs
# Tue 09/20 10pm - 2am 4hrs

# Thu 09/22 8pm - 2am 6hrs
# Sun 09/25 1pm - 9pm 8hrs

# Mon 09/26 6pm  - 4am 10hrs
# Tue 09/27 8pm  - 2am 6hrs
# Wed 09/28 8pm  - 2am 6hrs
# Thu 09/29 10pm - 3am 5hrs

# Tue 10/04 12am - 2am 2hrs
# Wed 10/05 11pm - 3am 4hrs
# Thu 10/06 10pm - 2am 4hrs

