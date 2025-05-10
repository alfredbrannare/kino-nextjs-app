export function generateSalong(layoutConfig, includeWheelchairs = true) {
    const layout = [];

    layoutConfig.forEach((seatCount, index) => {
        const row = index + 1;
        const rowSeats = [];

        for (let seat = 1; seat <= seatCount; seat++) {
            rowSeats.push({ row, seat, isWheelchair: false });
        }

        if (includeWheelchairs && index === layoutConfig.length - 1) {
            //Last row, add wheelchair seats
            rowSeats.unshift({ row, seat: 0, isWheelchair: true });
            rowSeats.push({ row, seat: seatCount + 1, isWheelchair: true});
        }

        layout.push(rowSeats);
    });

    return layout;
}