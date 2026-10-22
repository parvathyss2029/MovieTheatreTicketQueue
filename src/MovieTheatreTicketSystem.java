
import java.util.Scanner;

public class MovieTheatreTicketSystem {
    static final int CAPACITY = 5;
    static String[] movies = {
        "The Last Galaxy",
        "Letters to Yesterday",
        "The Hidden Signal"
    };

    static int availableSeats = CAPACITY;
    static String[] confirmed = new String[100];
    static String[] waiting = new String[100];
    static int confirmedCount = 0;
    static int front = 0, rear = -1;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;

        do {
            System.out.println("\n=== CINEQUEUE ===");
            System.out.println("1. View Movies");
            System.out.println("2. Book Tickets");
            System.out.println("3. View Confirmed Bookings");
            System.out.println("4. View Waiting Queue");
            System.out.println("5. Cancel a Confirmed Booking");
            System.out.println("6. Exit");
            System.out.print("Enter choice: ");
            choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {
                case 1:
                    for (int i = 0; i < movies.length; i++)
                        System.out.println((i + 1) + ". " + movies[i]);
                    System.out.println("Available seats: " + availableSeats);
                    break;

                case 2:
                    System.out.print("Customer name: ");
                    String name = sc.nextLine();
                    System.out.println("Select movie (1-3): ");
                    int movie = sc.nextInt();
                    System.out.print("Number of seats: ");
                    int seats = sc.nextInt();
                    sc.nextLine();

                    if (movie < 1 || movie > movies.length || seats < 1) {
                        System.out.println("Invalid input.");
                    } else {
                        String booking = name + " - " +
                            movies[movie - 1] + " - " + seats + " seat(s)";

                        if (seats <= availableSeats) {
                            availableSeats -= seats;
                            confirmed[confirmedCount++] = booking;
                            System.out.println("Booking confirmed!");
                        } else if (rear < waiting.length - 1) {
                            waiting[++rear] = booking;
                            System.out.println("Added to waiting queue.");
                        } else {
                            System.out.println("Waiting queue is full.");
                        }
                    }
                    break;

                case 3:
                    if (confirmedCount == 0)
                        System.out.println("No confirmed bookings.");
                    for (int i = 0; i < confirmedCount; i++)
                        System.out.println((i + 1) + ". " + confirmed[i]);
                    break;

                case 4:
                    if (front > rear)
                        System.out.println("Waiting queue is empty.");
                    for (int i = front; i <= rear; i++)
                        System.out.println((i - front + 1) + ". " + waiting[i]);
                    break;

                case 5:
                    if (confirmedCount == 0) {
                        System.out.println("No booking to cancel.");
                    } else {
                        for (int i = 0; i < confirmedCount; i++)
                            System.out.println((i + 1) + ". " + confirmed[i]);
                        System.out.print("Enter booking number to cancel: ");
                        int index = sc.nextInt() - 1;
                        sc.nextLine();

                        if (index >= 0 && index < confirmedCount) {
                            confirmed[index] = confirmed[confirmedCount - 1];
                            confirmedCount--;
                            availableSeats++;
                            System.out.println("Booking cancelled.");
                        } else {
                            System.out.println("Invalid booking number.");
                        }
                    }
                    break;

                case 6:
                    System.out.println("Thank you!");
                    break;

                default:
                    System.out.println("Invalid choice.");
            }
        } while (choice != 6);

        sc.close();
    }
}
