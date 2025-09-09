export const getLabelRotation = (labelsArray: number) => {
  if (labelsArray <= 10) {
    return 0;
  } else if (labelsArray > 10 && labelsArray <= 20) {
    return 30;
  } else if (labelsArray > 20 && labelsArray <= 25) {
    return 45;
  } else {
    return 90;
  }
};

export const getChartWidth = (labelsArray: number): string => {
  if (labelsArray <= 10) {
    return "200%";
  } else if (labelsArray > 10 && labelsArray <= 25) {
    return "220%";
  } else if (labelsArray > 25 && labelsArray <= 50) {
    return "250%";
  } else {
    return "300%";
  }
};
