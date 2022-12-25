# frozen_string_literal: true

class PushSubscriptionBlockPolicy < ApplicationPolicy
  def update?
    admin?
  end
end
