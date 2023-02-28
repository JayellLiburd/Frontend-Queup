const backgroundColor = 'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #f99185 52%, #cf556c 78%, #b12a5b 100%)'
const getColor = (color: string) => {
  const newColor = color.split(' ').filter((item) => item.includes('#'))
  console.log(newColor)
  if (newColor.length % 2 === 0) {
    return newColor[newColor.length / 2 - 1]
  } else return newColor[newColor.length / 2 - 0.5]
}
const color = getColor(backgroundColor)
console.log(color)
debugger