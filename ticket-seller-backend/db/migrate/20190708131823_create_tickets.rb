class CreateTickets < ActiveRecord::Migration[5.2]
  def change
    create_table :tickets do |t|
      t.string :title
      t.string :category
      t.string :location
      t.integer :buy_now
      t.integer :min_price
      t.string :time
      t.boolean :status
      t.integer :seller_id, default: nil

      t.timestamps
    end
  end
end
