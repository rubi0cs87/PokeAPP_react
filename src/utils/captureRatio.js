export const calculateCaptureRate = (
  hpMax,
  hpCurrent,
  captureRate,
  statusModifier,
  ballModifier,
) => {
  const a =
    (((3 * hpMax - 2 * hpCurrent) * captureRate * ballModifier) / (3 * hpMax)) *
    statusModifier;
  if (a >= 255) return 100;
  const percentage = (a / 255) * 100;
  return percentage.toFixed(2);
};
