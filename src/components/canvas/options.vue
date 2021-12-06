<template>
    <div class="options-container">
        <section class='draw-size-container' v-if="type === 'size'">
            <section v-for='item in sizeList' :key='item' :style="`width: ${item * 3}px;height: ${item * 3}px;`" :class="item === size ?  'size-dot active-dot' : 'size-dot'" @click="handleSizeChange(item)" ></section>
        </section>
        <section class='font-size-container' v-else>
            <a-select @change='handleFontSizeChange' style='width: 100px' :value='fontSize'>
                <a-select-option v-for='fontSize in fontSizeOptions' :key='fontSize.value'>{{fontSize.label}}</a-select-option>
            </a-select>
        </section>
        <section class="color-container">
            <color-checkbox-group @change='handleColorChange' :multiple="false" :color="color">
                <color-checkbox v-for="(item, index) in colorList" :key="index" :color="item" :value="index" />
            </color-checkbox-group>
        </section>
    </div>
</template>

<script>
import { ColorCheckbox } from './checkbox'
const ColorCheckboxGroup = ColorCheckbox.Group
import { SIZE_ENUM } from './enums'
    export default {
        data () {
            return {
                colors: '',
                sizeList: [SIZE_ENUM.small, SIZE_ENUM.middle, SIZE_ENUM.large],
                fontSizeOptions: [
                    {
                        label: '12px',
                        value: 12
                    },
                    {
                        label: '14px',
                        value: 14
                    },
                    {
                        label: '16px',
                        value: 16
                    },
                    {
                        label: '18px',
                        value: 18
                    },
                    {
                        label: '20px',
                        value: 20
                    },
                    {
                        label: '22px',
                        value: 22
                    },
                    {
                        label: '24px',
                        value: 24
                    },
                    {
                        label: '26px',
                        value: 26
                    },
                    {
                        label: '28px',
                        value: 28
                    },
                    {
                        label: '30px',
                        value: 30
                    },
                    {
                        label: '40px',
                        value: 40
                    },
                    {
                        label: '50px',
                        value: 50
                    }
                ],
                colorList: [
                    '#e6ccc8',
                    '#f5222d',
                    '#fa541c',
                    '#fadb14',
                    '#3eaf7c',
                    '#13c2c2',
                    '#1890ff',
                    '#722ed1',
                    '#eb2f96'
                ]
            }
        },
        components: {
            ColorCheckboxGroup,
            ColorCheckbox
        },
        props: {
            size: {
                type: Number,
            },
            color: {
                type: String,
                required: true
            },
            fontSize: {
                type: Number
            },
            type: {
                type: String,
                require: true,
            }
        },
        mounted() {
        },
        methods: {
            handleSizeChange(size) {
                this.$emit('onSizeChange', size)
            },
            handleFontSizeChange(val) {
                this.$emit('onFontSizeChange', val)
            },
            handleColorChange(values, colors) {
                this.$emit('onColorChange', colors[0])
            }
        }
    }
</script>

<style scoped>
.options-container {
    display: flex;
    height: 50px;
    border: 1px solid #d9d9d9;
    line-height: 50px;
    width: 407px;
    margin: 0 10px;
    border-radius: 4px;
    align-items: center;
}
.draw-size-container {
    display: flex;
    align-items: center;
}
.size-dot{
    background: #000;
    border-radius: 50%;
    margin-left: 4px;
    cursor: pointer;
}

.active-dot {
    background: #1890ff;
}

.font-size-container {
    margin-left: 5px;
}

.color-container {
    margin-left: 10px;
    height: 20px;
    line-height: 20px;
    font-weight: bold;
}
</style>