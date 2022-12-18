# frozen_string_literal: true

module Admin
  class PushSubscriptionBlocksController < BaseController
    before_action :set_push_subscription_block, except: [:index, :new, :create]

    def index
      authorize :push_subscription_block, :update?
      @push_subscription_blocks = PushSubscriptionBlock.all
    end

    def new
      authorize :push_subscription_block, :update?
      @push_subscription_block = PushSubscriptionBlock.new
    end

    def create
      authorize :push_subscription_block, :update?

      @push_subscription_block = PushSubscriptionBlock.new(resource_params)

      if @push_subscription_block.save
        @push_subscription_block.enable!
        redirect_to admin_push_subscription_blocks_path
      else
        render action: :new
      end
    end

    def edit
      authorize :push_subscription_block, :update?
    end

    def update
      authorize :push_subscription_block, :update?

      if @push_subscription_block.update(resource_params)
        redirect_to admin_push_subscription_blocks_path
      else
        render action: :edit
      end
    end

    def destroy
      authorize :push_subscription_block, :update?
      @push_subscription_block.destroy
      redirect_to admin_push_subscription_blocks_path
    end

    def enable
      authorize :push_subscription_block, :update?
      @push_subscription_block.enable!
      redirect_to admin_push_subscription_blocks_path
    end

    def disable
      authorize :push_subscription_block, :update?
      @push_subscription_block.disable!
      redirect_to admin_push_subscription_blocks_path
    end

    private

    def set_push_subscription_block
      @push_subscription_block = PushSubscriptionBlock.find(params[:id])
    end

    def resource_params
      params.require(:push_subscription_block).permit(:name, :endpoint)
    end
  end
end
