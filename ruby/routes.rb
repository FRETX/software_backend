get '/elements/:name.html' do
  slim(:"../elements/#{params[:name]}/#{params[:name]}")
end

get '/elements/:name.js' do
  pass unless File.file? "elements/#{params[:name]}/#{params[:name]}.js"	
  send_file "elements/#{params[:name]}/#{params[:name]}.js"
end

get '/pages/elements/:name.js' do
  pass unless File.file? "elements/#{params[:name]}/#{params[:name]}.js"  
  send_file "elements/#{params[:name]}/#{params[:name]}.js"
end

get '/elements/:name.css' do
  pass unless File.file? "elements/#{params[:name]}/#{params[:name]}.css"
  send_file "/elements/#{params[:name]}/#{params[:name]}.css"
end

get '/pages/:name.html' do
  slim(:"../pages/#{params[:name]}/#{params[:name]}")
end

get '/:name.js' do
  pass unless File.file? "pages/#{params[:name]}/#{params[:name]}.js"  
  send_file "pages/#{params[:name]}/#{params[:name]}.js"
end

get '/pages/:name.js' do
  pass unless File.file? "pages/#{params[:name]}/#{params[:name]}.js"  
  send_file "pages/#{params[:name]}/#{params[:name]}.js"
end

get '/:name.css' do
  pass unless File.file? "pages/#{params[:name]}/#{params[:name]}.css"
  send_file "pages/#{params[:name]}/#{params[:name]}.css"
end

get '/pages/:name.css' do
  pass unless File.file? "pages/#{params[:name]}/#{params[:name]}.css"
  send_file "pages/#{params[:name]}/#{params[:name]}.css"
end


get('/')                          { slim(:"../pages/player/player" ) }
get('/player')                    { slim(:"../pages/player/player")  }
get('/login')                     { slim(:"../pages/login/login")    }
get('/editor', :auth => 'admin' ) { slim(:"../pages/editor/editor")  }
get('/list',   :auth => 'admin' ) { slim(:"../pages/list/list")      } 


get('*/:file.html')         { slim params[:file].to_sym            }
get('*/:file.css' )         { send_file "css/#{params[:file]}.css" }
get('*/:file.js'  )         { send_file "js/#{params[:file]}.js"   }

get /(.*\/)?(.*)\.(jpeg|jpg|png|gif|ico|svg)/ do
  path = request.path
  path = path.sub('/css/', '/');
  path = path.sub('/pages/', '/');
  return 404 unless File.exist? "img#{path}"
  response['Cache-Control'] = 'public, max-age=86400'
  send_file "img#{path}"
end

get /.*\.(ttf|woff|eot|svg|woff2)/ do
  path = request.path
  path = path.sub('/css/', '/')
  path = path.sub('/pages/', '/')
  path = path.sub('/elements/', '/')
  return 404 unless File.exist? "fonts#{path}"
  response['Cache-Control'] = 'public, max-age=86400'
  send_file "fonts#{path}"
end