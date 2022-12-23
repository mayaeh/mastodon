# frozen_string_literal: true

class PushSubscriptionBlockPolicy < ApplicationPolicy
  def update?
    role.can?(:administrator)
  end
end
