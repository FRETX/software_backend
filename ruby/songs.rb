get '/songs/index.json' do
  content_type :json
  with_db do |conn|
    query = "SELECT DISTINCT ON(youtube_id) id, youtube_id, title, artist, song_title, uploaded_on FROM songs ORDER BY youtube_id, uploaded_on DESC"
    resp = conn.exec jsonarray( query )
    get_val(resp,[])
  end
end

get '/songs/:youtube_id.txt' do
  with_db do |conn|
    resp = conn.exec_params jsonrow("SELECT DISTINCT ON(youtube_id) youtube_id, punches, uploaded_on FROM songs WHERE youtube_id = $1 ORDER BY youtube_id, uploaded_on DESC"), [params[:youtube_id]]
    halt 404 if resp.ntuples==0 
    val = JSON.parse get_val( resp, "{}" )
    p val
    song_to_fretx_raw( val['punches'] )
  end
end

get '/songs/:youtube_id.json' do
  with_db do |conn|
    resp = conn.exec_params jsonrow("SELECT DISTINCT ON(youtube_id) youtube_id, uploaded_on, title, artist, song_title, punches FROM songs WHERE youtube_id = $1 ORDER BY youtube_id, uploaded_on DESC"), [params[:youtube_id]]
    halt 404 if resp.ntuples==0 
    val = JSON.parse get_val( resp, "{}" )
    val['punches'] = convert_punches val['punches']
    JSON.pretty_generate( val )
  end
end

get '/mysongs' do
  content_type :json
  return 401 unless logged_in?
  with_db do |conn|
    if session[:user].has_role? 'admin' then
      query = "SELECT DISTINCT ON(youtube_id) id,uploaded_on,youtube_id,title,punches FROM songs ORDER BY youtube_id,uploaded_on DESC"
    else
      query = "SELECT DISTINCT ON(youtube_id) id,uploaded_on,youtube_id,title,punches FROM songs WHERE uploaded_by=#{session[:user].id} ORDER BY youtube_id,uploaded_on DESC"
    end
    resp = conn.exec jsonarray(query)
    get_val(resp,[])
  end
end

get '/songs/list' do
  content_type :json
  with_db do |conn|
    query = "SELECT DISTINCT ON(youtube_id) id,uploaded_on,youtube_id,title,punches FROM songs ORDER BY youtube_id,uploaded_on DESC"
    resp = conn.exec jsonarray(query)
    get_val(resp,[])
  end
end

post '/songs/add' do
  return 401 unless logged_in?
  with_db do |conn|
    data = JSON.parse request.body.read
    query = %{
      INSERT INTO songs (uploaded_by, youtube_id, title, punches)
      SELECT $1, $2, $3, $4
      RETURNING id;
    } 
    uploaded_by = ( session[:user].nil? ? '0' : session[:user].id )
    conn.exec_params( query, [ uploaded_by, data['id'], data['title'], JSON.generate(data['chords']) ] )
  end 
end

def song_to_fretx(data) 
  with_db do |conn|
  	payload = ""
  	key = "#{data['title']}.#{data['id']}.txt"
    data['chords'].each do |chord|
      time_ms = ( chord['time'].to_f * 1000 ).round()
      if(chord['chord'] == 'No Chord') then
        fingering = '{0}'
      else
        chord_obj = chord_from_name(chord['chord'])
        resp = conn.exec_params "SELECT * FROM chords WHERE root=$1 AND quality=$2", [chord_obj[:root_value], chord_obj[:quality]]
         return { :error => 'Unknown Chord', :chord => chord['chord'] } if resp.ntuples==0
        fingering = resp[0]['fingering']
      end
      payload << "#{time_ms} #{fingering}\r\n"
    end
    data['chords'].first(4) 
    { :key => key, :payload => payload }
  end
end

def song_to_fretx_raw(data)
  with_db do |conn|
    payload = ""
    p data
    data.each do |chord|
      time_ms = ( chord['time'].to_f * 1000 ).round()
      if(chord['chord'] == 'No Chord') then
        fingering = '{0}'
      else
        chord_obj = chord_from_name(chord['chord'])
        resp = conn.exec_params "SELECT * FROM chords WHERE root=$1 AND quality=$2", [chord_obj[:root_value], chord_obj[:quality]]
        return { :error => 'Unknown Chord', :chord => chord['chord'] } if resp.ntuples==0
        fingering = resp[0]['fingering']
      end
      payload << "#{time_ms} #{fingering}\r\n"
    end
    payload
  end
end

def convert_punches(punches)
  with_db do |conn|
    punches.each do |punch|
      punch[:time_ms] = ( punch['time'].to_f * 1000 ).round()
      punch[:chord] = { :name => punch['chord'] }
      punch.delete('time')
      punch.delete('disp_time')
      punch.delete('chord')

      if( punch[:chord][:name] == 'No Chord') then
        punch[:chord][:root]    = ""
        punch[:chord][:rootval] = 0
        punch[:chord][:quality] = ""
        punch[:chord][:fingering] = '{0}'
      else
        chord_obj = chord_from_name(punch[:chord][:name])  
        punch[:chord][:root]    = chord_obj[:root]
        punch[:chord][:rootval] = chord_obj[:root_value]
        punch[:chord][:quality] = chord_obj[:quality]
        resp = conn.exec_params "SELECT * FROM chords WHERE root=$1 AND quality=$2", [chord_obj[:root_value], chord_obj[:quality]]
        punch[:chord][:fingering] = resp[0]['fingering']
      end
    end
  end   
end