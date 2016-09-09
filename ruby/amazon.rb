require 'aws-sdk'

def with_s3
  s3 = Aws::S3::Resource.new(
    region: 'ap-southeast-1',
    credentials: Aws::Credentials.new(ENV['AWS_KEY'],ENV['AWS_SECRET'])
  )
  yield(s3.bucket('hw003'))
end

def upload_song(fretx_song)
  with_s3 do |bucket|
    bucket.object(fretx_song[:key]).put( body: fretx_song[:payload] )
  end  
end

def list_songs
  with_s3 do |bucket|
    bucket.objects.map { |obj| obj.key }
  end
end