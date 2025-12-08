import React from "react";
import { useNavigate } from "react-router-dom";

const SessionInfo = ({ movieSessions, movieId }) => {
  const navigate = useNavigate();

  const handleSessionClick = (sessionTime) => {
    navigate(`/movie/${movieId}`, {
      state: {
        sessionTime,
      },
    });
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {movieSessions.map((session, idx) => (
        <button
          key={idx}
          onClick={() => handleSessionClick(session.time)}
          className="time-btn"
        >
          {session.time}
        </button>
      ))}
    </div>
  );
};

export default SessionInfo;
