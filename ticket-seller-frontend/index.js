const loginDiv = document.querySelector("#login")
const mainCategoryContainer = document.querySelector("#main-column")
let ticketContainer = document.querySelector('#tickets-list')
const bidForm = document.querySelector('#ticket-form')
const bidsContainer = document.querySelector('#ticket-bids')
const ticketsUrl = "http://localhost:3000/tickets"
const usersUrl = "http://localhost:3000/users"
const ticketInfo = document.querySelector('#ticket-info')
const ticketInfoContainer = document.querySelector('#ticket-container')
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
    <div class="input-field col">
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
      <a href="">${currentUser.name}</a>
      `
    })
  })
}//end of login function

// .catch(function(error) {
//   debugger
//   alert("Bad things! Ragnarők!");
//   console.log(error.message);
// })
function loggedIn() {
  loginDiv.style.display = "none"
  fetchAllTicket()
  addEventListeners()
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
      <a href="">${currentUser.name}</a>
      `
    })

  })
}//end of signup form with listener

function fetchAllTicket(){
  fetch(ticketsUrl)
  .then(r => r.json())
  .then(json => {
    json.forEach(ticket => ticketArray.push(ticket))
  })
}//fetch of all the tickets

function renderTicket(element) {
  ticketContainer.classList = "collection"
  ticketContainer.innerHTML += `
  <a data-id=${element.id} class="collection-item">${element.title}</a>
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

function addEventListeners() {
  mainCategoryContainer.addEventListener("click", event => {
    switch(event.target.innerText) {
    case "Movies":
      filterArray("Movies")
      break;

    case "Concerts":
      filterArray("Concerts")
      break;
    case "My Tickets":
      fetchUserTickets()
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
      addTicket()
      break;
    // default:
  }
  })
}//Event listener fo main container

function addTicket() {
  ticketInfo.innerHTML=`
  <form id='add-ticket-form'>
    <input type='text' value="" name="" placeholder="Title">
    <input type='text' value="" name="" placeholder="Category">
    <input type='text' value="" name="" placeholder="Location">
    <input type='text' value="" name="" placeholder="Time">
    <input type='text' value="" name="" placeholder="Min Price">
    <input type='text' value="" name="" placeholder="Buy Now">
    <button type="submit" id='add-ticket' class='waves-effect waves-light btn'>Add Ticket</button>
  </form>
  `
}

function sellTicketForm(e) {
  const ticketId = e.target.dataset.id
  let ticketObj = ticketArray.find(function(ticket){ return ticket.id === parseInt(ticketId)})
  debugger
  ticketInfo.innerHTML= `
  <form id='sell-ticket-form' data-ticket-id="${ticketId}">
    <input type='text' value="${ticketObj.title}" name="" placeholder="Title">
    <input type='text' value="${ticketObj.category}" name="" placeholder="Category">
    <input type='text' value="${ticketObj.location}" name="" placeholder="Location">
    <input type='text' value="${ticketObj.time}" name="" placeholder="Time">
    <input type='text' value="${ticketObj.min_price}" name="" placeholder="Min Price">
    <input type='text' value="${ticketObj.buy_now}" name="" placeholder="Buy Now">
    <button type="submit" id='sell-ticket' class='waves-effect waves-light btn'>Sell Ticket</button>
  </form>
  `
}

function renderTicket(element) {
  ticketContainer.classList = "collection"
  ticketContainer.innerHTML += `
  <a data-id=${element.id} class="collection-item">${element.title}</a>
  `
}//render all tickets

function fetchUserTickets() {
  fetch(`http://localhost:3000/users/${currentUser.username}`)
  .then(r => r.json())
  .then(user => user.tickets)
  .then(tickets => {
    ticketContainer.innerHTML = `
    <h6 class="centered">My Tickets</h6>
    <div class="divider"></div>`
    tickets.forEach(ticket => {
      if (!ticket.status) {
        renderTicket(ticket)
      }
    })
  })
}

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
  ticketInfo.classList = "card row s6"

  ticketInfo.innerHTML = `
    <p>${ticket.title}</p>
    <p>${ticket.category}</p>
    <p>${ticket.location}</p>
    <p>${ticket.time}</p>
    <p>${ticket.min_price}</p>
  `
  let ticketBids = ticket.bids
  bidsContainer.innerHTML = `<h6>Bids</h6>`
  ticketBids.forEach(ticketBid => {
    bidsContainer.innerHTML += `
      <div class="card">
        <div>${ticketBid.price}</div>
        <div>${ticketBid.user.name}</div>
      <div>
    `
  })
  ticketInfoContainer.appendChild(bidsContainer)
  if (ticket.status) {
    ticketInfo.innerHTML +=  `
    <button id='btn-buy' data-id=${ticket.id} class='waves-effect waves-light btn'>Buy Now for $${ticket.buy_now}</button>
    <button id='btn-bid' data-id=${ticket.id} class='waves-effect waves-light btn'>Bid</button>
    `
  } else {
    ticketInfo.innerHTML +=  `
    <button id='btn-sell' data-id=${ticket.id} class='waves-effect waves-light btn'>Sell</button>
    `
  }
}// render the ticket info

