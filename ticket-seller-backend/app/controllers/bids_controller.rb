class BidsController < ApplicationController

  def index
    bids = Bid.all
    render json: bids 
  end

  def show
    bid = Bid.find(params[:id])
    render json: bid
  end

  def create
    bid = Bid.create(bid_params)
    render json: bid
  end

  def destory
    bid = Bid.find(params[:id])
    bid.delete
  end

  private

  def bid_params
    params.require(:bid).permit(:user_id, :ticket_id, :price)
  end

end
