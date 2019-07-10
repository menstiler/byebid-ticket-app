Rails.application.routes.draw do

  get '/users/:username' => "users#show"
  get '/tickets/all' => "tickets#all_tickets"
  delete '/purchases/:ticket_id' => "purchases#destroy"
  delete '/bids/:ticket_id' => "bids#destroy"

  resources :bids
  resources :purchases
  resources :tickets
  resources :users

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
