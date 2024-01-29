<script setup>
import { ref, reactive} from 'vue'
import { FTable } from './components/table/index';

const dataSource = reactive([]);
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        fixed: true,
        width: 150,
        key: 'name'
    },
    {
        title: 'Age',
        dataIndex: 'age',
        fixed: 'left',
        width: 100,
    },
    {
        title: 'Column 1',
        dataIndex: 'address',
        key: 'column1'
    },
    {
        title: 'Column 2',
        dataIndex: 'address',
    },
    {
        title: 'Column 3',
        dataIndex: 'address',
    },
    { title: 'Column 4', dataIndex: 'address' },
    {
        title: 'Action',
        key: 'operation',
        dataIndex: 'action',
        fixed: 'right',
        width: 100,
        key: 'operation'
    },
];

for (let i = 0; i < 4; i++) {
    dataSource.push({
        key: i,
        name: `Edrward ${i}`,
        age: i + 1,
        address: `London Park no. ${i}`,
        action: 'action1' 
    });
}

// const scroll = {x: 1800};
const scroll = {y: 403.12, x: 1800};
// const scroll = {y: 415};
// const scroll = {y: 400};

// const scroll = null;
</script>

<template>
  <FTable :data-source="dataSource" :columns="columns" :scroll="scroll">
    <template #bodyCell="{column}">
        <template v-if="column.key === 'operation'">
            <a href="#">Action</a>
        </template>

        <template v-if="column.key === 'name'">
            <a href="#">{{ column.title }}</a>
        </template>

        <template v-if="column.key === 'column1'">
            <a href="#">{{ column.title }}</a>
        </template>
    </template>
  </FTable>
</template>

<style scoped>
</style>
