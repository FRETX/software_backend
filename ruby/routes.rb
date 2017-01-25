######################################## PAGE ROUTES ###########################################

get('/')                          { fetch_page :player }
get('/player')                    { fetch_page :player }
get('/login')                     { fetch_page :login  }
get('/editor', :auth => 'user' )  { fetch_page :editor }
get('/list',   :auth => 'user' )  { fetch_page :list   }




######################################## PAGE ROUTES ###########################################

get('/elements/:name.html') { fetch_element params[:name] }

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


def fetch_page(page_name)    slim :"../pages/#{page_name}/#{page_name}"    end
def fetch_element(elem_name) slim :"../elements/#{elem_name}/#{elem_name}" end
def fetch_elem_js(js_name)   slim :"../elements/#{js_name}/#{js_name}"     end

get('/:youtube_id')               { fetch_page :player }