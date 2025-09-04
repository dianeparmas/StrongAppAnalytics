import { useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { ParsedResultData } from "../../types/strongAppAnalytics.types";

import {
  GroupedExercises,
  WorkoutCalendarProps,
  WorkoutCalendarTileArgs,
} from "../../types/WorkoutCalendar.types";

import DATA_TYPE from "../../constants/dataType";
import EXCERCISES from "../../constants/excercises";

import { formatDateToYYYYMMDD } from "../../utils/dates";

import "./WorkoutCalendar.css";

const WorkoutCalendar = ({
  currentDataType,
  uniqueDates,
  workoutData,
}: WorkoutCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState("");

  const tileClassName = ({ date, view }: WorkoutCalendarTileArgs) => {
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

  const groupExercisesByName = (exercises: ParsedResultData[]) => {
    return exercises.reduce<GroupedExercises>((acc, exercise) => {
      const exerciseName = exercise.Name;

      if (!acc[exerciseName]) {
        acc[exerciseName] = [exercise];
      } else {
        acc[exerciseName].push(exercise);
      }

      return acc;
    }, {} as GroupedExercises);
  };

  const renderExcercises = () => {
    const filteredExercises = workoutData.filter(
      (row) =>
        formatDateToYYYYMMDD(new Date(row.Date)) === selectedDate &&
        row.SetOrder !== "Rest Timer",
    );
    const groupedExercises = groupExercisesByName(filteredExercises);

    return Object.keys(groupedExercises).map((exerciseName) => (
      <div className="excercise-container" key={exerciseName}>
        <h3>{exerciseName}</h3>
        {groupedExercises[exerciseName].map(
          (exercise: ParsedResultData, index: number) => (
            <div className="sets-container" key={index}>
              <p>
                Set {exercise.SetOrder}:{" "}
                {exerciseName === EXCERCISES.DEADHANG
                  ? `${exercise.Duration} secs`
                  : `${exercise.Weight} kgs | ${exercise.Reps} reps`}
              </p>
              <span className="notes">{exercise.Notes}</span>
            </div>
          ),
        )}
      </div>
    ));
  };

  return (
    <>
      <p>
        Click on the workout-day to get detailed information about the
        excercises performed on that day
      </p>
      <div className="calendar-container">
        <Calendar
          onClickDay={handleDayClick}
          tileClassName={tileClassName}
          {...(currentDataType === DATA_TYPE.MOCK && {
            value: "2025-06-01T00:00:00Z",
          })}
        />
        {selectedDate && (
          <div className="workout-details">
            <h3>Workout on {selectedDate}</h3>
            {renderExcercises()}
          </div>
        )}
      </div>
    </>
  );
};

export default WorkoutCalendar;
