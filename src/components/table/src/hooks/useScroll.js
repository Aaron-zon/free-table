import { computed } from 'vue';
import { freeTableWidth } from './useResize';
import { useCheck } from './useCheck';



export const useScroll = (props, freeTableHeaderRef, freeTableBodyRef, horizontalScrollRef, bodyVerticalScrollRef) => {
    const { leftScrollCheck } = useCheck(props);

    /**
     * X轴滚动条滚动时
     */
    const horizontalScroll = () => {
        freeTableHeaderRef.value.scrollLeft = horizontalScrollRef.value.scrollLeft;
        freeTableBodyRef.value.scrollLeft = horizontalScrollRef.value.scrollLeft;
    }

    /**
     * X轴滚动条容器样式
     */
    const horizontalScrollViewportStyles = computed(() => {
        let styles = {
            'overflow-x': 'hidden',
            'overflow-y': 'hidden',
            'width': '100%',
            'max-height': `${props.scrollMeasure}px`,
            'min-height': `${props.scrollMeasure}px`,
            'height': `${props.scrollMeasure}px`,
        };
        let width = freeTableWidth.value;
        if (props?.scroll?.x && width < props.scroll.x && width != 0) {
            styles['overflow-x'] = 'scroll';
            if (leftScrollCheck) {
                styles['width'] = `${width - props.scrollMeasure}px`;
            } else {
                styles['width'] = `${width}px`;
            }
        }

        return styles;
    })

    /**
     * X轴滚动条内容部分样式
     */
    const horizontalScrollContainerStyles = computed(() => {
        let width = freeTableWidth.value;
        if (props?.scroll?.x && props.scroll.x > width) {
            width = props?.scroll?.x;
        }
        if (props?.scroll?.y && props?.scroll?.y > 0) {
            width = width - props.scrollMeasure;
        }
        return {
            'width': `${width}px`,
            'min-width': `${width}px`,
            'max-width': `${width}px`,
            'height': `${props.scrollMeasure}px`,
            'min-height': `${props.scrollMeasure}px`,
            'max-height': `${props.scrollMeasure}px`,
        }
    })

    /**
     * Y轴滚动条滚动时
     */
    const bodyVerticalScroll = () => {
        freeTableBodyRef.value.scrollTop = bodyVerticalScrollRef.value.scrollTop;
    }
    /**
     * Y轴滚动条容器样式
     */
    const bodyVerticalScrollViewportStyle = computed(() => {
        let styles = {
            'overflow-y': 'hidden',
            'overflow-x': 'hidden',
            'max-width': `${props.scrollMeasure}px`,
            'min-width': `${props.scrollMeasure}px`,
            'width': `${props.scrollMeasure}px`,
        };
        if (props?.scroll?.y && props.scroll.y < props.rowHeight * props.dataSource.length) {
            const height = props.scroll.y;
            styles['height'] = `${height}px`
            styles['overflow-y'] = 'scroll';
        }
        return styles;
    })

    /**
     * Y轴滚动条内容部分样式
     */
    const bodyScrollStyles = computed(() => {
        let styles = {};
        if (props?.scroll?.y && props.scroll.y > 0) {
            const height = props.rowHeight * props.dataSource.length + props.scrollMeasure;
            styles['height'] = `${height}px`;
            styles['min-height'] = `${height}px`;
            styles['max-height'] = `${height}px`;

            styles['width'] = `${props.scrollMeasure}px`;
            styles['min-width'] = `${props.scrollMeasure}px`;
            styles['max-width'] = `${props.scrollMeasure}px`;
        }
        return styles;
    })

    /**
     * Y轴滚动
     * @param {*} event 
     */
    const tableWheel = (event) => {
        bodyVerticalScrollRef.value.scrollTop += event.deltaY;
        freeTableBodyRef.value.scrollTop += event.deltaY;
        event.preventDefault();
    }

    /**
     * free-table-vertical-scroll 样式
     */
    const verticalScrollStyles = computed(() => {
        return {
            'max-width': `${props.scrollMeasure}px`,
            'min-width': `${props.scrollMeasure}px`,
            'width': `${props.scrollMeasure}px`,
        };
    })

    /**
     * free-table-horizontal-scroll 样式
     */
    const horizontalScrollStyles = computed(() => {
        return {
            'width': '100%',
            'max-height': `${props.scrollMeasure}px`,
            'min-height': `${props.scrollMeasure}px`,
            'height': `${props.scrollMeasure}px`,
        };
    })

    /**
     * free-table-horizontal-scroll-fill 样式
     */
    const horizontalScrollFillStyles = computed(() => {
        let width = 0;
        if (leftScrollCheck.value) {
            width = props.scrollMeasure;
        }
        return {
            'width': `${width}px`
        };
    })

    return {
        horizontalScroll,
        horizontalScrollViewportStyles,
        horizontalScrollContainerStyles,
        bodyVerticalScroll,
        bodyVerticalScrollViewportStyle,
        bodyScrollStyles,
        tableWheel,
        verticalScrollStyles,
        horizontalScrollStyles,
        horizontalScrollFillStyles
    }
}