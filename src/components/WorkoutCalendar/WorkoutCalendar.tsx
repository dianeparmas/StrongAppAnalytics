import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the default CSS

import { WorkoutCalendarProps } from "../../types/strongAppAnalytics.types";

import "./WorkoutCalendar.css";

const WorkoutCalendar = ({
  uniqueDates,
  workoutData,
}: WorkoutCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState("");

  const formatDateToYYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = formatDateToYYYYMMDD(date);
      if (uniqueDates.includes(dateString)) {
        return "workout-day";
      }
    }
    return null;
  };

  const handleDayClick = (date: Date) => {
    const dateString = formatDateToYYYYMMDD(date);
    if (uniqueDates.includes(dateString)) {
      setSelectedDate(dateString);
    } else {
      setSelectedDate("");
    }
  };

  return (
    <>
      <p>
        Click on the workout-day to get detailed information about the
        excercises performed on that day
      </p>
      <div className="calendar-container">
        <Calendar onClickDay={handleDayClick} tileClassName={tileClassName} />
        {selectedDate && (
          <div className="workout-details">
            <h3>Workout on {selectedDate}</h3>
            {workoutData
              .filter(
                (row) =>
                  formatDateToYYYYMMDD(new Date(row.Date)) === selectedDate,
              )
              .map((exercise, index) => (
                <p key={index}>
                  {exercise.Name} - {exercise.Weight} kgs
                </p>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WorkoutCalendar;
