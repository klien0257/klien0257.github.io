import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import generateRandomOccupiedSeats from '../utils/GenerateRandomOccupiedSeats';
import SeatSelector from './SeatSelector';
import SeatShowcase from './SeatShowcase';

const movies = [
  {
    title: '',
    price: 10,
    occupied: generateRandomOccupiedSeats(1, 64, 64),
  },
];

function SeatPlan({ movie, sessionTime }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [recommendedSeat, setRecommendedSeat] = useState(null);
  const navigate = useNavigate();

  // Dummy occupied seats (use your API later)
  const occupiedSeats = movies[0].occupied;

  const availableSeats = [27, 28, 29, 30, 35, 36, 37, 38, 43, 44, 45, 46];

  const filteredAvailableSeats = availableSeats.filter(
    (seat) => !occupiedSeats.includes(seat)
  );

  // Automatically pick recommended seat
  useEffect(() => {
    let recommended = null;
    for (let seat of filteredAvailableSeats) {
      if (!occupiedSeats.includes(seat)) {
        recommended = seat;
        break;
      }
    }
    setRecommendedSeat(recommended);
  }, [filteredAvailableSeats]);

  let selectedSeatText = '';
  if (selectedSeats.length > 0) {
    selectedSeatText = selectedSeats.map((seat) => seat + 1).join(', ');
  }

  const totalPrice = selectedSeats.length * movies[0].price;
  const isAnySeatSelected = selectedSeats.length > 0;

  // 🚀 NEW BUY BUTTON → Checkout navigation
  const handleBuyClick = (e) => {
    e.preventDefault();

    if (!selectedSeats.length) return;

    navigate('/checkout', {
      state: {
        movieId: movie.id,
        movieTitle: movie.title,
        sessionTime: sessionTime,
        seats: selectedSeats.map((s) => s + 1), // convert seat indexes
        totalPrice: totalPrice,
      },
    });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Title */}
      <div className="w-full md:w-1/2 lg:w-2/3 px-6">
        <h2 className="mb-8 text-2xl font-semibold text-center">
          Choose your seats by clicking on the available seats
        </h2>
      </div>

      {/* Seat Selector */}
      <div className="CinemaPlan">
        <SeatSelector
          movie={{ ...movies[0], occupied: occupiedSeats }}
          selectedSeats={selectedSeats}
          recommendedSeat={recommendedSeat}
          onSelectedSeatsChange={setSelectedSeats}
          onRecommendedSeatChange={setRecommendedSeat}
        />

        <SeatShowcase />

        {/* Seat Selection Summary */}
        <p className="info mb-2 text-sm md:text-sm lg:text-base">
          You have selected{' '}
          <span className="count font-semibold">{selectedSeats.length}</span>{' '}
          seat{selectedSeats.length !== 1 ? 's' : ''}{' '}
          {selectedSeatText && (
            <>
              :{' '}
              <span className="selected-seats font-semibold">
                {selectedSeatText}
              </span>
            </>
          )}
          {selectedSeats.length > 0 && (
            <>
              {' '}
              for the price of{' '}
              <span className="total font-semibold">{totalPrice}€</span>
            </>
          )}
        </p>

        {/* Buy Button → Checkout */}
        {isAnySeatSelected ? (
          <button
            className="bg-green-500 hover:bg-green-700 text-white rounded px-3 py-2 text-sm font-semibold cursor-pointer"
            onClick={handleBuyClick}
          >
            Buy at <span className="font-semibold">{totalPrice}€</span>
          </button>
        ) : (
          <p className="info text-sm md:text-sm lg:text-base">
            Please select a seat
          </p>
        )}
      </div>
    </div>
  );
}

export default SeatPlan;
