import randomColor from 'randomcolor'
import tinycolor from 'tinycolor2'

export const getBg = () => randomColor({ luminosity: 'bright' })
export const textColors = randomColor({ luminosity: 'bright', count: 100 })
export const getReadable = (color: string) =>
  `${tinycolor.mostReadable(color, textColors, { includeFallbackColors: true })}`
