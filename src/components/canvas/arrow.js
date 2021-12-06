export default function getArrowPath(from, to) {
  const theta = 30 * 1
  const headlen = 15 * 1
  const angle = ((Math.atan2(from.y - to.y, from.x - to.x) * 180) / Math.PI) * 1
  const angle1 = (((angle + theta) * Math.PI) / 180) * 1
  const angle2 = (((angle - theta) * Math.PI) / 180) * 1
  const topX = headlen * Math.cos(angle1)
  const topY = headlen * Math.sin(angle1)
  const botX = headlen * Math.cos(angle2)
  const botY = headlen * Math.sin(angle2)

  let arrowX = from.x - topX
  let arrowY = from.y - topY

  let path = ' M ' + from.x + ' ' + from.y
  path += ' L ' + to.x + ' ' + to.y
  arrowX = to.x + topX
  arrowY = to.y + topY
  path += ' M ' + arrowX + ' ' + arrowY
  path += ' L ' + to.x + ' ' + to.y
  arrowX = to.x + botX
  arrowY = to.y + botY
  path += ' L ' + arrowX + ' ' + arrowY
  return path
}
