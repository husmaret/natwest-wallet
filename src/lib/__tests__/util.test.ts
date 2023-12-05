import { roundTo5centsAsString } from "../utils"


 
it('Test rounding method',async () => {
  const roundedPositive = roundTo5centsAsString(150.123456789)
  expect(roundedPositive).toBe("150.10")

  const roundedNegative = roundTo5centsAsString(-150.123456789)
  expect(roundedNegative).toBe("-150.10")

  const formatThousandSeparator = roundTo5centsAsString(15334530.77569)
  expect(formatThousandSeparator).toBe("15’334’530.80")

})