<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
import { reactive, ref, onMounted, computed } from '@vue/composition-api'
export default {
    name: 'svgIcon',
    //props: ['iconClass', 'className'],
    props: {
        // 分页
        iconClass: {
            type: String,
            default: '',
        },
        className: {
            type: String,
            default: '',
        }
    },
    setup(props) {
        const msg = ref("2222");
        
        //计算属性，得出最终结果并返回
        const iconName = computed(() => `#icon-${props.iconClass}`)

        const svgClass = computed(() => {
            if(props.className) {
                return `svg-icon ${props.className}`
            }else {
                return `svg-icon`
            }
        })
        return {
            msg,
            svgClass,
            iconName
        }
    }
}
</script>
<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
}
</style>