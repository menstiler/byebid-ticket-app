# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts 'creating users'
User.create(name: 'Mendel', username: 'mendel', cash: nil, email: 'menstiler@gmail.com', cc: 12345)
User.create(name: 'David', username: 'rami', cash: nil, email: 'ramigreenspan@gmail.com', cc: 67890)
puts 'end'

puts 'creating tickets'
Ticket.create(title: 'Shweaky Concert', category: 'Concerts', location: 'Madison square gardin', min_price: 10, buy_now: 50, seller_id: nil, time: 'Tuesday, 6 pm', status: true)
Ticket.create(title: 'Spiderman', category: 'Movies', location: 'AMC', min_price: 10, buy_now: 50, seller_id: nil, time: 'Mondsy, 10 pm', status: true)
Ticket.create(title: 'Yankees - Baseball', category: 'Sports', location: 'Yankee Stadium', min_price: 15, buy_now: 70, seller_id: nil, time: 'Sunday, 6 pm', status: true)
puts 'end'

puts 'creating purchases'
Purchase.create(user: User.first, ticket: Ticket.first, seller_id: Ticket.first.seller_id, price: 50 )
Purchase.create(user: User.last, ticket: Ticket.last, seller_id: Ticket.last.seller_id, price: 70 )
Purchase.create(user: User.last, ticket: Ticket.find(2), seller_id: Ticket.find(2).seller_id, price: 100 )
puts 'end'
