class UsersController < ApplicationController

  def index
    users = User.all
    render json: users
  end

  def create
    user = User.new(user_params)
    if user.valid?
      user.save
      render json: {user: user, code: 200}
    else
      render json: {code: 422, message: user.errors.full_messages[0]}
    end
  end

  def show
    user = User.find_by(username: params[:username])
    if user
      render json: user, status: :ok, code: 200
    else
      render json: {status: "error", code: 422, message: "user not found" }
    end
  end

  def find_by_id
    user = User.find(params[:id])
    if user
      render json: user, status: :ok
    else
      render json: {status: "error", code: 422, message: "user not found" }
    end
  end

  def destroy
    user = User.find(params[:id])
    user.delete
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    render json: user
  end

  private

  def user_params
    params.require(:user).permit(:name, :username, :email, :cc, :cash)
  end
end
