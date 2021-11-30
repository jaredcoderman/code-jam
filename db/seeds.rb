# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Project.all.delete_all
User.all.delete_all
Comment.all.delete_all
Tag.all.delete_all

t1 = Tag.create(name: "React.js")
t2 = Tag.create(name: "Ruby on Rails")
t3 = Tag.create(name: "PostgreSQL")
t4 = Tag.create(name: "Gatsby")
t5 = Tag.create(name: "Express.js")
t6 = Tag.create(name: "Node.js")
t7 = Tag.create(name: "Django")
t8 = Tag.create(name: "SQLite")
t9 = Tag.create(name: "MongoDB")
t10 = Tag.create(name: "HTML")
t11 = Tag.create(name: "CSS")
t12 = Tag.create(name: "SCSS")
t13 = Tag.create(name: "Angular")
t14 = Tag.create(name: "Flutter")
t15 = Tag.create(name: "Blazor")
t16 = Tag.create(name: "Svelte")
t17 = Tag.create(name: "PHP")
t18 = Tag.create(name: "Java")
t19 = Tag.create(name: "JavaScript")
t20 = Tag.create(name: "TypeScript")
t21 = Tag.create(name: "Python")

u1 = User.create(name: "Jared Head",  email: "jared@gmail.com", password: "jared123")
u1.tags << t1
u1.tags << t2
u1.tags << t3

p1 = Project.create(name: "Python Webscraper", description: "Aggregates all event data within 10 miles of your location.", owner: u1)
p1.tags << t1

p2 = Project.create(name: "To-Do List", description: "A helpful tool to keep track of the tasks you need to complete.", owner: u1)
p2.tags << t2

p3 = Project.create(name: "Quiz Game", description: "A 4 player quiz game for friends to test how well they know each other.", owner: u1)
p3.tags << t3

c1 = Comment.create(project: p1, user: u1, description: "Hey guys can't wait to get working with y'all!")

c1 = Comment.create(project: p1, user: u1, description: "It's a little lonely here, is anyone out there?!")

c1 = Comment.create(project: p1, user: u1, description: "I'm just commenting for no reason at this point...")

up1 = UserProject.create(user: u1, project: p1)
up2 = UserProject.create(user: u1, project: p2)
up3 = UserProject.create(user: u1, project: p3)

u2 = User.create(name: "John Smith", email: "john@gmail.com", password: "john123")

u2.tags << t1
u2.tags << t2

p4 = Project.create(name: "Album Tracker", description: "A tool that allows users to track the albums they've listened to and their rating.", owner: u2)
p5 = Project.create(name: "Drawing App", description: "Let's you draw with helpful features that make the process easier.", owner: u2)
p6 = Project.create(name: "Grocery Picker", description: "An app that uses AI to find the healthiest food that you will enjoy for the lowest price.", owner: u2)

up4 = UserProject.create(user: u2, project: p4)
up5 = UserProject.create(user: u2, project: p5)
up6 = UserProject.create(user: u2, project: p6)
