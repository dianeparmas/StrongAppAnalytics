import { useEffect } from "react";

import { SelectExercisesProps } from "../../types/SelectExercises.types";

import "./SelectExercises.css";

const SelectExercises = ({
  currentDataType,
  uniqueExercises,
  onChangeFunction,
  onChangeFunctionSingle,
}: SelectExercisesProps) => {
  useEffect(() => {
    if (uniqueExercises.length === 1) {
      onChangeFunctionSingle(uniqueExercises[0]);
    }
  }, [uniqueExercises]);

  useEffect(() => {
    console.log("mount");
    onChangeFunctionSingle(uniqueExercises[0]);
  }, []);

  const isOneexercise = uniqueExercises.length === 1;
  const selectHeight = 6;

  return (
    !isOneexercise &&
    uniqueExercises.length && (
      <>
        <label>Select 1 or more exercises from {currentDataType} data</label>
        <select
          onChange={(event) => onChangeFunction(event)}
          multiple={isOneexercise ? false : true}
          size={
            uniqueExercises.length > selectHeight
              ? selectHeight
              : uniqueExercises.length
          }
          className={isOneexercise ? "no-arrow" : ""}
          // defaultValue={isOneexercise ? uniqueExercises[0] : undefined}
          defaultValue={[uniqueExercises[0]]}
        >
          {uniqueExercises
            .sort((a, b) => a.localeCompare(b))
            .map((exerciseName) => (
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
