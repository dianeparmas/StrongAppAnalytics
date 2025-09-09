interface DataRow {
  Date: string;
  [key: string]: any;
}

export const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDateString = (dateString: string)  =>{
  // remove leading apostrophe if present
  let cleanDateString = dateString;
  if (cleanDateString.startsWith("'")) {
    cleanDateString = cleanDateString.substring(1);
  }

  // input format is 'DD/MM/YYYY'
  const parts = cleanDateString.split('/');
  const day = parts[0].padStart(2, '0');
  const month = parts[1].padStart(2, '0');
  const year = parts[2];

  return `${year}-${month}-${day} 00:00:00`;
}

export const extractWorkoutDates = (dataArray: DataRow[]): string[] => {
  return dataArray.map((row) => row.Date.split(" ")[0]);
}

export const extractUniqueWorkoutDates = (dataArray: DataRow[]): string[] => {
  const allWorkoutDates = dataArray.map((row) => row.Date.split(" ")[0]);
  return [...new Set(allWorkoutDates)];
}