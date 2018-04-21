// @flow
export function isVisa(number: string): boolean {
  return number[0] === "4";
}

export function isAmEx(number: string): boolean {
  return number.slice(0, 2) === "34" || number.slice(0, 2) === "37";
}

export function isKnownCreditVendor(number: string): boolean {
  if (number.length < 2) {
    return true;
  }
  return isVisa(number) || isAmEx(number);
}
