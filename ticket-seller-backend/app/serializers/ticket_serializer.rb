class TicketSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :title, :category, :location, :time, :date, :status, :seller_id, :buy_now, :min_price, :bids
  has_many :bids
end
