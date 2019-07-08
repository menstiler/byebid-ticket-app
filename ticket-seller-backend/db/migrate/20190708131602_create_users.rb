class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :username
      t.string :email
      t.string :location
      t.integer :cc
      t.integer :cash

      t.timestamps
    end
  end
end
