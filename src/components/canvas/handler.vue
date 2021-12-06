<template>
    <div>
        <a-radio-group button-style="solid" @change="onDrawStatusChange" :value='status'>
            <a-radio-button value="rect">
                <a-tooltip title='矩形'>
                    <a-icon type="plus-square" />
                </a-tooltip>
            </a-radio-button>
            <a-radio-button value="ellipse">
                <a-tooltip title='椭圆'>
                    <a-icon type="plus-circle" />
                </a-tooltip>
            </a-radio-button>
            <a-radio-button value="arrow">
                <a-tooltip title='箭头'>
                    <a-icon type="arrow-right" />
                </a-tooltip>
            </a-radio-button>
            <a-radio-button value="text">
                <a-tooltip title='文本'>
                    <a-icon type="font-size" />
                </a-tooltip>
            </a-radio-button>
            <a-radio-button value="draw">
                <a-tooltip title='画笔'>
                    <a-icon type="edit" />
                </a-tooltip>
            </a-radio-button>
            <a-radio-button value="delete">
                <a-tooltip title='删除选中'>
                    <a-icon type="delete" />
                </a-tooltip>
            </a-radio-button>
            <a-radio-button value="clear">
                <a-tooltip title='清空画布'>
                    <a-icon type="delete" />
                </a-tooltip>
            </a-radio-button>
            <a-radio-button value="picture">
            <a-upload
                    name="file"
                    :multiple="true"
                    :before-upload="handleImgChange"
                    :showUploadList='false'
                >
                    <a-tooltip title='上传图片'>
                        <a-icon type='picture' />
                    </a-tooltip>
                </a-upload>
            </a-radio-button>
            <a-radio-button value="preview">
                <a-tooltip title='预览'>
                    <a-icon type="eye" />
                </a-tooltip>
            </a-radio-button>
        </a-radio-group>
        <options-container v-if='status' @onSizeChange='onSizeChange' @onFontSizeChange='onFontSizeChange' :size="size" :fontSize='fontSize' :type='type' color='color' @onColorChange='onColorChange' class="options-container"></options-container>
    </div>
</template>

<script>
import OptionsContainer from './options.vue'
    export default {
        data () {
            return {
                type: 'size'
            }
        },
        components: {
            OptionsContainer
        },
        props: {
            status: {
                required: false,
                type: String
            },
            size: {
                required: true,
                type: Number
            },
            fontSize: {
                required: true,
                type: Number
            },
            color: {
                type: String
            }
        },
        methods: {
            /**
             * @description: 处理画板状态
             * @param {*} e
             * @return {*}
             */            
            onDrawStatusChange(e) {
                if(e.target.value === 'text') {
                    this.type = 'text'
                } else {
                    this.type = 'size'
                }
                this.$emit('statusChange', e.target.value)
            },
            
            /**
             * @description: 处理上传图片
             * @param {*} file
             * @return {*}
             */            
            handleImgChange(file) {
                this.$emit('handleImgChange', file)
                return false
            },
            /**
             * @description: 监听size变化
             * @param {*} value
             * @return {*}
             */            
            onSizeChange(value) {
                this.$emit('onSizeChange', value)
            },
            /**
             * @description: 监听font-size变化
             * @param {*} value
             * @return {*}
             */            
            onFontSizeChange(value) {
                this.$emit('onFontSizeChange', value)
            },
            /**
             * @description: 监听颜色变化
             * @param {*} value
             * @return {*}
             */            
            onColorChange(value) {
                this.$emit('onColorChange', value)
            }
        }
    }
</script>

<style scoped>
.btn-style {
    width: 45px;
    height: 32px;
    font-size: 14px;
    padding: 0 15px;
    border: 1px solid #d9d9d9;
    border-left: none;
}
.options-container {
    margin: 10px auto 0;
}
</style>
