const loginDiv = document.querySelector("#login")
const mainCategoryContainer = document.querySelector("#main-column")
let ticketContainer = document.querySelector('#tickets-list')
const ticketsUrl = "http://localhost:3000/tickets"
const usersUrl = "http://localhost:3000/users"
const ticketInfo = document.querySelector('#ticket-info')
let ticketArray = []
let currentUser
const navBarContainer = document.querySelector("#nav-mobile")
let currentTicket
const ticketForm = document.querySelector("#add-ticket")

document.addEventListener('DOMContentLoaded', function() {
  loginDiv.innerHTML = `
      <button type="submit" class='btn-step1 waves-effect waves-light btn'>Login</button>
      <button type="submit" class='btn-step1 waves-effect waves-light btn'>Sign up</button>
  `
})//End of domcontent loading

loginDiv.addEventListener('click', function(e) {
  const firstButtons = document.querySelectorAll('.btn-step1')
  if (e.target.classList) {
    firstButtons.forEach(button => button.style.display = "none")
  }
  if (e.target.innerText === 'Login') {
    loginDiv.innerHTML = `
    <div class='row'>
    <div class="input-field col s6">
      <input type='text' id="username" value="" name="" placeholder="Username">
      <button type="submit" id='login-confirm' class='waves-effect waves-light btn'>Login</button>
    </div>
    </div>
    `
    const loginBtn = loginDiv.querySelector('#login-confirm')
    loginPost(loginBtn)
  } else if (e.target.innerText === 'Sign up') {
    loginDiv.innerHTML = `
    <form>
    <div class='row'>
    <div class="input-field col s6">
      <input type='text' value="" name="" placeholder="Name">
      <input type='text' value="" name="" placeholder="Email">
      <input type='text' value="" name="" placeholder="Username">
      <input type='text' value="" name="" placeholder="Credit Card">
      <button type="submit" id='signup' class='waves-effect waves-light btn'>Sign up</button>
      </div>
      </div>
    </form>
    `
    const signUpBtn = loginDiv.querySelector('#signup')
    signUpPost(signUpBtn)
  }
})//end of login/signup eventlistener

function loginPost(loginBtn) {
  loginBtn.addEventListener('click', function(e) {
    e.preventDefault()
    let username = e.target.previousElementSibling.value
    fetch(`${usersUrl}/${username}`)
    .then(response => response.json())
    .then(user => {
      currentUser = user
      loggedIn()
      navBarContainer.innerHTML = `
      <li>${currentUser.name}</li>
      `
    })
  })
}//end of login function

function loggedIn() {
  loginDiv.style.display = "none"
  fetchAllTicket()
}//login verifictaion

function signUpPost(signupBtn) {
  signupBtn.addEventListener('click', function(e) {
    e.preventDefault()
    let formInput = {
      name: e.target.parentElement[0].value,
      email: e.target.parentElement[1].value,
      username: e.target.parentElement[2].value,
      creditCard: e.target.parentElement[3].value
    }
    fetch(usersUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formInput)
    })
    .then(response => response.json())
    .then(user => {
      currentUser = user
      loggedIn()
      navBarContainer.innerHTML = `
      <li>${currentUser.name}</li>
      `
    })
  })
}//end of signup form with listener

function fetchAllTicket(){
  fetch(ticketsUrl)
  .then(r=> r.json())
  .then(json => {
    json.forEach(ticket => ticketArray.push(ticket))
  })
}//fetch of all the tickets

function renderTicket(element) {
  ticketContainer.innerHTML += `
  <li data-id=${element.id}>${element.title}</li>
  `
}//render all tickets

function filterArray(category) {
  ticketContainer.innerHTML=""
  let filteredArray = ticketArray.filter(ticket => ticket.status === true)
  let categoryTickets = filteredArray.filter(ticket => ticket.category === category)
    categoryTickets.forEach(ticket => {
      renderTicket(ticket)
  })
}// filtered tickets

