<script setup>
import { ref, onMounted, computed } from 'vue';
import { useScroll } from './hooks/useScroll';
import { useStyles } from './hooks/useStyles';
import { useClass } from './hooks/useClass';
import { useResize } from './hooks/useResize';
import { useCheck } from './hooks/useCheck';


defineOptions({
    name: 'FTable'
});

const props = defineProps({
    columns: {
        type: Array,
        required: true,
    },
    dataSource: {
        type: Array,
        required: true,
    },
    scroll: {
        type: Object,
    },
    height: {
        type: Number,
    },
    // 表头高度
    headerHeight: {
        type: Number,
        default: 55,
    },
    // 行高
    rowHeight: {
        type: Number,
        default: 50,
    },
    // 滚动条尺寸设置
    scrollMeasure: {
        type: Number,
        default: 17,
    },
    // 吸顶
    sticky: {
        type: Boolean,
        default: false
    },
    // 斑马纹
    stripe: {
        type: Boolean,
        default: false
    }
});

// Free Table
const freeTableRef = ref(null);
// Header
const freeTableHeaderRef = ref(null);
// Body
const freeTableBodyRef = ref(null);
// X轴滚动条
const horizontalScrollRef = ref(null);
// Y轴滚动条
const bodyVerticalScrollRef = ref(null);

onMounted(() => {
    if (props.height && props?.scroll?.y) {
        props.scroll.y = props.height;
    }

    resizeObserve(freeTableRef.value);
    
    return () => {
        resizeDisconnect();
    };
})

const { resizeObserve, resizeDisconnect } = useResize(freeTableRef);

const {
    horizontalScroll, 
    horizontalScrollViewportStyles,
    horizontalScrollStyles,
    bodyVerticalScroll,
    bodyVerticalScrollViewportStyle,
    bodyScrollStyles,
    tableWheel,
    verticalScrollStyles,
    horizontalScrollContainerStyles,
    horizontalScrollFillStyles,
} = useScroll(props, freeTableHeaderRef, freeTableBodyRef, horizontalScrollRef, bodyVerticalScrollRef);

const {
    tableStyles,
    tableFixRightStyles,
    headerCenterViewportStyles,
    tableCenterStyles,
    tableCenterContainerStyles,
    tableBodyStyles,
    cellShadowStyles,
    rowStyles,
    columnStyles,
    bodycellStyles
} = useStyles(props);

const { 
    tableCellBoxClass, 
    freeTableClass,
    oddOrEvenClass
} = useClass(props);

const {
    fixedRightCheck,
    rightScrollCheck
} = useCheck(props);

</script>

