class BidSerializer < ActiveModel::Serializer
  attributes :id, :price
  has_one :user
  has_one :ticket
end
