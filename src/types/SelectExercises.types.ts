export interface SelectExercisesProps {
  currentDataType: string;
  onChangeFunction: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeFunctionSingle: (value: string) => void;
  uniqueExercises: string[];
}
