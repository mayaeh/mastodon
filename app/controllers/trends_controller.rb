# frozen_string_literal: true

class InvitesController < ApplicationController
  include Authorization

  layout 'admin'

  before_action :authenticate_user!
  before_action :set_tags


  private

  def set_tags
    @tags = TrendingTags.get(limit_param(10))
  end
end
