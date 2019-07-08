class PurchasesController < ApplicationController

  def create
    purchase = Purchase.create(purchase_params)
    ticket = Ticket.find(params[:ticket_id])
    ticket.update(status: false)
    render json: purchase
  end

  def index
    purchases = Purchase.all
<<<<<<< HEAD
    render json: purchases, include: [:user,:ticket]
=======
    render json: purchases, include: [:user, :ticket]
>>>>>>> 41fd234dbdce1b1327a5c1cb50bdbc3b7c3b72e4
  end

  private

  def purchase_params
    params.require(:purchase).permit(:user_id, :ticket_id, :price, :seller_id)
  end
end
