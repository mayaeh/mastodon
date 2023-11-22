# frozen_string_literal: true

module WellKnown
  class KeybaseProofConfigController < ActionController::Base # rubocop:disable Rails/ApplicationController
    def show
      render json: {}, serializer: ProofProvider::Keybase::ConfigSerializer, root: 'keybase_config'
    end
  end
end
