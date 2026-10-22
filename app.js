
let totalBookings = 0;
let availableSeats = 5;

let bookings = [];
let waitingQueue = [];

document.getElementById("bookBtn").addEventListener("click", function () {
    const name = document.getElementById("customer").value.trim();
    const movie = document.getElementById("movie").value;
    const seats = Number(document.getElementById("seats").value);
    const message = document.getElementById("message");

    if (name === "" || !Number.isInteger(seats) || seats < 1) {
        message.textContent = "Enter a valid name and seat count.";
        return;
    }

    if (availableSeats >= seats) {
        availableSeats -= seats;
        totalBookings++;

        bookings.push({
            name: name,
            movie: movie,
            seats: seats,
            status: "Confirmed"
        });

        message.textContent =
            "Tickets booked successfully! Seats remaining: " +
            availableSeats;
    } else {
        waitingQueue.push({
            name: name,
            movie: movie,
            seats: seats
        });

        bookings.push({
            name: name,
            movie: movie,
            seats: seats,
            status: "Waiting"
        });

        message.textContent =
            "Not enough seats. You have joined the waiting queue.";
    }

    showRecords();
});

function showRecords() {
    document.getElementById("total").textContent = totalBookings;

    document.getElementById("records").innerHTML =
        bookings.map(function (b) {
            return `<div class="record">
                <strong>${b.name}</strong> — ${b.movie}<br>
                Seats: ${b.seats} | Status: ${b.status}
            </div>`;
        }).join("");

    document.getElementById("queue").innerHTML =
        waitingQueue.length === 0
            ? "Waiting queue is empty."
            : waitingQueue.map(function (q, index) {
                return `<div class="record">
                    ${index + 1}. ${q.name} — ${q.movie}
                    (${q.seats} seat/s)
                </div>`;
            }).join("");
}
