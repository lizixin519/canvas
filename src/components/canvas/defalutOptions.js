import { SIZE_ENUM } from './enums'
export default {
  rect: {
    strokeWidth: SIZE_ENUM.small,
    stroke: 'red',
    fill: 'rgba(256, 256, 256, 0)',
    // hasBorders: false,
  },
  text: {
    fontSize: 20, //字号
    fontWeight: 'normal', //字体粗细,可以使用关键字（“normal”，“bold”）或数字（100,200,400,600,800）
    fontStyle: 'normal', //字体风格,normal（正常）或italic（斜体）
    textAlign: 'left', //文本对齐方式
    lineHeight: 1.5, //行高
    hasControls: true,
  },
  ellipse: {
    strokeWidth: SIZE_ENUM.small,
    stroke: 'red',
    fill: 'rgba(256, 256, 256, 0)',
  },
  arrow: {
    fill: 'red',
    stroke: 'red',
    strokeWidth: SIZE_ENUM.small,
  },
}
