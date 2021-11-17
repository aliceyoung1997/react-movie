//time
export const calTime = time => {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return `${hours}H ${mins}mins`;
}

//currency

export const convertMoney = money => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  return formatter.format(money);
}