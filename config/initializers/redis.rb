# frozen_string_literal: true

Redis.exists_returns_integer = true

redis_connection = Redis.new(
  url: ENV['REDIS_URL'],
  driver: :hiredis
)

namespace = ENV.fetch('REDIS_NAMESPACE') { nil }

if namespace
  Redis.current = Redis::Namespace.new(namespace, redis: redis_connection)
else
  Redis.current = redis_connection
end
