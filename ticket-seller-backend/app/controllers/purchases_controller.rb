class PurchasesController < ApplicationController

  def create
    purchase = Purchase.create(purchase_params)
    render json: purchase
  end

  def index
    purchases = Purchase.all
    render json: purchases, include: [:user, :ticket]
  end

  def destroy
    purchase = Purchase.find_by(ticket_id: params[:ticket_id])
    purchase.delete
  end

  private

  def purchase_params
    params.require(:purchase).permit(:user_id, :ticket_id, :price, :seller_id)
  end
end
