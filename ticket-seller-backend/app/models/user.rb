class User < ApplicationRecord
  has_many :purchases
  has_many :tickets, through: :purchases
  has_many :bids

  validates :name, :username, presence: true
  validates :username, uniqueness: true

end
