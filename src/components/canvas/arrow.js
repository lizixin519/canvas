import { fabric } from 'fabric'

let line = new fabric.Line(
  [
    10,
    10, // 起始点坐标
    100,
    100, // 结束点坐标
  ],
  {
    stroke: 'red', // 笔触颜色
  }
)
let triangle = new fabric.Triangle({
  top: 0,
  left: 0,
  width: 20, // 底边长度
  height: 20, // 底边到对角的距离
  fill: 'red',
  angle: 90,
  originX: 0.5,
  originY: 0.5,
})
triangle.lockScalingX = true
triangle.lockScalingY = true
const arrowGroup = new fabric.Group([triangle, line])
export default arrowGroup
