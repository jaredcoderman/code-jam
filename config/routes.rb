Rails.application.routes.draw do

  root "homes#index"

  devise_for :users, controllers: {omniauth_callbacks: "users/omniauth_callbacks"}
  devise_scope :user do
    get 'login', to: "devise/sessions#new"
  end
  devise_scope :user do
    get 'signup', to: "devise/registrations#new"
  end
  devise_scope :user do
    post '/users/auth/github', to: "users/omniauth_callbacks#github"
    get '/users/auth/github/callback', to: "users/omniauth_callbacks#github"
  end
  devise_scope :user do
    get '/logout', to: "devise/sessions#destroy"
  end

  
  namespace :api do
    namespace :v1 do
      get '/users/projects', to: "projects#index"
      get '/users/current', to: "users#current"
      get '/projects/:id', to: "projects#show"
      delete '/projects/:id', to: "projects#destroy"
      patch '/projects', to: "projects#update"
      resources :projects, only: [:create, :destroy]
    end 
  end
  
  get "*path", to: "homes#index"




  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

end
