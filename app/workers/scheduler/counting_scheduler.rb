# frozen_string_literal: true

class Scheduler::CountingScheduler
  include Sidekiq::Worker

  sidekiq_options unique: :until_executed, retry: 0

  def perform
    recount_tag_scores!
  end

  private

  def recount_tag_scores!
    Tag.find_each { |tag| tag.update(score: Redis.current.pfcount(*(0..7).map { |i| "activity:tags:#{tag.id}:#{i.days.ago.beginning_of_day.to_i}:accounts" })) }
  end
end
