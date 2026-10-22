
let totalBookings = 0;
let availableSeats = 5;

let bookings = [];
let waitingQueue = [];

const bookBtn = document.getElementById("bookBtn");
const customerInput = document.getElementById("customer");
const movieInput = document.getElementById("movie");
const seatsInput = document.getElementById("seats");
const message = document.getElementById("message");

bookBtn.addEventListener("click", function () {
    const name = customerInput.value.trim();
    const movie = movieInput.value;
    const seats = Number(seatsInput.value);

    if (
        name === "" ||
        !Number.isInteger(seats) ||
        seats < 1 ||
        seats > 5
    ) {
        message.textContent = "Enter a valid name and seat count (1–5).";
        return;
    }

    const booking = {
        name: name,
        movie: movie,
        seats: seats,
        status: "Waiting"
    };

    if (availableSeats >= seats && waitingQueue.length === 0) {
        availableSeats -= seats;
        booking.status = "Confirmed";
        totalBookings++;

        message.textContent =
            "Booking confirmed! Seats remaining: " + availableSeats;
    } else {
        waitingQueue.push(booking);

        message.textContent =
            "Seats unavailable. You have joined the waiting queue.";
    }

    bookings.push(booking);

    updateDisplay();
    customerInput.value = "";
    seatsInput.value = 1;
});

function processWaitingQueue() {
    while (waitingQueue.length > 0) {
        const nextCustomer = waitingQueue[0];

        if (nextCustomer.seats <= availableSeats) {
            waitingQueue.shift();
            availableSeats -= nextCustomer.seats;
            nextCustomer.status = "Confirmed";
            totalBookings++;
        } else {
            // FIFO: the next customer must be served first.
            break;
        }
    }
}

function updateDisplay() {
    document.getElementById("available").textContent = availableSeats;
    document.getElementById("total").textContent = totalBookings;
    document.getElementById("waitingCount").textContent =
        waitingQueue.length;

    document.getElementById("records").innerHTML =
        bookings.length === 0
            ? "No bookings yet. Your movie night starts here!"
            : bookings.map(function (b) {
                return `<div class="record">
                    <strong>${b.name}</strong> — ${b.movie}<br>
                    Seats: ${b.seats} |
                    Status: <strong>${b.status}</strong>
                </div>`;
            }).join("");

    document.getElementById("queue").innerHTML =
        waitingQueue.length === 0
            ? "The queue is empty."
            : waitingQueue.map(function (q, index) {
                return `<div class="record">
                    ${index + 1}. ${q.name} — ${q.movie}
                    (${q.seats} seat/s)
                </div>`;
            }).join("");
}

// Initial display
updateDisplay();