mainCategoryContainer.addEventListener("click", event => {
  switch(event.target.innerText) {
  case "Movies":
    filterArray("Movies")
    break;

  case "Concerts":
    filterArray("Concerts")
    break;
  case "My Tickets":
    fetch(`http://localhost:3000/users/${currentUser.username}`)
    .then(r => r.json())
    .then(user => user.tickets)
    .then(tickets => {
      ticketContainer.innerHTML=`
      My Tickets
      <hr>`
      tickets.forEach(ticket => {
        renderTicket(ticket)})
    })
    break;

  case "Sports":
    filterArray("Sports")
    break;

  case "All Tickets":
    let filteredArray = ticketArray.filter(ticket => ticket.status === true)
    ticketContainer.innerHTML=""
      filteredArray.forEach(ticket => {
        renderTicket(ticket)
       })
    break;

      case "Add Ticket":
        ticketInfo.innerHTML=`
        <form>
          <input type='text' value="" name="" placeholder="Title">
          <input type='text' value="" name="" placeholder="Category">
          <input type='text' value="" name="" placeholder="Location">
          <input type='text' value="" name="" placeholder="Time">
          <input type='text' value="" name="" placeholder="Min Price">
          <input type='text' value="" name="" placeholder="Buy Now">
          <button type="submit" id='add-ticket'>Add Ticket</button>
        </form>
        `
        break;
  default:
}
})//Event listener fo main container

ticketContainer.addEventListener('click', function(e) {
  if (e.target.dataset.id) {
    const ticketId = e.target.dataset.id
    fetch(`${ticketsUrl}/${ticketId}`)
    .then(response => response.json())
    .then(json => {
      currentTicket = json
      showTicket(json)
    })
  }
})//event listener for tickets container/ FETCHING ticket data

function showTicket(ticket) {
  ticketInfo.innerHTML = `
    <p>${ticket.title}</p>
    <p>${ticket.category}</p>
    <p>${ticket.location}</p>
    <p>${ticket.time}</p>
    <p>${ticket.min_price}</p>
  `
  if (ticket.status) {
    ticketInfo.innerHTML +=  `
    <button id='btn-buy' data-id=${ticket.id}>Buy Now for $${ticket.buy_now}</button>
    <button id='btn-bid' data-id=${ticket.id}>Bid</button>
    `
  }
}// render the ticket info

ticketInfo.addEventListener('click', function(e) {
  if (e.target.id === "btn-buy") {
    buyNow(e)
  }
})// listener buttons for buying tickets

function removeTicket(ticket, ticketObj) {
  const ticketLi = ticketContainer.querySelector(`[data-id="${ticket}"]`)
  ticketLi.remove()
  let index = ticketArray.indexOf(ticketObj)
  debugger
  ticketArray.splice(index, 1)
}

function buyNow(e){
const ticketId = e.target.dataset.id
let ticketObj = ticketArray.find(function(ticket){ return ticket.id === parseInt(ticketId)})
console.log(currentUser);
console.log(currentTicket);
fetch("http://localhost:3000/purchases", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    user_id: currentUser.id,
    ticket_id: currentTicket.id,
    price: ticketObj.buy_now,
    seller_id: ticketObj.seller_id,
  })
})
.then(resp => resp.json())
.then(json => {
  ticketInfo.innerHTML = `Purchased!`
  removeTicket(ticketId, ticketObj)
})}

ticketInfo.addEventListener('submit', e=>{
  e.preventDefault()
  console.log (e.target[0])
  let formInput = {
    title: e.target[0].value,
    category: e.target[1].value,
    location: e.target[2].value,
    time: e.target[3].value,
    min_price: e.target[4].value,
    buy_now: e.target[5].value

  }
  fetch(ticketsUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formInput)
  })
  .then(response => response.json())
  .then(json => ticketArray.push(json))
})
