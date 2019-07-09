class AddTimerToTickets < ActiveRecord::Migration[5.2]
  def change
    add_column :tickets, :timer, :integer
  end
end
