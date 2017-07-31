function FeedbackForm(parent_element) {
  this.build_dom(parent_element);
  this.bind_dom();
  this.load_styles();
  this.bind_handlers();
  this.get_dom_refs();
}

FeedbackForm.prototype = {
  constructor: FeedbackForm,

  build_dom(parent_element) { this.dom = render(this.HTML);  if(!empty(parent_element)) parent_element.appendChild(this.dom); },
  bind_dom()                { rivets.bind(this.dom, { this: this }); },
  load_styles()             { load_css('fretboard_styles', this.CSS); },

  get_dom_refs()            {
    this.email   = this.dom.getElementsByTagName('input')[0]; 
    this.message = this.dom.getElementsByTagName('textarea')[0];
    this.content = this.dom.getElementsByClassName('content')[0];
    this.success = this.dom.getElementsByClassName('success')[0];
    this.failure = this.dom.getElementsByClassName('failure')[0];
    this.loading = this.dom.getElementsByClassName('loading')[0];
  },

  post() {
    var data = JSON.stringify( { email: this.email.value, message: this.message.value } );
    $.post('/feedback', data, this.on_posted ).fail( this.on_failed );
  }

}

Object.assign( 
  FeedbackForm.prototype, {

    bind_handlers() {
      this.on_email_focus  = this.on_email_focus.bind(this);
      this.on_email_blur   = this.on_email_blur.bind(this);
      this.on_text_focus   = this.on_text_focus.bind(this);
      this.on_text_blur    = this.on_text_blur.bind(this);
      this.on_submit_click = this.on_submit_click.bind(this);
      this.on_posted       = this.on_posted.bind(this);
      this.on_failed       = this.on_failed.bind(this);
      this.reset           = this.reset.bind(this);
    },

    on_email_focus(e,m) {
      e.target.style.color = 'black';
      if(e.target.value == "Your E-Mail Address" ) { e.target.value = ''; }
      else { e.target.select(); }
    },

    on_email_blur(e,m) {
      e.target.value = ( e.target.value == '' ? "Your E-Mail Address" : e.target.value ); 
      if(e.target.value == 'Your E-Mail Address' ) { e.target.style.color = 'grey'; }
    },

    on_text_focus(e,m) {
      e.target.style.color = 'black';
      if(e.target.value == "Tell Us What You Think!" ) { e.target.value = ''; }
      else { e.target.select(); }
    },

    on_text_blur(e,m) {
      e.target.value = ( e.target.value == '' ? "Tell Us What You Think!" : e.target.value ); 
      if(e.target.value == 'Tell Us What You Think!' ) { e.target.style.color = 'grey'; }
    },

    on_submit_click(e,m) { this.on_loading(); this.post(); },

    on_loading() {
      this.content.style.display = 'none';
      this.success.style.display = 'none';
      this.failure.style.display = 'none';
      this.loading.style.display = 'inline-block';
    },

    on_posted() {
      this.content.style.display = 'none';
      this.loading.style.display = 'none';
      this.failure.style.display = 'none';
      this.success.style.display = 'inline-block';
      setTimeout(this.reset, 700 );
    },

    on_failed() {
      this.content.style.display = 'none';
      this.loading.style.display = 'none';
      this.success.style.display = 'none';
      this.failure.style.display = 'inline-block';
      setTimeout(this.reset, 700 );
    },

    reset() {
      this.ev_fire('done');
      this.success.style.display = 'none';
      this.failure.style.display = 'none';
      this.content.style.display = 'inline-block';
      this.email.value = 'Your E-Mail Address';
      this.email.style.color = 'grey';
      this.message.value = 'Tell Us What You Think!';
      this.message.style.color = 'grey';
    }

  }
);

Object.assign( FeedbackForm.prototype, ev_channel );

FeedbackForm.prototype.HTML = `
  
  <div id='FeedbackForm'>
    <div class='content'>
      <div class='field'>
        <input rv-on-focus='this.on_email_focus' rv-on-blur='this.on_email_blur' value='Your E-Mail Address'></input>
      </div>
      <div class='field'>
        <textarea rv-on-focus='this.on_text_focus' rv-on-blur='this.on_text_blur'>Tell Us What You Think!</textarea>
      </div>
      <div class='field'>
        <button rv-on-click='this.on_submit_click'> Send </button>
      </div>
    </div>
    <div class='loading'><span><img src='loading.gif'></img></span></div>
    <div class='success'><span>Thanks!</span></div>
    <div class='failure'><span>Something Went Wrong. Sorry!</span></div>
  </div>

`.untab(2);

FeedbackForm.prototype.CSS = `

  #FeedbackForm .field {
  	background: rgb(200,200,200);
  	padding: 1em;
  	border: 1px solid black;
  	box-shadow: 0 0 0.4em black;
  	margin: 1em 0;
  }

  #FeedbackForm .field:first-child { margin-top: 0; }
  #FeedbackForm .field:last-child  { margin-bottom: 0; }

  #feedbackForm input,
  #feedbackForm textarea,
  #feedbackForm button {
  	font-size: 1.5em;
  	box-shadow: 0 0 0.4em black;
    font-family: monospace;
  }

  #FeedbackForm input,
  #FeedbackForm button {
    padding: 0.25em 0.75em;
    border-radius: 0.4em;
    border: 0;
  }

  #FeedbackForm input {
    color: grey;
  }

  #FeedbackForm textarea {
    padding: 0.5em;
  	height: 15em;
  	width: 100%;
    color: grey;
  }

  #FeedbackForm button {
    cursor: pointer;
  }

  #FeedbackForm button:hover {
    box-shadow: 0 0 0.7em black;
  }

  #FeedbackForm .success,
  #FeedbackForm .failure,
  #FeedbackForm .loading {
    display: none;
  }

  #FeedbackForm .failure { background-color: rgba(255,0,0,0.8); }
  #FeedbackForm .success { background-color: rgba(0,255,0,0.8); }

  #FeedbackForm .failure,
  #FeedbackForm .success,
  #FeedbackForm .loading {
    height: 5em;
    width: 10em;
    padding: 3em;
    font-size: 2.5em;
    font-family: monospace;
    box-shadow: 0 0 0.4em black, 0 0 2em black inset;  
  }

  #FeedbackForm .loading img {
    height: 6em;
  }

  #FeedbackForm .failure::before,
  #FeedbackForm .success::before,
  #FeedbackForm .loading::before {
    content: '';
    vertical-align: middle;
    display: inline-block;
    height: 100%;
  }
  
  #FeedbackForm span {
    display: inline-block;
    vertical-align: middle;
  }

`.untab(2);