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

document.addEventListener('DOMContentLoaded', function() {
  loginDiv.innerHTML = `
      <button type="submit" class='btn-step1'>Login</button>
      <button type="submit" class='btn-step1'>Sign up</button>
  `

})
loginDiv.addEventListener('click', function(e) {
  const firstButtons = document.querySelectorAll('.btn-step1')
  if (e.target.className === 'btn-step1') {
    firstButtons.forEach(button => button.style.display = "none")
  }
  if (e.target.innerText === 'Login') {
    loginDiv.innerHTML = `
      <input type='text' value="" name="" placeholder="Username">
      <button type="submit" id='login-confirm'>Login</button>
    `
    const loginBtn = loginDiv.querySelector('#login-confirm')
    loginPost(loginBtn)
  } else if (e.target.innerText === 'Sign up') {
    loginDiv.innerHTML = `
    <form>
      <input type='text' value="" name="" placeholder="Name">
      <input type='text' value="" name="" placeholder="Email">
      <input type='text' value="" name="" placeholder="Username">
      <input type='text' value="" name="" placeholder="Credit Card">
      <button type="submit" id='signup'>Sign up</button>
    </form>
    `
    const signUpBtn = loginDiv.querySelector('#signup')
    signUpPost(signUpBtn)
  }
})

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
}

function loggedIn() {
  loginDiv.style.display = "none"
  fetchAllTicket()
}

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
}

function filterArray(category) {
  ticketContainer.innerHTML=""
  let filteredArray = ticketArray.filter(ticket => ticket.status === true)
  let categoryTickets = filteredArray.filter(ticket => ticket.category === category)
    categoryTickets.forEach(ticket => {
      renderTicket(ticket)
  })
}

mainCategoryContainer.addEventListener("click", event => {
  switch(event.target.innerText) {
  case "Movies":
    filterArray("Movies")
    break;

  case "Concerts":
    filterArray("Concerts")
<<<<<<< HEAD
      break;
      case "My Tickets":
        fetch(`http://localhost:3000/users/${currentUser.username}`)
        .then(r => r.json())
        .then(user => console.log(user.tickets))
      break;

      case "Sports":
      filterArray("Sports")
        break;

        // case "My Tickets":
        //
        //   fetch("http://localhost:3000/users/")
        //       renderTicket(ticket)
        //     })
        //   break;
        case "All Tickets":
        let filteredArray = ticketArray.filter(ticket => ticket.status === true)
        ticketContainer.innerHTML=""
          filteredArray.forEach(ticket =>{
            renderTicket(ticket)
          })
          break;

  default:
}

})


function fetchAllTicket(){
  fetch(ticketsUrl)
  .then(r=> r.json())
  .then(json => {
    json.forEach(ticket => ticketArray.push(ticket))
  })
}

function renderTicket(element) {
  ticketContainer.innerHTML += `
    <li data-id=${element.id}>${element.title}</li>
  `
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
})

function showTicket(ticket) {
  ticketInfo.innerHTML = `
    <p>${ticket.title}</p>
    <p>${ticket.category}</p>
    <p>${ticket.location}</p>
    <p>${ticket.time}</p>
    <p>${ticket.min_price}</p>
    <button id='btn-buy' data-id=${ticket.id}>Buy Now for $${ticket.buy_now}</button>
    <button id='btn-bid' data-id=${ticket.id}>Bid</button>
  `
}

ticketInfo.addEventListener('click', function(e) {
  if (e.target.id === "btn-buy") {
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
    })
  }
})

function purchaseTicket() {

}
