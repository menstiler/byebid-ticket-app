class Ticket < ApplicationRecord
  has_many :purchases
  has_many :bids

end
