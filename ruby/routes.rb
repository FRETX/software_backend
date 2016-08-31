get('/')                    { slim :index                          }
get('*/:file.html')         { slim params[:file].to_sym            }
get('*/:file.css' )         { send_file "css/#{params[:file]}.css" }
get('*/:file.js'  )         { send_file "js/#{params[:file]}.js"   }

get /.*\.(jpeg|jpg|png|gif|ico|svg)/ do
  path = request.path.sub('/css/', '/');
  return 404 unless File.exist? "img#{path}"
  response['Cache-Control'] = 'public, max-age=86400'
  send_file "img#{path}"
end

get /.*\.(ttf|woff|eot|svg|woff2)/ do
  path = request.path.sub('/css/', '/')
  return 404 unless File.exist? "fonts#{path}"
  response['Cache-Control'] = 'public, max-age=86400'
  send_file "fonts#{path}"
end