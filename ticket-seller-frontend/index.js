const mainCategoryContainer = document.querySelector("#main-column")
let ticketContainer = document.querySelector('#tickets-list')
const ticketsUrl = "http://localhost:3000/tickets"
let ticketArray = []


mainCategoryContainer.addEventListener("click", event => {
  switch(event.target.innerText) {
  case "Movies":
  ticketContainer.innerHTML=""
    let movieTickets = ticketArray.filter(ticket => ticket.category === "Movies")
      movieTickets.forEach(ticket => {
        renderTicket(ticket)
      })
    break;

    case "Concerts":
    ticketContainer.innerHTML=""
      let concertTicket = ticketArray.filter(ticket => ticket.category === "Concerts")
        concertTicket.forEach(ticket => {
          renderTicket(ticket)
        })
      break;

      case "Sports":
      ticketContainer.innerHTML=""
        let sportTicket = ticketArray.filter(ticket => ticket.category === "Sports")
          sportTicket.forEach(ticket => {
            renderTicket(ticket)
          })
        break;

        // case "My Tickets":
        //
        //   fetch("http://localhost:3000/users/")
        //       renderTicket(ticket)
        //     })
        //   break;
        case "All Tickets":
        ticketContainer.innerHTML=""
          ticketArray.forEach(ticket =>{
            console.log(ticket)
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
  ticketContainer.innerHTML += `
    <li data-id=${element.id}>${element.title}</li>
  `
  // ticketContainer.appendChild(ticketLi)
}
