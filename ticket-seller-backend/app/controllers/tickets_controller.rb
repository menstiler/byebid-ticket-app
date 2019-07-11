class TicketsController < ApplicationController

  def index
    Ticket.all.each do |ticket|
      if ticket.status
        ticket = Ticket.new(ticket_params)
        ticket.time = "#{ticket.time}:00"
        original_time = Time.now().to_s
        original_time_split = original_time.split(" ")
        time_split = original_time_split[1]
        date_split = original_time_split[0]
        if ticket.date == date_split
          if ticket.time < time_split
            ticket.update(status: false)
          end
        else ticket.date < date_split
          ticket.update(status: false)
        end
      end
    end

    tickets = Ticket.all.select do |ticket|
      ticket.status
    end
    render json: tickets
  end

  def all_tickets
    Ticket.all.each do |ticket|
      if ticket.status
        ticket.time = "#{ticket.time}:00"
        original_time = Time.now().to_s
        original_time_split = original_time.split(" ")
        time_split = original_time_split[1]
        date_split = original_time_split[0]
        if (ticket.date == date_split && ticket.time <= time_split) || ticket.date < date_split
          ticket.update(status: false)
        end
      end
    end
    tickets = Ticket.all
    render json: tickets
  end

  def show
    ticket = Ticket.find(params[:id])
    render json: ticket
  end

  def create
    ticket = Ticket.new(ticket_params)
    if ticket.valid?
      ticket.time = "#{ticket.time}:00"
      original_time = Time.now().to_s
      original_time_split = original_time.split(" ")
      time_split = original_time_split[1]
      date_split = original_time_split[0]
      if ticket.date == date_split
        if ticket.time > time_split
          ticket.save
          ticket.update(status: true)
          render json: {ticket: ticket, status: 200, message: "Ticket is now available for purchase!" }
        else
          render json: {message: "Time for this event has already passed!", status: 403}
        end
      elsif ticket.date > date_split
        ticket.save
        ticket.update(status: true)
        render json: {ticket: ticket, status: 200, message: "Ticket is now available for purchase!" }
      else
        render json: {message: "The date for this event has already passed!", status: 403}
      end
    else
      render json: {message: ticket.errors.full_messages[0]}
    end
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
    params.require(:ticket).permit(:title, :image_url, :location, :time, :category, :min_price, :buy_now, :status, :seller_id, :date)
  end
end
