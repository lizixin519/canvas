import { fabric } from 'fabric'
export default function getEllipseContainer(options) {
  return new fabric.Ellipse({
    ...options,
  })
}
