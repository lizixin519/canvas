import { fabric } from 'fabric'
export default function getITextContainer(text, options) {
  return new fabric.IText(text, {
    ...options,
  })
}
