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
const ticketImages = {
  Concerts: [
    "https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://musicoomph.com/wp-content/uploads/2018/03/benefits-of-going-to-live-music-concerts.jpg",
    "https://eevents.s3.amazonaws.com/images/og/concert.jpg",
    "https://ewscripps.brightspotcdn.com/dims4/default/3ede789/2147483647/strip/true/crop/3280x1845+0+0/resize/1280x720!/quality/90/?url=https%3A%2F%2Fewscripps.brightspotcdn.com%2F54%2F92%2F9a7bcd854da88d29414b52fc6dd7%2Fgettyimages-1020376838.jpg",
    "https://www.grammy.com/sites/com/files/styles/image_landscape_hero/public/billyjoel-hero-461257304.jpg?itok=99M62l5Q",
    "https://www.maxim.com/.image/t_share/MTU5MDQ2NzEyNDc4OTM0ODA4/john-mayer-promo.jpg",
    "https://uproxx.files.wordpress.com/2019/02/drake.jpg?quality=100&w=650",
    "https://www.hypebot.com/.a/6a00d83451b36c69e201b7c7f299c5970b-800wi",
    "https://uproxx.files.wordpress.com/2019/02/jayz-grid-uproxx.jpg?quality=100&w=650",
    "https://media.gq.com/photos/5a7a0448c37bfa147f52dca7/16:9/w_1280,c_limit/02_2018_JustinTimberlake_Style_3x2.jpg",
    "https://www.grammy.com/sites/com/files/styles/image_landscape_hero/public/justinbieber-hero-498329920.jpg?itok=lw-2pKKn",
    "https://images.complex.com/complex/images/c_limit,dpr_auto,q_90,w_720/fl_lossy,pg_1/du6kdteeucmqm1yyozb3/taylor-swift-getty-don-arnold-tas18",
    "https://pbs.twimg.com/profile_images/1129254673209339905/hMI9TU58_400x400.png",
    "https://yt3.ggpht.com/a/AGF-l7-_W3gRRaxpNq27H5zajHSqO8aD3a_vxXrKow=s900-mo-c-c0xffffffff-rj-k-no"
  ],
  Movies: [
    "https://amc-theatres-res.cloudinary.com/amc-cdn/production/2/movies/45800/45838/PosterDynamic/67602.jpg",
    "http://cms.ipressroom.com.s3.amazonaws.com/337/files/20191/jag_cz_movie_theater_retro_shutterstock_594132752-1529438777-6045.jpg",
    "https://bloximages.newyork1.vip.townnews.com/kmov.com/content/tncms/assets/v3/editorial/c/27/c27ad91e-3b81-11e9-9e30-5fc881c4286b/5c78202b0caba.image.jpg?resize=400%2C266",
    "https://amc-theatres-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,w_750/v1/amc-cdn/production/2/movies/58600/58558/PromotionDynamic/66619.jpg",
    "http://www.gstatic.com/tv/thumb/v22vodart/12004128/p12004128_v_v8_aa.jpg",
    "http://www.gstatic.com/tv/thumb/v22vodart/14569140/p14569140_v_v8_am.jpg",
    "https://www.foxmovies.com/s3/dev-temp/en-US/__5ca7f1be9b27a.jpg",
    "http://www.gstatic.com/tv/thumb/movieposters/15465632/p15465632_p_v8_ah.jpg",
    "http://www.gstatic.com/tv/thumb/v22vodart/14596224/p14596224_v_v8_aa.jpg",
    "http://www.gstatic.com/tv/thumb/movieposters/16357164/p16357164_p_v8_ar.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTY0MzUwODc4N15BMl5BanBnXkFtZTgwMjMyMjY0NzM@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
    "http://www.gstatic.com/tv/thumb/v22vodart/14568731/p14568731_v_v8_ab.jpg",
    "http://www.gstatic.com/tv/thumb/v22vodart/81732/p81732_v_v8_aa.jpg",
    "http://www.gstatic.com/tv/thumb/v22vodart/15366809/p15366809_v_v8_af.jpg"
  ],
  Sports: [
    "https://s.abcnews.com/images/International/yankees-red-sox-london-ap-jt-190629_hpMain_16x9_608.jpg",
    "https://cdn.vox-cdn.com/thumbor/JJHDE7lRC7fN9KXgzxGgfJ_UNIg=/0x0:5184x3456/1200x675/filters:focal(2156x1844:2984x2672)/cdn.vox-cdn.com/uploads/chorus_image/image/64686790/899648644.jpg.0.jpg",
    "https://texastech.com/images/2019/2/24/IMG_6154.JPG",
    "https://rfathead-res.cloudinary.com/image/upload/h_300,w_300/logos/lgo_mlb_new_york_yankees.png",
    "http://content.sportslogos.net/logos/54/67/full/1232.png",
    "http://goodifitgoes.com/wp-content/uploads/2016/09/knicks-logo.jpg",
    "https://timenewsfeed.files.wordpress.com/2012/05/nets.jpg?w=600",
    "https://s.hdnux.com/photos/47/04/67/10243574/3/920x920.jpg",
    "https://cdn.shopify.com/s/files/1/1629/1645/products/LCnvsNJDevl.jpg?v=1531407111",
    "https://i.pinimg.com/originals/6b/4d/56/6b4d5666e944fc30b824be9508f2ac25.jpg",
    "https://www.underconsideration.com/brandnew/archives/new_york_jets_logo.png"
  ]
}

