const mainCategoryContainer = document.querySelector("#main-column")
let ticketContainer = document.querySelector('#tickets-list')
const ticketsUrl = "http://localhost:3000/tickets"
let ticketArray = []


mainCategoryContainer.addEventListener("click", event => {
  switch(event.target.innerText) {
  case "Movies":
    let movieTickets = ticketArray.filter(ticket => ticket.category === "Movies")
      movieTickets.forEach(ticket => {
        renderTicket(ticket)
      })
    break;

    case "Concerts":
      let concertTicket = ticketArray.filter(ticket => ticket.category === "Concerts")
        concertTicket.forEach(ticket => {
          renderTicket(ticket)
        })
      break;

      case "Sports":
        let sportTicket = ticketArray.filter(ticket => ticket.category === "Sports")
          sportTicket.forEach(ticket => {
            renderTicket(ticket)
          })
        break;

  default:
    // code block
}

})


fetchAllTicket()
function fetchAllTicket(){
  fetch(ticketsUrl)
  .then(r=> r.json())
  .then(json => {
    json.forEach(ticket => ticketArray.push(ticket))
  })
}

function renderTicket(element) {
  const ticketLi = document.createElement('li')
  ticketContainer.innerHTML=""
  ticketLi.innerHTML += `
    <p>${element.title}</p>
  `
  ticketContainer.appendChild(ticketLi)
}
