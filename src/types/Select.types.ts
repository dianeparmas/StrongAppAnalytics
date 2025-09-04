export interface SelectProps {
  currentDataType: string;
  onChangeFunction: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeFunctionSingle: (value: string) => void;
  uniqueExercises: string[];
}
