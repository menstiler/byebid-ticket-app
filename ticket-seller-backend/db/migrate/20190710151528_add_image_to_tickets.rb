class AddImageToTickets < ActiveRecord::Migration[5.2]
  def change
    add_column :tickets, :image_url, :string
  end
end
