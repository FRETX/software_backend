
def html_fb; "\n<html xmlns='http://www.w3.org/1999/xhtml' xmlns:fb='http://ogp.me/ns/fb#'>" end
def no_scaling; "\n<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'/>" end
def css(path) handleArray(path) { |x| "\n<link rel='stylesheet' type='text/css' href='#{x}.css'/>" } + "\n" end
def js(path)  handleArray(path) { |x| "\n<script src='#{x}.js'></script>" } + "\n" end

def handleArray(arg)
  if    arg.is_a? String then yield(arg)
  elsif arg.is_a? Array  then arg.map{ |x| yield(x) }.join('')
  else  '' end
end

def include_slim(name, options = {}, &block)
  Slim::Template.new("#{name}.slim", options).render(self, &block)
end

def render_slim(path, options = {})
  Slim::Template.new(path).render
end

def partial(name)
  include_slim( "partials/#{name}" )
end

def fb_image(path)  "\n<meta property='og:image'  content='#{path}'  />" end
def fb_title(title) "\n<meta property='og:title'  content='#{title}' />" end
def fb_type(type)   "\n<meta property='og:type'   content='#{type}'  />" end
def fb_url(url)     "\n<meta property='og:url'    content='#{url}'   />" end
def fb_appid(id)    "\n<meta property='fb:app_id' content='#{id}'    />" end

def fb_sdk(app_id)
 <<-eos
   <script>
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '#{app_id}',
        xfbml      : true,
        version    : 'v2.8'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    </script>
  eos
end