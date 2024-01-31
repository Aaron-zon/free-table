import { computed } from 'vue';
import { freeTableWidth } from './useResize';

export const useCheck = (props) => {
    /**
     * 判断是否存在左侧的固定列
     */
    const fixedLeftCheck = computed(() => {
        return props.columns.some((column) => {
            return column.fixed === 'left' || column.fixed === true;
        })
    })

    /**
     * 判断是否存在右侧的固定列
     */
    const fixedRightCheck = computed(() => {
        return props.columns.some((column) => {
            return column.fixed === 'right';
        })
    })

    /**
     * 判断是否显示右侧滚动条
     */
    const leftScrollCheck = computed(() => {
        const height = props.rowHeight * props.dataSource.length;
        return props?.scroll?.y && height > props.scroll.y
    })

    /**
     * 判断是否显示底部滚动条
     */
    const bottomScrollCheck = computed(() => {
        const width = freeTableWidth.value;
        return props?.scroll?.x && width < props.scroll.x;
    })


    return {
        fixedLeftCheck,
        fixedRightCheck,
        leftScrollCheck,
        bottomScrollCheck
    }
}