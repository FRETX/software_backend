def with_db
  with_catch do
    begin
      args = {
        :host     => '',
        :port     => '',
        :options  => nil,
        :tty      => nil,
        :dbname   => '',
        :user     => '',
        :password => ''
      }
      conn = PG::Connection.new(args)
      yield conn
    ensure conn.close unless conn.nil?
    end
  end 
end