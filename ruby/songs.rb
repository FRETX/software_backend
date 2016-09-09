post '/song' do
  data = JSON.parse request.body.read

  with_db do |conn|
    conn.exec_params "INSERT INTO songs (youtube_id,title,punches) VALUES ($1,$2,$3);", [data['id'],data['title'],JSON.generate(data['chords'])]    
  end

  upload_song( song_to_fretx(data) )

end

def song_to_fretx(data) 
  
  with_db do |conn|
  	payload = ""
  	key = "#{data['title']}.#{data['id']}.txt"
    data['chords'].each do |chord|
      time_ms = (chord['time']*1000).round()

      if(chord['chord'] == 'No Chord') then
        fingering = '{0}'
      else
        chord_obj = chord_from_name(chord['chord'])
        resp = conn.exec_params "SELECT * FROM chords WHERE root=$1 AND quality=$2", [chord_obj[:root_value], chord_obj[:quality]]
        fingering = resp[0]['fingering']
      end
      payload << "#{time_ms} #{fingering}\r\n"
    end
    { :key => key, :payload => payload }
  end
end