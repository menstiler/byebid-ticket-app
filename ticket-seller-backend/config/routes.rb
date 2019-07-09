Rails.application.routes.draw do

  resources :bids
  get '/users/:username' => "users#show"
  delete '/purchases/:ticket_id' => "purchases#destroy"

  resources :purchases
  resources :tickets
  resources :users

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
