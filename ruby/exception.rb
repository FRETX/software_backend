def print_exception(e) 

  %{
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

#{e.message}

#{e.backtrace.join("\n")}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////}

end


def with_catch
  yield
rescue Exception => e
  status 500	 
  print_exception(e)
end