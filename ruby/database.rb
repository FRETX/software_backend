def with_db
  with_catch do
    begin
      conn = PG::Connection.new(get_heroku_pg_args)
      yield conn
    ensure conn.close unless conn.nil? end
  end 
end

def get_heroku_pg_args
  uri = URI.parse(ENV['DATABASE_URL'])
  args = {
    :host     => uri.hostname,
    :port     => uri.port,
    :options  => nil,
    :tty      => nil,
    :dbname   => uri.path[1..-1],
    :user     => uri.user,
    :password => uri.password
  }
  p args
end