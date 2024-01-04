export function converterHexadecimalToRgb(colorHexadecimal: string) {
  const colorConverted = colorHexadecimal.replace('#', '')
  const colorParse = parseInt(colorConverted, 16)
  const r = (colorParse >> 16) & 255
  const g = (colorParse >> 8) & 255
  const b = colorParse & 255

  return 'rgba(' + r + ', ' + g + ', ' + b + ',1)'
}

function ColorToHex(color: number) {
  const hexadecimal = color.toString(16)
  return hexadecimal.length === 1 ? '0' + hexadecimal : hexadecimal
}

export function ConvertRGBtoHex(color: string) {
  if (color !== undefined) {
    const replaceColor = color.replace('rgba(', '').replace(')', '').split(',')

    const red = parseInt(replaceColor[0])
    const green = parseInt(replaceColor[1])
    const blue = parseInt(replaceColor[2])

    return '#' + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue)
  } else {
    return '#ffffff'
  }
}
