import { computed } from 'vue';
import { checkNumberOrString } from './utils';
import { freeTableWidth } from './useResize';
import { useCheck } from './useCheck';

export const useStyles = (props) => {

    const { rightScrollCheck, bottomScrollCheck } = useCheck(props);

    /**
     * free-table-container 的样式
     */
    const tableStyles = computed(() => {
        const hasFixedColumn = props.columns.some(column => column.fixed === 'left' || column.fixed === true);
        return {
            'free-table-ping-left': hasFixedColumn,
            'free-table-no-ping': !hasFixedColumn,
        }
    })

    /**
     * free-table-fix-right 的样式
     */
    const tableFixRightStyles = computed(() => {
        let right = 0;

        if (rightScrollCheck.value && bottomScrollCheck.value) {
            right = props.scrollMeasure;
        }

        if (props?.scroll?.y) {
            return {
                'right': `${right}px`
            }
        }
    })

    /**
     * free-table-center-viewport
     * 表头样式
     */
    const headerCenterViewportStyles = computed(() => {
        return {
            'height': `${props.headerHeight}px`
        }
    })

    /**
     * 计算每列的宽度
     */
    const calculateColumnWidths = computed(() => {
        let width = freeTableWidth.value;
        if (props?.scroll?.x && props.scroll.x > width) {
            width = props?.scroll?.x;
        }
        if (props?.scroll?.y && props?.scroll?.y > 0 && rightScrollCheck.value) {
            width = width - props.scrollMeasure;
        }
        // 自定义宽度的列的个数
        let customWidthNum = 0;
        // 列设定
        const columns = props.columns;
        // 每列的宽度
        const columnWidths = {};
        // 对自定义宽度的列进行处理
        let totalColumnWidth = 0;

        columns.forEach((column) => {
            const checkResult = checkNumberOrString(column?.width);
            if (checkResult === 'Number' || checkResult == 'String') {
                width -= column.width;
                column.customWidth = true;
                customWidthNum++;
            }
        })

        // 为每列设置宽度
        columns.forEach((column) => {
            if (column.customWidth) {
                columnWidths[column.dataIndex] = column.width;
            } else {
                columnWidths[column.dataIndex] = width / (columns.length - customWidthNum);
            }
            totalColumnWidth += columnWidths[column.dataIndex];
        })

        return columnWidths;
    })

    /**
     * free-table-center 的样式
     */
    const tableCenterStyles = computed(() => {
        let height = props.rowHeight * props.dataSource.length;
        return {
            'height': `${height}px`
        }
    })

    /**
     * 计算free-table-center-container的样式
     */
    const tableCenterContainerStyles = computed(() => {
        let width = 0;
        let height = props.rowHeight * props.dataSource.length;
        props.columns.forEach((column) => {
            if (!column.fixed) {
                width += calculateColumnWidths.value[column.dataIndex];
            }
        })
        return {
            'width': `${width}px`,
            'height': `${height}px`
        }
    })

    /**
     * 计算free-table-body的样式
     */
    const tableBodyStyles = computed(() => {
        let styles = {};
        if (props?.scroll?.y) {
            styles['max-height'] = `${props.scroll.y}px`;
            styles['min-height'] = `${props.scroll.y}px`;
        }

        return styles;

    })

    const cellShadowStyles = computed(() => {
        return {
            'height': `${props.rowHeight}px`
        }
    })

    const rowStyles = computed(() => {
        return {
            'height': `${props.rowHeight}px`
        }
    })

    /**
     * 表头列样式
     * @param {*} col 
     */
    const columnStyles = (col) => {
        return {
            'width': `${calculateColumnWidths.value[col['dataIndex']]}px`,
        }
    }

    /**
     * body部分free-table-cell的样式
     */
    const bodycellStyles = computed(() => {
        return {
            'height': `${props.rowHeight}px`
        }
    })

    return {
        tableStyles,
        tableFixRightStyles,
        headerCenterViewportStyles,
        calculateColumnWidths,
        tableCenterStyles,
        tableCenterContainerStyles,
        tableBodyStyles,
        cellShadowStyles,
        rowStyles,
        columnStyles,
        bodycellStyles
    }
}