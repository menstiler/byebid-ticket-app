class UsersController < ApplicationController

  def index
    users = User.all
    render json: users
  end

  def create
    user = User.create(user_params)
    render json: user
  end

  def show
    user = User.find_by(username: params[:username])
    if user
      render json: user, status: :ok
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
    params.require(:user).permit(:name, :email, :cc, :cash)
  end
end
