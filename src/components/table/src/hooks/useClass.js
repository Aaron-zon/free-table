import { computed } from 'vue';

export const useClass = (props) => {

    const freeTableClass = computed(() => {
        
        return {
            'free-table-stripe': props.stripe
        }
    })

    /**
     * 设置表头列的class
     * @param {*} idx 
     */
    const tableCellBoxClass = (idx) => {
        let className = 'free-table-cell-box';
        if (idx == props.columns.length - 1 && !props?.scroll?.y) {
            className = '';
        }
        return className;
    }

    /**
     * 为当前行设置奇数或偶数标识
     * @param {*} idx 
     * @returns 
     */
    const oddOrEvenClass = (idx) => {

        return {
            'free-table-row-odd': idx % 2 != 0,
            'free-table-row-even': idx % 2 == 0,
        }

    }

    return {
        freeTableClass,
        tableCellBoxClass,
        oddOrEvenClass
    }
}