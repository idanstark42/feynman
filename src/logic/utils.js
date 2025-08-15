export const fillDigits = (number, digits) => {
  const numberAsString = String(number)
  if (numberAsString.length >= digits) {
    return numberAsString
  }
  return numberAsString.padStart(digits, '0')
}
