import { useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { ParsedResultData } from "../../types/strongAppAnalytics.types";
import {
  GroupedExercises,
  WorkoutCalendarProps,
  WorkoutCalendarTileArgs,
} from "../../types/WorkoutCalendar.types";

import exercises from "../../constants/exercises";

import { formatDateToYYYYMMDD } from "../../utils/dates";

import Tooltip from "../Tooltip/Tooltip";

import "./WorkoutCalendar.css";

const WorkoutCalendar = ({
  selectedExercise,
  uniqueDates,
  workoutData,
}: WorkoutCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const isOneExercise = selectedExercise.length === 1;

  const tileClassName = ({ date, view }: WorkoutCalendarTileArgs) => {
    if (view === "month") {
      const dateString = formatDateToYYYYMMDD(date);

      if (!uniqueDates.includes(dateString)) {
        return null;
      }

      let classes = "workout-day";

      if (selectedExercise.length === 1) {
        const hasSelectedExercise = workoutData.some((workout) => {
          const workoutDateString = formatDateToYYYYMMDD(
            new Date(workout.Date),
          );
          return (
            workoutDateString === dateString &&
            workout.Name === selectedExercise[0]
          );
        });

        if (hasSelectedExercise) {
          classes += " isExercise";
        }
      }
      return classes;
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

  const renderexercises = () => {
    const filteredExercises = workoutData.filter(
      (row) =>
        formatDateToYYYYMMDD(new Date(row.Date)) === selectedDate &&
        row.SetOrder !== "Rest Timer",
    );
    const groupedExercises = groupExercisesByName(filteredExercises);

    return Object.keys(groupedExercises).map((exerciseName) => (
      <div className="exercise-container" key={exerciseName}>
        <h3>{exerciseName}</h3>
        {groupedExercises[exerciseName].map(
          (exercise: ParsedResultData, index: number) => {
            const isNote = exercise.SetOrder === "Note";
            return (
              <div className="sets-container" key={index}>
                {!isNote ? (
                  <p>
                    Set {exercise.SetOrder}:{" "}
                    {exerciseName === exercises.DEADHANG
                      ? `${exercise.Duration} secs`
                      : `${exercise.Weight} kgs | ${exercise.Reps} reps`}
                  </p>
                ) : (
                  <span className="notes">Set note: {exercise.Notes}</span>
                )}
              </div>
            );
          },
        )}
      </div>
    ));
  };

  const tooltipContent = (
    <>
      <p>
        The latest workout-date is{" "}
        <span className={isOneExercise ? "tooltip-highlighted-single" : "tooltip-highlighted"}>highlighted</span> by default
      </p>
      <p>
        All exercise-days are{" "}
        <span className="tooltip-bold-highlighted">bold and underlined</span>
      </p>
      {isOneExercise && (
        <p>
          Exercise-days for selected exercise are with{" "}
          <span className="tooltip-green">green</span> background
        </p>
      )}
    </>
  );

  return (
    <>
      <p className="calendar-instructions">
        Click on the workout-day to get detailed information about the exercises
        performed on that day
      </p>
      <div
        className={`calendar-container ${selectedDate ? "with-details" : ""}`}
      >
        <span className="calendar-tooltip-wrapper">
          <Tooltip className="calendar-tooltip">{tooltipContent}</Tooltip>
          <Calendar
            onClickDay={handleDayClick}
            tileClassName={tileClassName}
            value={uniqueDates[uniqueDates.length - 1]}
          />
        </span>

        {selectedDate && (
          <div className="workout-details">
            <h3>Workout on {selectedDate}</h3>
            {renderexercises()}
          </div>
        )}
      </div>
    </>
  );
};

export default WorkoutCalendar;
