class UsersController < ApplicationController

  def index
    users = User.all
    render json: users, include: [:purchases]
  end

  def create
    user = User.create(user_params)
    render json: user
  end

  def show
    user = User.find_by(username: params[:username])
    render json: user, include: [:purchases]
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
