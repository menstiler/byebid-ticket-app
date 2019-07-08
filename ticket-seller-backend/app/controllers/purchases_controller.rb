class PurchasesController < ApplicationController

  def create
    purchase = Purchase.create(purchase_params)
    render json: purchase
  end


  private

  def purchase_params
    params.require(:purchase).permit(:user_id, :ticket_id, :price, :seller_id)
  end
end
