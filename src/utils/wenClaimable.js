export const wenClaimable = (time) => {
  if (time === 0) return "not in the forge";
  const blockTime = time * 1000;
  const minForgePeriod = 30 * 24 * 60 * 60 * 1000;
  const claimDate = blockTime + minForgePeriod;

  const claimTime =
    Date.now() > claimDate
      ? "claimable now"
      : `claimable ${new Date(claimDate).toLocaleString()}`;

  return claimTime;
};
