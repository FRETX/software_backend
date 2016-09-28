get '/songs/applist' do
  content_type :json
  with_db do |conn|
    resp = conn.exec jsonarray("SELECT id AS key, title, youtube_id FROM songs")
    get_val(resp,[])
  end
end

get '/songs/list' do
  content_type :json
  with_db do |conn|
    resp = conn.exec jsonarray("SELECT * FROM songs")
    get_val(resp,[])
  end
end

post '/songs/add' do
  with_db do |conn|
    data = JSON.parse request.body.read

    query = %{
      WITH update AS (
        UPDATE songs 
        SET punches = $3, title = $2
        WHERE youtube_id = $1
        RETURNING id
      )
      INSERT INTO songs (youtube_id,title,punches)
      SELECT $1, $2, $3
      WHERE NOT EXISTS (SELECT * FROM UPDATE)
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
