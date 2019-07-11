class Ticket < ApplicationRecord
  has_many :purchases
  has_many :bids

  validates :title, :category, :date, :location, :time, :image_url, :min_price, :buy_now, presence: true
  def valid_time

  end
end
