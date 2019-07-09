class PurchasesController < ApplicationController

  def create
    purchase = Purchase.create(purchase_params)
    ticket = Ticket.find(params[:ticket_id])
    ticket.update(status: false)
    ticket.update(seller_id: params[:seller_id])
    render json: purchase
  end

  def index
    purchases = Purchase.all
    render json: purchases, include: [:user, :ticket]
  end

  def destroy
    purchase = Purchase.find_by(ticket_id: params[:id])
    purchase.delete
  end

  private

  def purchase_params
    params.require(:purchase).permit(:user_id, :ticket_id, :price, :seller_id)
  end
end
