<template>
    <div style="margin: 100px;">
        <canvas :width="width" :height="height" id="main" style="border: 5px solid pink"></canvas>
        <handler-comp 
            style="margin-top: 20px" 
            :status='drawStatus' 
            @statusChange='onDrawStatusChange' 
            :size='strokeSize' 
            :fontSize="fontSize"
            @handleImgChange='handleImgChange' 
            @onSizeChange='onSizeChange' 
            @onFontSizeChange='onFontSizeChange' 
            @onColorChange='onColorChange'
        />
        <a-modal :visible='previewModalVisible'  @ok='onClosePreviewModal'  @cancel='onClosePreviewModal' :width='600' title='预览' okText='下载' cancelText='取消'>
            <img :src="handleImg" alt="" class="preview-img">
        </a-modal>
    </div>
</template>

<script>
import {fabric} from 'fabric'
import HandlerComp from './handler.vue'
import statusHandler from './status-handler'
import defaultOptions from './defalutOptions'
import {STATUS_ENUM, SIZE_ENUM} from './enums'
import {throttle} from 'loadsh'
export default {
    data () {
        return {
            drawStatus: '',
            canvas: null,
            strokeSize: SIZE_ENUM.small,
            strokeColor: 'red',
            drawHandler: {
                rect: this.handleRect,
                draw: this.handleDraw,
                text: this.handleText,
                ellipse: this.handleEllipse,
                arrow: this.handleArrow,
                delete: this.handleDelete,
                clear: this.handleClear,
                preview: this.handlePreview
            },
            handleImg: '',
            previewModalVisible: false,
            fontSize: 16,
        }
    },
    props: {
        width: {
            type: Number,
            default: 1000
        },
        height: {
            type: Number,
            default: 1000
        }
    },
    components: {
        HandlerComp
    },
    mounted() {
        this.initCanvas();
    },
    destroyed() {
        this.canvas && this.canvas.off('mouse:down') && this.canvas.off('mouse:up') && this.canvas.off('mouse:move')
    },
    
    methods: {
        /**
         * @description: 初始化画布
         * @param {*}
         * @return {*}
         */        
        initCanvas(){
            this.canvas = new fabric.Canvas('main');
            this.canvas.selectable = false
            this.canvas.controlsAboveOverlay = true
            this.canvas.selection = false
            this.canvas.preserveObjectStacking = true 
            this.canvas.renderOnAddRemove = true;
        },

        /**
         * @description: 画笔状态变化
         * @param {*}
         * @return {*}
         */        
        onDrawStatusChange(value) {
            let notSetStatus = ['delete', 'clear', 'preview', 'picture']
            // 不需要按钮选中状态
            if(!notSetStatus.includes(value)) {
                this.drawStatus = value
            }
            this.canvas.isDrawingMode = false
            this.canvas.off('mouse:down')
            this.canvas.off('mouse:up')
            if(value !== 'picture') {
                this.drawHandler[value]()
            }
        },

        /**
         * @description: 处理矩形相关逻辑
         * @param {*}
         * @return {*}
         */        
        handleRect() {
            this.canvas.on('mouse:down', (options) => {
                let rectOptions = {
                    ...defaultOptions[STATUS_ENUM.rect],
                }
                this.handleDrawLock()
                console.log(rectOptions)
                let rect = statusHandler.rect(rectOptions)
                this.canvas.on('mouse:move', throttle(moveOptions => {
                    let width =  Math.abs(moveOptions.pointer.x - options.pointer.x)
                    let height =  Math.abs(moveOptions.pointer.y - options.pointer.y)
                    rect.setOptions({
                        ...rectOptions,
                        width,
                        height,
                        top: Math.min(moveOptions.pointer.y, options.pointer.y),
                        left:  Math.min(moveOptions.pointer.x, options.pointer.x),
                        strokeWidth: this.strokeSize,
                        stroke: this.strokeColor
                    })
                    this.canvas.add(rect)
                }, 50))
            })
            this.canvas.on('mouse:up', () => {
                this.canvas.off('mouse:move')
                this.canvas.off('mouse:down')
                this.handleDrawUnlock()
                this.drawStatus = ''
            })
        },

        /**
         * @description: 处理画笔逻辑
         * @param {*}
         * @return {*}
         */        
        handleDraw() {
            this.canvas.isDrawingMode = true
            this.canvas.freeDrawingBrush.color =  this.strokeColor

            this.canvas.freeDrawingBrush.width = this.strokeSize
        },

        /**
         * @description: 处理文本逻辑
         * @param {*}
         * @return {*}
         */        
        handleText() {
            this.canvas.on('mouse:down', (options) => {
                this.handleDrawLock()
                let text = statusHandler.text('请输入', {
                    ...defaultOptions[STATUS_ENUM.text],
                    fontSize: this.fontSize,
                    top: options.pointer.y,
                    left: options.pointer.x,
                    stroke: this.strokeColor,
                })
                text.bringToFront()
                this.canvas.add(text)
            })
            this.canvas.on('mouse:up', () => {
                this.drawStatus = ''
                this.handleDrawUnlock()
                this.canvas.off('mouse:down')
            })
        },
        
        /**
         * @description: 处理椭圆
         * @param {*}
         * @return {*}
         */        
        handleEllipse() {
            this.canvas.on('mouse:down', (options) => {
                let ellipseOptions = {
                    ...defaultOptions[STATUS_ENUM.ellipse],
                }
                let ellipse = statusHandler.ellipse(ellipseOptions)
                this.handleDrawLock()
                this.canvas.on('mouse:move', throttle(moveOptions => {
                    let rx =  (Math.abs(moveOptions.pointer.x - options.pointer.x) )/ 2
                    let ry =  (Math.abs(moveOptions.pointer.y - options.pointer.y)) / 2
                    ellipse.setOptions({
                        ...ellipseOptions,
                        rx,
                        ry,
                        top: Math.min(moveOptions.pointer.y, options.pointer.y),
                        left:  Math.min(moveOptions.pointer.x, options.pointer.x),
                        strokeWidth: this.strokeSize,
                        stroke: this.strokeColor,
                    })
                    this.canvas.add(ellipse)
                }, 50))
            })
            this.canvas.on('mouse:up', () => {
                this.canvas.off('mouse:move')
                this.canvas.off('mouse:down')
                this.handleDrawUnlock()
                this.drawStatus = ''
            })
        },

        /**
         * @description: 处理箭头
         * @param {*}
         * @return {*}
         */        
        handleArrow() {
            this.canvas.on('mouse:down', (options) => {
                let arrowOptions = {
                    ...defaultOptions.arrow,
                    
                }
                this.handleDrawLock()
                let arrow = new fabric.Path('', {
                    ...arrowOptions
                })
                this.canvas.on('mouse:move', moveOptions => {
                    arrow && this.canvas.remove(arrow);
                    arrow = new fabric.Path(statusHandler.arrow(options.pointer, moveOptions.pointer), {
                        ...arrowOptions,
                        strokeWidth: this.strokeSize,
                        stroke: this.strokeColor,
                        fill: this.strokeColor,
                    })
                    this.canvas.add(arrow)
                })
            })
            this.canvas.on('mouse:up', () => {
                this.canvas.off('mouse:move')
                this.canvas.off('mouse:down')
                this.handleDrawUnlock()
                this.drawStatus = ''
            })
        },

        /**
         * @description: 删除选中的
         * @param {*}
         * @return {*}
         */        
        handleDelete() {
            console.log(this.canvas.getActiveObjects())
            this.canvas.remove(...this.canvas.getActiveObjects())
        },

        /**
         * @description: 清空画布
         * @param {*}
         * @return {*}
         */        
        handleClear() {
            this.canvas.remove(...this.canvas.getObjects())
        },

        /**
         * @description: 画图过程中禁止移动其他模块
         * @param {*}
         * @return {*}
         */        
        handleDrawLock() {
            this.canvas.getObjects().forEach(item => {
                item.lockMovementX = true
                item.lockMovementY = true
                item.lockRotation  = true
                item.lockScalingX = true
                item.lockScalingY = true
                item.selectable = false
                item.hasControls = false
                item.hasBorders = false
                item.perPixelTargetFind = true
            })
        },

        /**
         * @description: 画图完成后解锁
         * @param {*}
         * @return {*}
         */        
        handleDrawUnlock() {
            this.canvas.getObjects().forEach(item => {
                item.lockMovementX = false
                item.lockMovementY = false
                item.lockRotation  = false
                item.lockScalingX = false
                item.lockScalingY = false
                item.selectable = true
                item.hasControls = true
                item.hasBorders = true
                item.perPixelTargetFind = false
            })
        },

        /**
         * @description: 处理预览
         * @param {*}
         * @return {*}
         */        
        handlePreview() {
            let canvasObjects = this.canvas.getObjects()
            if( !canvasObjects ||  canvasObjects.length === 0) {
                this.$message.error('暂无内容预览')
                return
            }
            this.handleImg = this.canvas.toDataURL({
                formart: "png",
                multiplier: 1,
            });
            this.previewModalVisible = true
        },

        /**
         * @description: 关闭预览弹窗
         * @param {*}
         * @return {*}
         */            
        onClosePreviewModal() {
            this.previewModalVisible = false
        },

        /**
         * @description: 将图片转化成base64
         * @param {*} img
         * @param {*} callback
         * @return {*}
         */        
        getBase64(img, callback) {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(img);
        },

        /**
         * @description: 处理图片相关
         * @param {*} file
         * @return {*}
         */        
        handleImgChange(file) {
            this.getBase64(file, imageUrl => {
                fabric.Image.fromURL(imageUrl, oImg => {
                    oImg.scale(0.5) // 缩放
                    oImg.sendToBack()
                    this.canvas.add(oImg) // 将图片加入到画布
                })
            });
        },
        /**
         * @description: 处理size变化
         * @param {*} value
         * @return {*}
         */        
        onSizeChange(value) {
            this.strokeSize = value
            if(this.drawStatus === 'draw') {
                this.handleDraw()
            }
        },

        /**
         * @description: 处理fontSize变化
         * @param {*} value
         * @return {*}
         */ 
        onFontSizeChange(value) {
            this.fontSize = value
        },

        onColorChange(value) {
            this.strokeColor = value
            if(this.drawStatus === 'draw') {
                this.handleDraw()
            }
        }
    }
}
</script>

<style scoped>
.preview-img {
    width: 500px;
    height: 500px;
}
</style>