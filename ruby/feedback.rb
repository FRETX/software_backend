post '/feedback' do 

  data = JSON.parse request.body.read

  with_db do |conn|
    resp = conn.exec_params "INSERT INTO feedback (email,message) VALUES ($1,$2);", [ data['email'], data['message'] ]
    
  end

end