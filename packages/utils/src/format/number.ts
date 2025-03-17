export function NumberToCommas(number: number | string | undefined) {
  const num = Number(number);

  if (isNaN(num)) {
    return '0';
  }
  return num.toLocaleString();
}

// ----------------------------------------------------------------------

export const CommasToNumber = (number = '') => {
  const num = Number(number.replace(/,/g, ''));

  if (isNaN(num)) {
    return 0;
  }

  return num;
};

// ----------------------------------------------------------------------

export function slicePriceMan(price: number) {
  const result = price.toString().split('');

  if (result.length > 5) {
    result.reverse().splice(0, 4);
    result.reverse();
    return result.join('') + '만';
  }

  return result.join('');
}

// ----------------------------------------------------------------------

export function EnterNumberOnly(value: string | number) {
  return value.toString().replace(/[^0-9]/g, '');
}

