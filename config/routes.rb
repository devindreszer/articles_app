Rails.application.routes.draw do
  root "home#index"
  resources :articles, except: [:new, :create]
end
