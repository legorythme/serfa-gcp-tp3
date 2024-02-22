async function getTickets() {
  try {
    const call = await fetch("http://localhost/api/tickets");
    const data = await call.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// when my HTML page is full loaded, trigger that code
document.addEventListener("DOMContentLoaded", async () => {
  console.log("javascript is loaded");

  let tickets = [];
  tickets = await getTickets();

  // generate HTML for each ticket row
  tickets.forEach((ticket) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${ticket.id}</td>
            <td>${ticket.title}</td>
            <td>${ticket.description}</td>
            <td>
                <span class="status-label ${ticket.status === "Assigned" ? "assigned" : "unassigned"}">${ticket.status}</span>
            </td>
            <td>${ticket.assignedTo || "-"}</td>
            <td class="action-buttons">
                <button class="button" onclick="deleteTicket(${ticket.id})">Delete</button>
                <button class="button" onclick="assignTicket(${ticket.id})">Assign</button>
            </td>
        `;
    document.querySelector("tbody").appendChild(tr);
  });
});
