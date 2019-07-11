class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :username, :cc, :tickets, :bids, :cash
end
