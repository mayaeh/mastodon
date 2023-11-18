# frozen_string_literal: true

module WellKnown
  class KeybaseProofConfigController < ApplicationController
    def show
      render json: {}, serializer: ProofProvider::Keybase::ConfigSerializer, root: 'keybase_config'
    end
  end
end
