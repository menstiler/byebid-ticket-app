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
const ticketFloat = document.querySelector("#ticketInfoFloat")

document.addEventListener('DOMContentLoaded', function() {
  loginDiv.innerHTML = `
      <button type="submit" class='btn-step1 waves-effect waves-light btn login'>Login</button>
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
  fetch('http://localhost:3000/tickets/all')
  .then(r => r.json())
  .then(json => {
    json.forEach(ticket => {
      ticketArray.push(ticket)
    })
  })
}//fetch of all the tickets

function renderTicket(element) {
  ticketContainer.classList = "collection"
  ticketContainer.innerHTML += `
  <a data-id=${element.id} class="collection-item">${element.title}</a>
  `
}//render all tickets

function filterArray(category) {
  ticketContainer.innerHTML = ""
  let filteredArray = ticketArray.filter(ticket => ticket.status === true)
  let categoryTickets = filteredArray.filter(ticket => ticket.category === category)
    categoryTickets.forEach(ticket => {
      renderTicket(ticket)
  })
  if (categoryTickets.length === 0) {
    ticketContainer.classList = "collection"
    ticketContainer.innerHTML += `<h6>No ${category}</h6>`
  }
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
    }
  })
}//Event listener fo main container

function addTicket() {
  ticketInfo.innerHTML=`
  <form id="add-ticket-form">
    <input type='text' value="" name="" placeholder="Title">
    Category
    <select style="display: block" name="Category">
      <option value="Movies">Movies</option>
      <option value="Concerts">Concerts</option>
      <option value="Sports">Sports</option>
    </select>
    <input type='text' value="" name="" placeholder="Location">
    Date:
    <input type="date" name="bday">
    Time
    <input id="appt-time" type="time">
    <input type='number' value="" name="" placeholder="Min Price">
    <input type='number' value="" name="" placeholder="Buy Now">
    <button type="submit" id='add-ticket' class='waves-effect waves-light btn'>Add Ticket</button>
  </form>
  `
}

function sellTicketForm(e) {
  const ticketId = e.target.dataset.id
  let ticketObj = ticketArray.find(function(ticket){ return ticket.id === parseInt(ticketId)})
  ticketInfo.innerHTML= `
  <form id='sell-ticket-form' data-ticket-id="${ticketId}">
    <p>${ticketObj.title}</p>
    <p>${ticketObj.category}</p>
    <p>${ticketObj.location}</p>
    <p>Date ${ticketObj.date}</p>
    <p>Time ${ticketObj.time}</p>
    <input id="min-price" type='number' value="${ticketObj.min_price}" name="" placeholder="Min Price">
    <input id="buy-now" type='number' value="${ticketObj.buy_now}" name="" placeholder="Buy Now">
    <button type="submit" id='sell-ticket' class='waves-effect waves-light btn'>Sell Ticket</button>
  </form>
  `

}

function renderTicket(ticket) {
      let twenty4HrTime = `${ticket.time}`.split(":")
      let parsedTime = parseInt(twenty4HrTime[0])
      let time = ""
      if (parsedTime < 12){
        time = `${twenty4HrTime[0]}:${twenty4HrTime[1]} AM`
      }
      else if (parsedTime > 12){
        time = `${twenty4HrTime[0]-12}:${twenty4HrTime[1]} PM`
      }
  ticketContainer.classList = "collection"
  ticketContainer.innerHTML += `
   <div class="card horizontal" >
      <div class="card-image">
        <img src="https://lorempixel.com/100/190/nature/6" style="height:150px;">
      </div>
      <div class="card-stacked">
        <div class="card-content" data-id= ${ticket.id}>
        <h6 class="header" data-id= ${ticket.id}>${ticket.title}</h6>
          <p data-id= ${ticket.id}>Date ${ticket.date}</p>
          <p data-id= ${ticket.id}>Location ${ticket.location}</p>
          <p data-id= ${ticket.id}>Time ${time}</p>
        </div>
      </div>
    </div>
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
      renderTicket(ticket)
    })
  })
}

