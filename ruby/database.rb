require_relative 'environment'
require 'sequel'
require 'pg'

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
  { :host     => uri.hostname,
    :port     => uri.port,
    :options  => nil,
    :tty      => nil,
    :dbname   => uri.path[1..-1],
    :user     => uri.user,
    :password => uri.password
  }
end


def jsonrow(sql);   "SELECT row_to_json(row) FROM (#{sql}) AS row"                             end
def jsonarray(sql); "SELECT coalesce(array_to_json(array_agg(row)),'[]') FROM (#{sql}) AS row" end

def get_val(resp, default); resp.ntuples==1 ? resp.getvalue(0,0) : default end

args = get_heroku_pg_args

$DB = Sequel.postgres(args[:dbname], args )
p $DB