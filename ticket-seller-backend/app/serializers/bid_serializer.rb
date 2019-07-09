class BidSerializer < ActiveModel::Serializer
  attributes :id, :price, :user
  has_one :user
  has_one :ticket
end
