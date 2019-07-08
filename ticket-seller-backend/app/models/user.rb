class User < ApplicationRecord
  has_many :purchases
  has_many :tickets, through: :purchases
end
