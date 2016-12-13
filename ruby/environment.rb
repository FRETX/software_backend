unless ENV.has_key?('ON_HEROKU')
  `heroku config`.lines.each do |line|
    match = /(?<key>[A-Z|_]+): +(?<value>.+)/.match(line)
    ENV[match[:key]] = match[:value] unless match.nil?
  end
  ENV['FACEBOOK_ID'] = '1264441586952947'
  ENV['FACEBOOK_SECRET'] = '79342f87d12bb1b123e9a531d49e7f06'
end