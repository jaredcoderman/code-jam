# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Project.all.delete_all
User.all.delete_all

u1 = User.create(name: "Jared Head",  email: "jared@gmail.com", password: "jared123")

p1 = Project.create(name: "Python Webscraper", description: "Aggregates all event data within 10 miles of your location.", owner: u1)
p2 = Project.create(name: "To-Do List", description: "A helpful tool to keep track of the tasks you need to complete.", owner: u1)
p3 = Project.create(name: "Quiz Game", description: "A 4 player quiz game for friends to test how well they know each other.", owner: u1)

up1 = UserProject.create(user: u1, project: p1)
up2 = UserProject.create(user: u1, project: p2)
up3 = UserProject.create(user: u1, project: p3)

u2 = User.create(name: "John Smith", email: "john@gmail.com", password: "john123")

p4 = Project.create(name: "Album Tracker", description: "A tool that allows users to track the albums they've listened to and their rating.", owner: u2)
p5 = Project.create(name: "Drawing App", description: "Let's you draw with helpful features that make the process easier.", owner: u2)
p6 = Project.create(name: "Grocery Picker", description: "An app that uses AI to find the healthiest food that you will enjoy for the lowest price.", owner: u2)

up4 = UserProject.create(user: u2, project: p4)
up5 = UserProject.create(user: u2, project: p5)
up6 = UserProject.create(user: u2, project: p6)