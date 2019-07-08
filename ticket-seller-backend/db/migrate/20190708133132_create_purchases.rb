class CreatePurchases < ActiveRecord::Migration[5.2]
  def change
    create_table :purchases do |t|
      t.references :user
      t.references :ticket
      t.integer :seller_id
      t.integer :price

      t.timestamps
    end
  end
end
