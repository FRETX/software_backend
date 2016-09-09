def no_scaling; "\n<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'/>" end
def css(path) handleArray(path) { |x| "\n<link rel='stylesheet' type='text/css' href='#{x}.css'/>" } end
def js(path)  handleArray(path) { |x| "\n<script src='#{x}.js'></script>" } end

def handleArray(arg)
  if    arg.is_a? String then yield(arg)
  elsif arg.is_a? Array  then arg.map{ |x| yield(x) }.join('')
  else  '' end
end

def include_slim(name, options = {}, &block)
  Slim::Template.new("#{name}.slim", options).render(self, &block)
end