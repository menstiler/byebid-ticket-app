class Ticket < ApplicationRecord
  has_many :purchases
  has_many :bids

  def valid_time

  end 
end
