class AddTimerToTickets < ActiveRecord::Migration[5.2]
  def change
    add_column :tickets, :date, :string
  end
end
