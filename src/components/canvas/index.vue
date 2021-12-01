<!--
 * @Author: your name
 * @Date: 2021-12-01 17:13:17
 * @LastEditTime: 2021-12-01 18:35:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /canvas/src/components/canvas/index.vue
-->
<template>
    <div style="margin: 100px;">
        <canvas width="1000" height="1000" id="main" style="border: 5px solid pink"></canvas>
    </div>
</template>

<script>
import {fabric} from 'fabric'
import arrowGroup from './arrow';
export default {
    data () {
        return {
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData(){
            var canvas = new fabric.Canvas('main');
            var rect = new fabric.Rect({
                left: 400,
                top: 500,
                fill: '#f0f',
                width: 30,
                height: 30
            })
            canvas.add(rect);
            fabric.Image.fromURL(require('../../assets/logo.png'), function(oImg) {
                oImg.scale(1);//图片缩小10倍
                canvas.add(oImg);
            })
            let line = new fabric.Line([
                10, 10, // 起始点坐标
                200, 300 // 结束点坐标
                ],
                {
                stroke: 'red', // 笔触颜色
                })
            canvas.add(line)
            let text = new fabric.IText('测试webbenijdq', {
                left: 0,
                top: 200,
                fontSize: 50, //字号
                fontWeight: 400, //字体粗细,可以使用关键字（“normal”，“bold”）或数字（100,200,400,600,800）
                fontStyle: "italic", //字体风格,normal（正常）或italic（斜体）
                stroke: "#c3bfbf", //描边的颜色
                strokeWidth: 1, //描边的宽度
                textAlign: "center", //文本对齐方式
                lineHeight: 1.5, //行高
                textBackgroundColor: "#91A8D0", //文本背景颜色
                editingBorderColor: 'green',
                hasControls: true,
            })
            canvas.add(text);
            canvas.add(arrowGroup)
            console.log(canvas)
            console.log(JSON.parse(JSON.stringify(canvas)))
        },
    }
}
</script>

<style lang='less' scoped>

 
</style>