<template>
    
    <div class="free-table-container" ref="freeTableRef" :class="tableStyles">
        <div class="free-table free-table-loading" :class="freeTableClass">
            <!-- Header -->
            <div class="free-table-header" :class="{'free-table-sticky-header': props.sticky}" ref="freeTableHeaderRef">
                <div class="free-table-center-viewport" :style="headerCenterViewportStyles">
                    
                    <div class="free-table-fix-left">
                        <template v-for="(col, idx) in columns" :key="idx" >
                            <div class="free-table-left-cell free-table-cell" v-if="col.fixed === true || col.fixed == 'left'" :style="[columnStyles(col)]">
                                <span class="free-table-column-title" :class="[tableCellBoxClass(idx)]">
                                    <div class="free-table-header-cell-title">
                                        <div class="free-table-header-cell-title-inner">
                                            {{ col.title }}
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </template>

                        <div class="free-table-cell-shadow-left"></div>
                    </div>

                    <div class="free-table-center">
                        <div class="free-table-center-container">
                            <template v-for="(col, idx) in columns" :key="idx" >
                                <div class="free-table-cell" 
                                    v-if="!col.fixed"
                                    :style="[columnStyles(col)]"
                                >
                                    <span class="free-table-column-title" :class="[tableCellBoxClass(idx)]">
                                        <div class="free-table-header-cell-title">
                                            <div class="free-table-header-cell-title-inner">
                                                {{ col.title }}
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </template>
                        </div>
                    </div>
                    
                    <div class="free-table-fix-right" :style="tableFixRightStyles">
                        <div class="free-table-cell-shadow-right" v-if="fixedRightCheck"></div>
                        <template v-for="(col, idx) in columns" :key="idx">
                            <div class="free-table-right-cell free-table-cell" v-if="col.fixed === 'right'" :style="[columnStyles(col)]">
                                <span class="free-table-column-title" :class="[tableCellBoxClass(idx)]">
                                    <div class="free-table-header-cell-title">
                                        <div class="free-table-header-cell-title-inner">
                                            {{ col.title }}
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </template>
                    </div>
                </div>

                <div class="free-table-header-scrollbar" v-if="rightScrollCheck"></div>
            </div>
            <!-- body -->
            <div class="free-table-body" :style="tableBodyStyles">
                <div class="free-table-body-viewport-container" ref="freeTableBodyRef" @wheel="tableWheel">
                    <div class="free-table-fix-left" :style="tableCenterStyles">
                        <div class="free-table-row" v-for="(row, rIdx) in props.dataSource" :key="rIdx" :style="rowStyles" :class="oddOrEvenClass(rIdx)">
                            <template v-for="(col, cIdx) in props.columns" :key="cIdx" >
                                <div class="free-table-cell" 
                                    v-if="col.fixed === true || col.fixed == 'left'"
                                    :style="[columnStyles(col), bodycellStyles]"
                                >
                                    <div class="free-table-cell-inner">
                                        <div class="free-table-cell-content">
                                            <slot name="bodyCell" :column="col">{{ row[col['dataIndex']] }}</slot>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div class="free-table-cell-shadow-left" :style="cellShadowStyles"></div>
                        </div>
                    </div>

                    <div class="free-table-center" :style="tableCenterStyles">
                        <div class="free-table-center-container" :style="tableCenterContainerStyles">
                            <div class="free-table-row" v-for="(row, rIdx) in props.dataSource" :key="rIdx" :style="rowStyles" :class="oddOrEvenClass(rIdx)">
                                <template v-for="(col, cIdx) in props.columns" :key="cIdx" >
                                    <div class="free-table-cell" 
                                        v-if="!col.fixed"
                                        :style="[columnStyles(col), bodycellStyles]"
                                    >
                                        <div class="free-table-cell-inner">
                                            <div class="free-table-cell-content">
                                                <slot name="bodyCell" :column="col">{{ row[col['dataIndex']] }}</slot>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>

                    <div class="free-table-fix-right" :style="tableFixRightStyles">

                        <div class="free-table-row" v-for="(row, rIdx) in props.dataSource" :key="rIdx" :style="rowStyles" :class="oddOrEvenClass(rIdx)">
                            <div class="free-table-cell-shadow-right" v-if="fixedRightCheck" :style="cellShadowStyles"></div>
                            <template v-for="(col, cIdx) in props.columns" :key="cIdx" >
                                <div class="free-table-cell" 
                                    v-if="col.fixed == 'right'"
                                    :style="[columnStyles(col), bodycellStyles]"
                                >
                                    <div class="free-table-cell-inner">
                                        <div class="free-table-cell-content">
                                            <slot name="bodyCell" :column="col">{{ row[col['dataIndex']] }}</slot>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="free-table-vertical-scroll" :style="verticalScrollStyles">
                    <div class="free-table-vertical-scroll-viewport"
                        ref="bodyVerticalScrollRef"
                        @scroll="bodyVerticalScroll"
                        :style="bodyVerticalScrollViewportStyle"
                    >
                        <div class="free-table-body-vertical-scroll-container" :style="bodyScrollStyles"></div>
                    </div>
                </div>
            </div>
            <!-- pagination -->
            <div>

            </div>
        </div>
        <div class="free-table-horizontal-scroll" :style="horizontalScrollStyles">
            <div class="free-table-horizontal-scroll-viewport" 
                ref="horizontalScrollRef" 
                :style="horizontalScrollViewportStyles"
                @scroll="horizontalScroll"
            >
                <div class="free-table-body-horizontal-scroll-container" :style="horizontalScrollContainerStyles"></div>
            </div>
            <!-- 右侧填充 -->
            <div class="free-table-horizontal-scroll-fill" :style="horizontalScrollFillStyles"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>