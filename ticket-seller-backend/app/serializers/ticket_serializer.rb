class TicketSerializer < ActiveModel::Serializer
  attributes :id, :title, :category, :date, :location, :time, :status, :seller_id, :buy_now, :min_price, :bids
  has_many :bids
end
