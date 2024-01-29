import { computed } from 'vue'
export const useCheck = (props) => {
    const fixedLeftCheck = computed(() => {
        return props.columns.some((column) => {
            return column.fixed === 'left' || column.fixed === true;
        })
    })
    const fixedRightCheck = computed(() => {
        return props.columns.some((column) => {
            return column.fixed === 'right';
        })
    })

    return {
        fixedLeftCheck,
        fixedRightCheck,
    }
}