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
