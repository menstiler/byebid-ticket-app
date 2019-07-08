class Ticket < ApplicationRecord
  has_many :purchases


  def owner
    self.purchases.first.user
  end
  
end
