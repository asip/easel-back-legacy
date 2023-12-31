# frozen_string_literal: true

# sorcery activity logging
class SorceryActivityLogging < ActiveRecord::Migration[5.1]
  # rubocop:disable Rails/BulkChangeTable
  def change
    add_column :users, :last_login_at, :datetime, default: nil
    add_column :users, :last_logout_at, :datetime, default: nil
    add_column :users, :last_activity_at, :datetime, default: nil
    add_column :users, :last_login_from_ip_address, :string, default: nil

    add_index :users, %i[last_logout_at last_activity_at]
  end
  # rubocop:enable Rails/BulkChangeTable
end
