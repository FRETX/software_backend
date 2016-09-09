var picker;

data = {
  punches: [{ "time": 0, "disp_time": '00:00:00', "chord": "No Chord" }]
}

ctrl = {
  add_punch: function() {
    var time = player.getCurrentTime();
    var disp_time = secs_to_hms(time);
    var this_punch = { "time": time, "disp_time": disp_time, "chord": "No Chord" };
    data.punches.push(this_punch);
    data.punches.sort(SortByTime);

    var objDiv = document.getElementById("punchlist");
    objDiv.scrollTop = objDiv.scrollHeight;
    if(id('ask_chord').checked == true) {
      picker.set_chord('No Chord');
      picker.get_chord(function(chord) {
        this_punch.chord = chord;
      });
    }
  },
  delete_punch: function(e,m) {
    var i = data.punches.indexOf(m.punch);
  	data.punches.splice(i,1);
  },
  choose_chord: function(e,m) {
    picker.set_chord(m.punch.chord);
    picker.get_chord(function(chord) {
      m.punch.chord = chord;
    });
  }
}

$(document).ready(function() {
  setup_data_bindings();
  setup_event_triggers();
  picker = new chordpicker();
  load_youtube();
});

function upload() {
  var title = window.prompt("Enter The Name Of Your Song", videodata.title);
  var songdata = {
    id: videodata.id,
    title: title,
    chords: data.punches
  }
  $.post('/song', JSON.stringify(songdata));
}

function setup_data_bindings() {
  rivets.bind($('body'), { data: data, ctrl: ctrl });
}

function setup_event_triggers() {
  $('.addvid input').on('focus', on_addvid_focus);
  $('.addvid input').on('blur', on_addvid_blur);
  $('.addvid button').on('click', on_addvid_click);
  $('.chord').on('focus', on_chord_focus);
}

function on_addvid_focus(e) {
  if(e.target.value == "Add the link to your YouTube video here..." ) { e.target.value = ''; }
  else { e.target.select(); }
}

function on_addvid_blur(e) {
  e.target.value = e.target.value ? e.target.value : "Add the link to your YouTube video here..."
}

function on_addvid_click(e) {
  var regex = /https:\/\/www.youtube.com\/watch\?v=(.{11})/;
  var match = regex.exec($('#link').val());
  if(!match) { alert('invalid syntax'); return; }
  player.loadVideoById(match[1], 0, "large")
  get_video_data(match[1]);
}

function on_chord_focus(e) {
  e.target.blur();
}

function secs_to_hms(secs) {
  hrs  = Math.floor(secs/3600);
  secs = secs - hrs*3600;
  mins = Math.floor(secs/60);
  secs = secs - mins*60;
  secs = Math.round(secs);

  hrs  = hrs.toLocaleString('en-US',  {minimumIntegerDigits: 2, useGrouping:false});
  mins = mins.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  secs = secs.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

  return(hrs + ':' + mins + ':' + secs);
}

function SortByTime(a, b) { 
  return ((a.time < b.time) ? -1 : ((a.time > b.time) ? 1 : 0));
}

