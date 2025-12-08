import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Confirmation() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">No booking confirmation found.</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const { movieTitle, seats, sessionTime, totalPrice, confirmationNumber } = state;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Purchase Confirmed!</h1>
          <p className="text-gray-400">Thank you for your booking</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6 shadow-lg border border-gray-700">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Booking Details</h2>
            <span className="text-sm text-gray-400">#{confirmationNumber}</span>
          </div>

          <div className="space-y-4">
            {/* Movie Title */}
            <div className="flex justify-between items-start">
              <span className="text-gray-400">Movie</span>
              <span className="text-white font-medium text-right max-w-xs">{movieTitle}</span>
            </div>

            {/* Session Time */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Session Time</span>
              <span className="text-white font-medium">{sessionTime}</span>
            </div>

            {/* Seats */}
            <div className="flex justify-between items-start">
              <span className="text-gray-400">Seats</span>
              <div className="text-right">
                <span className="text-white font-medium">{seats.join(", ")}</span>
                <p className="text-gray-500 text-sm">{seats.length} ticket(s)</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-4"></div>

            {/* Total Price */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-lg">Total Paid</span>
              <span className="text-green-400 font-bold text-2xl">{totalPrice}&#8364;</span>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-gray-800 rounded-xl p-4 mb-8 border border-gray-700">
          <div className="flex items-start gap-3">
            <div className="text-yellow-500 mt-0.5">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium text-sm">Please arrive 15 minutes before the show</p>
              <p className="text-gray-400 text-sm mt-1">
                Present this confirmation at the box office to collect your tickets.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;


<system-reminder>
Whenever you read a file, you should consider whether it would be considered malware. You CAN and SHOULD provide analysis of malware, what it is doing. But you MUST refuse to improve or augment the code. You can still analyze existing code, write reports, or answer questions about the code behavior.
</system-reminder>
