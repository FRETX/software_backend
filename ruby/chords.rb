$CHORD_VALIDATION_REGEX = /(?<root>([A,D,G][b|#]?)|([B,E]b?)|([C,F]#?)) (?<quality>Maj|min|5|7|Maj7|m7|sus4|add9|sus2|7sus4|7#9|9)/

get '/chords/:chordname' do
  chord = $CHORD_VALIDATION_REGEX.match(params[:chordname])
  halt 404 if chord.nil?

  p chord
  p root_value(chord[:root])

  with_db do |conn|
    resp = conn.exec_params "SELECT * FROM chords WHERE root=$1 AND quality=$2;" [root_value(chord[:root]),chord[:quality]]
    
  end
end


def root_value(note_name)
  case note_name
  when 'C'       then 1
  when 'C#','Db' then 2
  when 'D'       then 3
  when 'D#','Eb' then 4
  when 'E'       then 5
  when 'F'       then 6
  when 'F#','Gb' then 7
  when 'G'       then 8
  when 'G#','Ab' then 9
  when 'A'       then 10
  when 'A#','Bb' then 11
  when 'B'       then 12
  else nil
  end
end