import { useEffect } from "react";

import { SelectProps } from "../../types/strongAppAnalytics.types";

import "./Select.css";

const Select = ({
  currentDataType,
  uniqueExercises,
  onChangeFunction,
  onChangeFunctionSingle,
}: SelectProps) => {
  useEffect(() => {
    if (uniqueExercises.length === 1) {
      onChangeFunctionSingle(uniqueExercises[0]);
    }
  }, [uniqueExercises]);

  const isOneExcercise = uniqueExercises.length === 1;
  const selectHeight = 6;

  return (
    !isOneExcercise && (
      <>
        <label>
          Select 1 or more exercises from {currentDataType} data
        </label>
        <select
          onChange={(event) => onChangeFunction(event)}
          multiple={isOneExcercise ? false : true}
          size={
            uniqueExercises.length > selectHeight
              ? selectHeight
              : uniqueExercises.length
          }
          className={isOneExcercise ? "no-arrow" : ""}
          defaultValue={isOneExcercise ? uniqueExercises[0] : undefined}
        >
          {uniqueExercises.map((exerciseName) => (
            <option key={exerciseName} value={exerciseName}>
              {exerciseName}
            </option>
          ))}
        </select>
      </>
    ));
};

export default Select;
