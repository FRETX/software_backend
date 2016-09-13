`heroku config`.lines.each do |line|
  match = /(?<key>[A-Z|_]+): +(?<value>.+)/.match(line)
  ENV[match[:key]] = match[:value] unless match.nil?
end