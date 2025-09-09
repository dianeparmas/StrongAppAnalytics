import { useEffect, useMemo } from "react";

import { SelectExercisesProps } from "../../types/SelectExercises.types";

import "./SelectExercises.css";

const SelectExercises = ({
  currentDataType,
  uniqueExercises,
  onChangeFunction,
  onChangeFunctionSingle,
}: SelectExercisesProps) => {
  const alphabeticalExercises = useMemo(() => {
    return [...uniqueExercises].sort((a, b) => a.localeCompare(b));
  }, [uniqueExercises]);

  useEffect(() => {
    onChangeFunctionSingle(alphabeticalExercises[0]);
  }, [uniqueExercises]);

  const isOneexercise = uniqueExercises.length === 1;
  const selectHeight = 6;

  return (
    !isOneexercise &&
    uniqueExercises.length && (
      <>
        <label>Select 1 or more exercises from {currentDataType} data</label>
        <select
          key={currentDataType}
          onChange={(event) => onChangeFunction(event)}
          multiple={isOneexercise ? false : true}
          size={
            uniqueExercises.length > selectHeight
              ? selectHeight
              : uniqueExercises.length
          }
          className={isOneexercise ? "no-arrow" : ""}
          defaultValue={[alphabeticalExercises[0]]}
        >
          {alphabeticalExercises.map((exerciseName) => (
            <option key={exerciseName} value={exerciseName}>
              {exerciseName}
            </option>
          ))}
        </select>
      </>
    )
  );
};

export default SelectExercises;
