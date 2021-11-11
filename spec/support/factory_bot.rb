require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:name) {|n| "user#{n}" }
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end

  factory :project do
    sequence(:name) {|n| "project#{n}"}
    description { "We're going to need a lot of help"}
  end
end
