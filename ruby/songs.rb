get '/songs/index.json' do
  content_type :json
  with_db do |conn|
    query = "SELECT DISTINCT ON(youtube_id) id, youtube_id, title, artist, song_title, uploaded_on FROM songs ORDER BY youtube_id, uploaded_on DESC"
    resp = conn.exec jsonarray( query )
    get_val(resp,[])
  end
end

get '/songs/:id.txt' do
  with_db do |conn|
    resp = conn.exec_params jsonrow("SELECT punches,uploaded_on FROM songs WHERE id = $1"), [params[:id]]
    halt 404 if resp.ntuples==0 
    val = JSON.parse get_val( resp, [] )
    p val
    song_to_fretx_raw( val['punches'] )
  end
end

get '/songs/list' do
  content_type :json
  with_db do |conn|
    resp = conn.exec jsonarray("SELECT DISTINCT ON(youtube_id) id,uploaded_on,youtube_id,title,punches FROM songs ORDER BY youtube_id,uploaded_on DESC")
    get_val(resp,[])
  end
end

post '/songs/add' do
  with_db do |conn|
    data = JSON.parse request.body.read
    query = %{
      INSERT INTO songs (youtube_id,title,punches)
      SELECT $1, $2, $3
      RETURNING id;
    } 
    conn.exec_params( query, [data['id'],data['title'],JSON.generate(data['chords'])] )
    song = song_to_fretx(data)
    puts song
    halt 500, JSON.pretty_generate(song) unless song[:error].nil?
    upload_song( song )
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