data.punches = [{"time":0,"disp_time":"00:00:00","chord":"A min"},{"time":43.7438420038147,"disp_time":"00:00:44","chord":"D 7"},{"time":47.19748483596802,"disp_time":"00:00:47","chord":"A 7"},{"time":50.749741881744384,"disp_time":"00:00:51","chord":"E 7"},{"time":54.245463933242796,"disp_time":"00:00:54","chord":"A 7"},{"time":57.77445897711181,"disp_time":"00:00:58","chord":"D 7"},{"time":61.19744483596802,"disp_time":"00:01:01","chord":"A 7"},{"time":64.71735281689453,"disp_time":"00:01:05","chord":"E 7"},{"time":68.24618986076355,"disp_time":"00:01:08","chord":"A 7"},{"time":71.74198591226197,"disp_time":"00:01:12","chord":"D 7"},{"time":75.11802783978271,"disp_time":"00:01:15","chord":"A 7"},{"time":78.38150708964538,"disp_time":"00:01:18","chord":"E 7"},{"time":81.66191198855591,"disp_time":"00:01:22","chord":"A 7"},{"time":84.95714306484986,"disp_time":"00:01:25","chord":"D 7"},{"time":88.22900090081787,"disp_time":"00:01:28","chord":"A 7"},{"time":91.57471385694885,"disp_time":"00:01:32","chord":"E 7"},{"time":94.88573196566773,"disp_time":"00:01:35","chord":"A 7"},{"time":98.14962590463257,"disp_time":"00:01:38","chord":"D 7"},{"time":101.4947749332428,"disp_time":"00:01:41","chord":"A 7"},{"time":104.79781190653992,"disp_time":"00:01:45","chord":"E 7"},{"time":108.17370107247925,"disp_time":"00:01:48","chord":"A 7"},{"time":111.4620989408722,"disp_time":"00:01:51","chord":"D 7"},{"time":114.79745290653992,"disp_time":"00:01:55","chord":"A 7"},{"time":118.14917790463257,"disp_time":"00:01:58","chord":"E 7"},{"time":121.50143990272522,"disp_time":"00:02:02","chord":"A 7"},{"time":124.87018386076355,"disp_time":"00:02:05","chord":"D 7"},{"time":128.26932502861024,"disp_time":"00:02:08","chord":"A 7"},{"time":131.62938892370605,"disp_time":"00:02:12","chord":"E 7"},{"time":134.94313081498717,"disp_time":"00:02:15","chord":"A 7"},{"time":138.34113505531312,"disp_time":"00:02:18","chord":"D 7"},{"time":141.685091917984,"disp_time":"00:02:22","chord":"A 7"},{"time":145.0290120190735,"disp_time":"00:02:25","chord":"E 7"},{"time":148.34186898283386,"disp_time":"00:02:28","chord":"A 7"},{"time":151.69380698092652,"disp_time":"00:02:32","chord":"D 7"},{"time":155.03675491607666,"disp_time":"00:02:35","chord":"A 7"},{"time":158.57365509536743,"disp_time":"00:02:39","chord":"E 7"},{"time":161.78165404005432,"disp_time":"00:02:42","chord":"A 7"},{"time":165.11764000572205,"disp_time":"00:02:45","chord":"D 7"},{"time":168.4695700038147,"disp_time":"00:02:48","chord":"A 7"},{"time":171.82201300190735,"disp_time":"00:02:52","chord":"E 7"},{"time":175.10974613923645,"disp_time":"00:02:55","chord":"A 7"},{"time":178.53347489509582,"disp_time":"00:02:59","chord":"D 7"},{"time":181.91741695803833,"disp_time":"00:03:02","chord":"A 7"},{"time":185.29342088555907,"disp_time":"00:03:05","chord":"E 7"},{"time":188.67768794850159,"disp_time":"00:03:09","chord":"A 7"},{"time":192.05411104196168,"disp_time":"00:03:12","chord":"D 7"},{"time":195.34905587983704,"disp_time":"00:03:15","chord":"A 7"},{"time":198.62132095422362,"disp_time":"00:03:19","chord":"E 7"},{"time":202.00492301716613,"disp_time":"00:03:22","chord":"A 7"},{"time":205.27732309155274,"disp_time":"00:03:25","chord":"D 7"},{"time":208.65231609155273,"disp_time":"00:03:29","chord":"A 7"},{"time":212.02135504959105,"disp_time":"00:03:32","chord":"E 7"},{"time":215.35668801525878,"disp_time":"00:03:35","chord":"A 7"},{"time":218.73292494277953,"disp_time":"00:03:39","chord":"D 7"},{"time":222.1180119332428,"disp_time":"00:03:42","chord":"A 7"},{"time":225.46960693133545,"disp_time":"00:03:45","chord":"E 7"},{"time":229.0699310743866,"disp_time":"00:03:49","chord":"A 7"},{"time":232.16474810299684,"disp_time":"00:03:52","chord":"D 7"},{"time":235.54938409346008,"disp_time":"00:03:56","chord":"A 7"},{"time":238.85331499427795,"disp_time":"00:03:59","chord":"E 7"},{"time":242.2293369217987,"disp_time":"00:04:02","chord":"A 7"},{"time":245.53325206103514,"disp_time":"00:04:06","chord":"D 7"},{"time":248.78146296757507,"disp_time":"00:04:09","chord":"A 7"},{"time":252.22234895231628,"disp_time":"00:04:12","chord":"E 7"},{"time":255.18120906294251,"disp_time":"00:04:15","chord":"A 7"},{"time":259.0294311125336,"disp_time":"00:04:19","chord":"D 7"},{"time":262.57445995040894,"disp_time":"00:04:23","chord":"A 7"},{"time":265.92499002098083,"disp_time":"00:04:26","chord":"E 7"},{"time":269.43786603242495,"disp_time":"00:04:29","chord":"A 7"},{"time":272.8690290267029,"disp_time":"00:04:33","chord":"D 7"},{"time":276.31769590844726,"disp_time":"00:04:36","chord":"A 7"},{"time":279.6536211125336,"disp_time":"00:04:40","chord":"E 7"},{"time":282.99772797520444,"disp_time":"00:04:43","chord":"A 7"},{"time":286.2615399141693,"disp_time":"00:04:46","chord":"D 7"},{"time":289.5257000915527,"disp_time":"00:04:50","chord":"A 7"},{"time":292.7896060305176,"disp_time":"00:04:53","chord":"E 7"},{"time":296.08595103433225,"disp_time":"00:04:56","chord":"A 7"},{"time":299.3175329084473,"disp_time":"00:04:59","chord":"D 7"},{"time":302.61329091226196,"disp_time":"00:05:03","chord":"A 7"},{"time":305.88517998664855,"disp_time":"00:05:06","chord":"E 7"},{"time":309.2376989847412,"disp_time":"00:05:09","chord":"A 7"},{"time":312.65424104005433,"disp_time":"00:05:13","chord":"D 7"},{"time":316.0623661049042,"disp_time":"00:05:16","chord":"A 7"},{"time":319.3970780705719,"disp_time":"00:05:19","chord":"E 7"},{"time":322.7979530934601,"disp_time":"00:05:23","chord":"A 7"},{"time":326.15800998855593,"disp_time":"00:05:26","chord":"D 7"},{"time":329.60595294277954,"disp_time":"00:05:30","chord":"A 7"},{"time":332.95001304386903,"disp_time":"00:05:33","chord":"E 7"},{"time":336.38171796566775,"disp_time":"00:05:36","chord":"A 7"},{"time":339.7659360286102,"disp_time":"00:05:40","chord":"D 7"},{"time":343.2457780476837,"disp_time":"00:05:43","chord":"A 7"},{"time":346.52208397711183,"disp_time":"00:05:47","chord":"E 7"},{"time":349.86852095422364,"disp_time":"00:05:50","chord":"A 7"},{"time":353.3974929980927,"disp_time":"00:05:53","chord":"D 7"},{"time":356.3086540114441,"disp_time":"00:05:56","chord":"A 7"},{"time":359.5654509809265,"disp_time":"00:05:60","chord":"E 7"},{"time":364.2022648531342,"disp_time":"00:06:04","chord":"No Chord"},{"time":454.07006802288817,"disp_time":"00:07:34","chord":"D Maj"},{"time":457.46174698283386,"disp_time":"00:07:37","chord":"A Maj"}]