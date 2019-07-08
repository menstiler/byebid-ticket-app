class TicketsController < ApplicationController
  def index
    ticket = Ticket.all
    render json: ticket
  end

  def show
    ticket = Ticket.find(params[:id])
    render json: ticket
  end

  def create
    ticket = Ticket.create(ticket_params)
    render json: ticket
  end

  def destroy
    ticket = Ticket.find(params[:id])
    ticket.delete
  end

  def update
    ticket = Ticket.find(params[:id])
    ticket.update(ticket_params)
    render json: ticket
  end

  private

  def ticket_params
    params.require(:ticket).permit(:title, :location, :time, :category, :min_price, :buy_now, :status, :seller_id)
  end
end
