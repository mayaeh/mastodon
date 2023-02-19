Fabricator(:push_subscription_block) do
  name     'tootle'
  endpoint 'https://tootleformastodon.appspot.com/api/v1/notifications/callback/'
  enable   true
end
