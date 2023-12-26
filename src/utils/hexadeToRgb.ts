export function converterHexadecimalToRgb(colorHexadecimal: string) {
  const colorConverted = colorHexadecimal.replace('#', '')
  const colorParse = parseInt(colorConverted, 16)
  const r = (colorParse >> 16) & 255
  const g = (colorParse >> 8) & 255
  const b = colorParse & 255

  return 'rgb(' + r + ', ' + g + ', ' + b + ')'
}