ticketInfo.addEventListener('click', function(e) {
  if (e.target.id === "btn-buy") {
    buyNow(e)
  } else if (e.target.id === "btn-bid") {
    bidInput(e)
  } else if (e.target.id == "btn-sell") {
    sellTicketForm(e)
  }
})// listener buttons for buying tickets

function bidInput(e) {
  const ticketId = e.target.dataset.id
  let ticketObj = ticketArray.find(function(ticket){ return ticket.id === parseInt(ticketId)})
  bidForm.innerHTML =  `
  <p id="input-alert"></p>
  <input type='number' value="${ticketObj.min_price}" name="" placeholder="Bid">
  <button id='btn-bid' data-id=${ticketId} class='waves-effect waves-light btn' >Place Bid</button>
  `
}

bidForm.addEventListener('click', e => {
  if (e.target.id === 'btn-bid') {
    let input = e.target.previousElementSibling.value
    placeBid(e, input)
  }
})

function placeBid(e, input) {
  const ticketId = e.target.dataset.id
  let ticketObj = ticketArray.find(function(ticket){ return ticket.id === parseInt(ticketId)})
  // make sure input value is higher than min price
  if (input < parseInt(ticketObj.min_price)) {
    const alertTag = bidForm.querySelector('#input-alert')
    alertTag.innerHTML = `Amount must be higher than $${ticketObj.min_price}`
  } else {
    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        ticket_id: currentTicket.id,
        price: input,
      })
    })
    .then(resp => resp.json())
    .then(json => {
      addBidToTicket(json)
      updateMinPrice(json, input)
    })
  }
}

function updateMinPrice(json, input) {
  let bidTicket = ticketArray.findIndex(function(ticket) {
    return ticket.title === `${json.ticket.title}`
  })
  ticketArray[bidTicket].min_price = input
}

function addBidToTicket(bid) {
  bidForm.innerHTML = ""
  bidsContainer.innerHTML += `
  <div class="card">
    <div>${bid.price}</div>
    <div>${bid.user.name}</div>
  </div>
  `
}

function changeTicketStatus(ticket, ticketObj) {
  const ticketLi = ticketContainer.querySelector(`[data-id="${ticket}"]`)
  let index = ticketArray.indexOf(ticketObj)
  debugger
  if (ticketArray[index].status) {
    ticketLi.remove()
    debugger
    ticketArray[index].status = false
  } else {
    debugger
    ticketArray[index].status = true
  }
}

function buyNow(e){
const ticketId = e.target.dataset.id
let ticketObj = ticketArray.find(function(ticket){ return ticket.id === parseInt(ticketId)})
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
    seller_id: currentUser.id,
  })
})
.then(resp => resp.json())
.then(json => {
  ticketInfo.innerHTML = `Purchased!`
  changeTicketStatus(ticketId, ticketObj)
})}

ticketInfo.addEventListener('submit', (e) => {
  e.preventDefault()
  if (e.target.id === "add-ticket-form") {
    postNewTicket(e)
  } else if (e.target.id === "sell-ticket-form") {
    console.log(e.target);
    sellTicket(e)
  }
})


function sellTicket(e) {
  const ticketId = e.target.dataset.ticketId
  let ticketObj = ticketArray.find(function(ticket){ return ticket.id === parseInt(ticketId)})
  debugger
  let formInput = {
    title: e.target[0].value,
    category: e.target[1].value,
    location: e.target[2].value,
    time: e.target[3].value,
    min_price: e.target[4].value,
    buy_now: e.target[5].value
  }
  fetch(`${ticketsUrl}/${ticketId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formInput)
  })
  .then(response => response.json())
  .then(json => {
    ticketInfo.innerHTML = `Ticket is now available for purchase!`
    deletePurchase(ticketId)
    changeTicketStatus(ticketId, ticketObj)
  })
}

function deletePurchase(ticketId) {
  fetch(`http://localhost:3000/purchases/${ticketId}`, {
    method: "DELETE",
  })
}

function postNewTicket(e) {
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
}
