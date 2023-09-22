# frozen_string_literal: true

module AuthorizedFetchHelper
  def authorized_fetch_mode?
    ENV.fetch('AUTHORIZED_FETCH') { Setting.authorized_fetch && 'true' } == 'true' || Rails.configuration.x.whitelist_mode
  end

  def authorized_fetch_overridden?
    ENV.key?('AUTHORIZED_FETCH') || Rails.configuration.x.whitelist_mode
  end
end
