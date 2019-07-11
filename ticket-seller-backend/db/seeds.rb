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
Ticket.create(title: 'Shweaky Concert', image_url: "https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", category: 'Concerts', location: 'Madison square gardin', min_price: 10, buy_now: 50, seller_id: nil, date: "2019-07-10",  time: '23:10', status: true)
Ticket.create(title: 'Spiderman', image_url: "http://cdn.amreading.com/wp-content/uploads/636054008085485119871913223_Movies.jpg", category: 'Movies', location: 'AMC', min_price: 10, buy_now: 50, seller_id: nil, time: '23:10', date: "2019-07-10", status: true)
Ticket.create(title: 'Yankees - Baseball', image_url: "https://s.abcnews.com/images/International/yankees-red-sox-london-ap-jt-190629_hpMain_16x9_608.jpg", category: 'Sports', location: 'Yankee Stadium', min_price: 15, buy_now: 70, seller_id: nil, time: '23:10',date: "2019-07-10", status: true)
puts 'end'

# puts 'creating purchases'
# Purchase.create(user: User.first, ticket: Ticket.first, seller_id: Ticket.first.seller_id, price: 50 )
# Purchase.create(user: User.last, ticket: Ticket.last, seller_id: Ticket.last.seller_id, price: 70 )
# Purchase.create(user: User.last, ticket: Ticket.find(2), seller_id: Ticket.find(2).seller_id, price: 100 )
# puts 'end'
#
# puts 'creating bids'
# Bid.create(user: User.first, ticket: Ticket.first, price: 10)
# Bid.create(user: User.last, ticket: Ticket.last, price: 25)
# Bid.create(user: User.last, ticket: Ticket.find(2), price: 15)
# puts 'end'