ticketContainer.addEventListener('click', function(e) {
  if (e.target.dataset.id) {
    ticketFloat.style.display = "none"
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

//   ticketInfo.classList = "card col s12 m7"
  ticketBidPrice = ticket.min_price
  let twenty4HrTime = `${ticket.time}`.split(":")
  let parsedTime = parseInt(twenty4HrTime[0])
  let time = ""
  if (parsedTime < 12){
    time = `${twenty4HrTime[0]}:${twenty4HrTime[1]} AM`
  }
  else if (parsedTime > 12){
    time = `${twenty4HrTime[0]-12}:${twenty4HrTime[1]} PM`
  }
  ticketInfo.classList = "card row s6"

  ticketInfo.innerHTML = `
    <p>${ticket.title}</p>
    <p>${ticket.category}</p>
    <p>${ticket.location}</p>
    <p>Date ${ticket.date}</p>
    <p>Time ${time}</p>
    <p id="min_price-field">${ticketBidPrice}</p>
  `
  let ticketBids = ticket.bids
  if (ticket.bids.length > 0) {
    bidsContainer.innerHTML = `<h6>Bids</h6>`
  } else {
    bidsContainer.innerHTML = ""
  }
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
  } else if (e.target.id === "btn-sell") {
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
  debugger
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
  ticketInfo.querySelector('#min_price-field').innerHTML = input
  ticketArray[bidTicket].min_price = input
  patchMinPrice(json, input)
}

function patchMinPrice(json, input) {
  fetch(`${ticketsUrl}/${json.ticket.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      min_price: input
    })
  })
}

function addBidToTicket(bid) {
  bidForm.innerHTML = ""
  debugger
  if (bidsContainer.innerHTML === "") {
    bidsContainer.innerHTML = `<h6>Bids</h6>`
  }
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
    ticketArray[index].status = false
  } else {
    ticketLi.remove()
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
    if (ticketObj.bids.length > 0) {
      removeBids(ticketId)
      bidsContainer.innerHTML = ""
    }
    changeTicketStatus(ticketId, ticketObj)
  })
  fetch(`http://localhost:3000/tickets/${ticketId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      status: false,
    })
  })
}

function removeBids(ticketId) {
  fetch(`http://localhost:3000/bids/${ticketId}`, {
    method: "DELETE",
  })
}

ticketInfo.addEventListener('submit', (e) => {
  e.preventDefault()
  debugger
  console.log(e.target);
  if (e.target.id === "add-ticket-form") {
    let date = `${e.target[3].value}`
    let timeInfo = `${e.target[4].value}`
    console.log("IVE BEEN CLICKED", e.target);
    postNewTicket(e,date,timeInfo)
  } else if (e.target.id === "sell-ticket-form") {
    console.log("Sell", e.target);
    sellTicket(e)
  }
})

function sellTicket(e) {
  const ticketId = e.target.dataset.ticketId
  let ticketObj = ticketArray.find(function(ticket){ return ticket.id === parseInt(ticketId)})
  let formInput = {
    min_price: e.target[0].value,
    buy_now: e.target[1].value,
    status: true,
    seller_id: currentUser.id,
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

function postNewTicket(e,date,timeInfo) {
  debugger
  let formInput = {
    title: e.target[0].value,
    category: e.target[1].value,
    location: e.target[2].value,
    time: timeInfo,
    min_price: e.target[5].value,
    buy_now: e.target[7].value,
    date: date,
    status: true
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
  .then(json => {
    ticketInfo.innerHTML = `Ticket is now available for purchase!`
    ticketArray.push(json)
    body.innerHTML = `<image src=${json.image} />`
  })
}

// ticketContainer.addEventListener("mouseover",e=> {
//   if(e.target.innerText){
//     ticket = ticketArray.find(ticket => ticket.title === e.target.innerText)
//     let twenty4HrTime = `${ticket.time}`.split(":")
//     let parsedTime = parseInt(twenty4HrTime[0])
//     let time = ""
//     if (parsedTime < 12){
//       time = `${twenty4HrTime[0]}:${twenty4HrTime[1]} AM`
//     }
//     else if (parsedTime > 12){
//       time = `${twenty4HrTime[0]-12}:${twenty4HrTime[1]} PM`
//     }
//     ticketFloat.style.display = ""
//     ticketInfo.style.display = "none"
//     bidsContainer.style.display = "none"
//     ticketFloat.innerHTML = `
    // <div class="card horizontal">
    //   <div class="card-image">
    //     <img src="https://lorempixel.com/100/190/nature/6">
    //   </div>
    //   <div class="card-stacked">
    //     <div class="card-content">
    //     <h4 class="header">${ticket.title}</h4>
    //       <p>Date ${ticket.date}</p>
    //       <p>Location ${ticket.location}</p>
    //       <p>Time ${time}</p>
    //     </div>
    //   </div>
    // </div>
//   `
//   }
// })
//
// ticketContainer.addEventListener("mouseout",e=> {
//   if(e.target.innerText){
//     ticketFloat.innerHTML = ``
//     ticketInfo.style.display = ""
//     bidsContainer.style.display = ""
//   }
// })
