import { fabric } from 'fabric'
export default function getRectContainer(options) {
  let rect = new fabric.Rect({
    ...options,
  })
  return rect
}
