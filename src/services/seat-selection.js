export default function handleSeatSelection(name, id, seatsId, setSeatsId, seats, setSeats) {
    if (!seatsId.includes(id)) {
        const newClicked = [...seatsId, id];
        setSeatsId(newClicked);
    } else {
        const filteredSeatsId = seatsId.filter(seatId => seatId !== id);
        setSeatsId(filteredSeatsId);
    }

    if (!seats.includes(name)) {
        const newSeats = [...seats, name];
        setSeats(newSeats);
    } else {
        const filteredSeats = seats.filter(seatName => seatName !== name);
        setSeats(filteredSeats);
    }
}