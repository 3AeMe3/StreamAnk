export const vote_avergate = (vote: number, icon: string) => {
  const converToString = String(vote).slice(0, 3);
  return ` ${icon} ${converToString}`;
};
