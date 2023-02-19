class CreatePushSubscriptionBlocks < ActiveRecord::Migration[6.1]
  def change
    create_table :push_subscription_blocks do |t|
      t.string :name, null: false, default: ''
      t.string :endpoint, null: false
      t.boolean :enable, null: false, default: true

      t.timestamps
    end
  end
end
