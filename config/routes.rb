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
      delete '/projects/:id', to: "projects#destroy"
      patch '/projects', to: "projects#update"
      patch '/projects/join', to: "projects#join"
      patch '/projects/accept', to: "projects#accept_user"
      patch '/projects/remove_user', to: "projects#remove_user"
      post "/projects/:id/comments", to: "comments#create"
      resources :comments, only: [:create, :index]
      resources :projects, only: [:create, :destroy, :show]
      resources :tags, only: [:index, :update]
    end 
  end

  get '/projects/:id', to: "homes#index"
  get '/host', to: "homes#index"
  get '/my_projects', to: "homes#index"
  get '/search', to: "projects#search"
  
  resources :projects, only: [:index, :search]  



  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

end