document.addEventListener('DOMContentLoaded', function() {
  loginDiv.innerHTML = `
      <button type="submit" class='btn-step1 waves-effect waves-light btn login'>Login</button>
      <button type="submit" class='btn-step1 waves-effect waves-light btn'>Sign up</button>
  `
})//End of domcontent loading

loginDiv.addEventListener('click', function(e) {
  const firstButtons = document.querySelectorAll('.btn-step1')
  if (e.target.tagName === "BUTTON") {
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
    fetch(`${usersUrl}/username/${username}`)
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

function loggedIn() {
  loginDiv.style.display = "none"
  addEventListeners()
}//login verifictaion

setInterval(function(){
  fetchAllTicket()
}, 3000);

function checkForBidWins() {
  let ticketWithBids = ticketArray.filter(ticket => {
    return (!ticket.status) && (ticket.bids.length > 0)
  })
  ticketWithBids.forEach(ticket => {
    findBidWinner(ticket)
  })
}

function findBidWinner(ticket) {
  let winner = ticket.bids.pop()
  bidWin(winner, ticket)
}

function addCashToSeller(ticket) {
  let sellerCash
  fetch(`http://localhost:3000/users/${ticket.seller_id}`)
  .then(resp => resp.json())
  .then(seller => {
    sellerCash = seller.cash
  })
  console.log(sellerCash);
  console.log(sellerCash += ticket.price);
  // fetch(`http://localhost:3000/users/${ticket.seller_id}`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Accept": "application/json"
  //   },
  //   body: JSON.stringify({
  //     user_id: winner.user.id,
  //     ticket_id: ticket.id,
  //     price: winner.price,
  //     seller_id: winner.user.id,
  //   })
  // })
}
function bidWin(winner, ticket) {

  fetch("http://localhost:3000/purchases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      user_id: winner.user.id,
      ticket_id: ticket.id,
      price: winner.price,
      seller_id: winner.user.id,
    })
  })
  .then(resp => resp.json())
  .then(json => {
    // console.log(json);
  })
  fetch(`http://localhost:3000/tickets/${ticket.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      seller_id: winner.user.id,
    })
  })
  .then(resp => resp.json())
  .then(json => {
    console.log(json);
    removeBids(ticket.id)
    if (currentTicket.id === ticket.id) {
      showTicket(ticket)
      bidsContainer.innerHTML = `<h6>${winner.user.name} has won the ticket!</h6>`
    }
  })
}

function signUpPost(signupBtn) {
  loginDiv.addEventListener('submit', function(e) {
    e.preventDefault()
    let formInput = {
      name: e.target[0].value,
      email: e.target[1].value,
      username: e.target[2].value,
      creditCard: e.target[3].value
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

function fetchAllTicket() {
  ticketArray = []
  fetch('http://localhost:3000/tickets/all')
  .then(r => r.json())
  .then(json => {
    json.forEach(ticket => {
      ticketArray.push(ticket)
    })
    checkForBidWins()
  })
}//fetch of all the tickets

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
  bidsContainer.innerHTML = ""
  ticketInfo.innerHTML=`
  <form id="add-ticket-form" class="col s12">
    <input type='text' value="" name="" placeholder="Title">
    Category
    <select style="display: block" name="Category">
    <option value="">Select Category</option>
      <option value="Movies">Movies</option>
      <option value="Concerts">Concerts</option>
      <option value="Sports">Sports</option>
    </select>
    <input type='text' value="" name="" placeholder="Location">
    Date:
    <input type="date" name="bday">
    Time
    <input id="appt-time" type="time">
    <div id="image-container" style="display:none" ></div>
    <input id="image-url" type="hidden" value="">
    <input type='number' value="" name="" placeholder="Min Price">
    <input type='number' value="" name="" placeholder="Buy Now">
    <button type="submit" id='add-ticket' class='waves-effect waves-light btn'>Add Ticket</button>
  </form>
  `
  addEventListenerForImageDiv()
}

function addEventListenerForImageDiv() {
  let categorySelection = ticketInfo.querySelector('select')
  let imageDiv = ticketInfo.querySelector('#image-container')
  categorySelection.addEventListener('change', (e) => {
    console.log(categorySelection.value);
    imageDiv.style.display = ""
    imageDiv.innerHTML = ""
    let imagesArray = ticketImages[`${categorySelection.value}`]
    imagesArray.forEach(image => {
      imageDiv.innerHTML += `
        <img src="${image}" />
      `
    })
  })
  addEventListenerForImages()
}

function addEventListenerForImages() {
  const imagesContainer = ticketInfo.querySelector('#image-container')
  const imageInput = ticketInfo.querySelector('#image-url')
  imagesContainer.addEventListener('click', e => {
    let imageArray = imagesContainer.querySelectorAll('img')
    imageArray.forEach(image => {
      image.style.border = ""
    })
    if (e.target.tagName === "IMG") {
      let image = e.target
      image.style.border = "3px black solid"

      imageInput.value = e.target.src
    }
  })
}

function sellTicketForm(e) {
  ticketInfo.style.removeProperty('background-image')
  bidsContainer.innerHTML = ""
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
        <img data-id= ${ticket.id} src="${ticket.image_url}" style="height:153px;">
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
  fetch(`http://localhost:3000/users/username/${currentUser.username}`)
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
  ticketInfo.classList = "card s6 card-background"
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
  ticketInfo.style.backgroundImage = `url(${ticket.image_url})`

  ticketInfo.innerHTML = `
  <div class="ticket-details col s12">
    <h5>${ticket.title}</h5>
    <p>${ticket.category}</p>
    <p>${ticket.location}</p>
    <p><strong>Date:</strong> ${ticket.date}</p>
    <p><strong>Time:</strong> ${time}</p>
    <p id="min_price-field"><strong>Minimum Bid:</strong> $${ticketBidPrice}</p>
  </div>
  `
  bidForm.innerHTML = ""
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
    ticketInfo.childNodes[1].innerHTML +=  `
    <div class="row col">
      <button id='btn-buy' data-id=${ticket.id} class='waves-effect waves-light btn'>Buy Now for $${ticket.buy_now}</button>
      <button id='btn-bid' data-id=${ticket.id} class='waves-effect waves-light btn'>Bid</button>
    </div>
    `
  } else {
    ticketInfo.childNodes[1].innerHTML +=  `
    <div class="row col">
      <button id='btn-sell' data-id=${ticket.id} class='waves-effect waves-light btn'>Sell</button>
    </div>
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
  bidsContainer.style.display = "none"
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
  if ((ticketObj.bids.length > 0) && (input <= parseInt(ticketObj.min_price))) {
    const alertTag = bidForm.querySelector('#input-alert')
    alertTag.innerHTML = `Amount must be higher than $${ticketObj.min_price}`
  } else if (input < parseInt(ticketObj.min_price)) {
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
      ticketObj.bids.push(json)
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
  bidsContainer.style.display = ""
  if (bidsContainer.innerHTML === "") {
    bidsContainer.innerHTML = `<h6>Bids</h6>`
  }
  bidsContainer.innerHTML += `
  <div class="card col s12">
    <div>${bid.price}</div>
    <div>${bid.user.name}</div>
  </div>
  `
}

function removeFromUserList(ticketObj) {
  debugger
  const ticketLi = ticketContainer.querySelector(`[data-id="${ticketObj.id}"]`).parentElement.parentNode
  ticketLi.remove()
  // ticketContainer.querySelector
  // if (ticketArray[index].status) {
  //   debugger
  //
  //   ticketArray[index].status = false
  // } else {
  //
  //   ticketLi.remove()
  //   ticketArray[index].status = true
  // }
}

function buyNow(e){
  const ticketId = e.target.dataset.id
  let ticketObj = ticketArray.find(function(ticket){ return ticket.id === parseInt(ticketId)})
  // addCashToSeller(ticketObj)
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
    // console.log(json);
    if (ticketObj.bids.length > 0) {
      removeBids(ticketId)
      bidsContainer.innerHTML = ""
    }
    // changeTicketStatus(ticketId, ticketObj)
    fetchUserTickets()
    showTicket(ticketObj)
    bidsContainer.innerHTML = `Purchased!`
  })
  // .then(() => {
  //   fetch(`http://localhost:3000/tickets/${ticketId}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify({
  //       status: false
  //     })
  //   })

  // })
  bidsContainer.innerHTML = `<div class="preloader-wrapper active">
        <div class="spinner-layer spinner-red-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>`
}

function removeBids(ticketId) {
  fetch(`http://localhost:3000/bids/${ticketId}`, {
    method: "DELETE"
  })
}

ticketInfo.addEventListener('submit', (e) => {
  e.preventDefault()

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
  currentTicket.status = false
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
    ticketInfo.innerHTML = ""
    bidsContainer.innerHTML = `Ticket is now available for purchase!`
    deletePurchase(ticketId)
    fetchUserTickets()
    // removeFromUserList(json)
    showTicket(json)
  })
}

function deletePurchase(ticketId) {
  fetch(`http://localhost:3000/purchases/${ticketId}`, {
    method: "DELETE",
  })
}

function postNewTicket(e,date,timeInfo) {

  let formInput = {
    title: e.target[0].value,
    category: e.target[1].value,
    location: e.target[2].value,
    time: timeInfo,
    image_url: e.target[5].value,
    min_price: e.target[6].value,
    buy_now: e.target[7].value,
    date: date,
    status: true,
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
    bidsContainer.innerHTML = `${json.message}`
    showTicket(json.ticket)
  })

}
