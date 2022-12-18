# frozen_string_literal: true
# == Schema Information
#
# Table name: push_subscription_blocks
#
#  id         :bigint(8)        not null, primary key
#  name       :string           default(""), not null
#  endpoint   :string           not null
#  enable     :boolean          default(TRUE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class PushSubscriptionBlock < ApplicationRecord
  CACHE_KEY = 'push_subscription_blocks'

  validates :endpoint, presence: true, uniqueness: true, url: true, if: :will_save_change_to_endpoint?

  after_commit :reset_cache

  def enable!
    update!(enable: true)
  end

  def disable!
    update!(enable: false)
  end

  class << self
    def allow?(url)
      !deny?(url)
    end

    def deny?(url)
      blocks = Rails.cache.fetch(CACHE_KEY) { Regexp.union(PushSubscriptionBlock.where(enable: true).pluck(:endpoint).map { |pattern| Regexp.new("^#{Regexp.escape(pattern)}", Regexp::IGNORECASE) }) }
      blocks.match?(url)
    end
  end

  private

  def reset_cache
    Rails.cache.delete(CACHE_KEY)
  end
end
