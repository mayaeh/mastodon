# frozen_string_literal: true

class Api::V1::Instances::BaseController < Api::BaseController
  skip_before_action :require_authenticated_user!,
                     unless: :whitelist_mode?

  vary_by ''
end
