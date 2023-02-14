# frozen_string_literal: true

class PushSubscriptionBlockPolicy < ApplicationPolicy
  def update?
    role.can?(:manage_federation)
  end
end
