<template>
    <div class="wBox">
        <div class="bodyTop">
            <el-input v-model="input" placeholder="Please input" style="width: 200px;margin: 20px;" />
            <el-button type="primary" style="font-size: 13px;">查询&nbsp;<el-icon>
                    <Search />
                </el-icon></el-button>
        </div>
        <div class="bodyBottom">
            <div>
                <el-table :data="tableData" style="width: 100%;" table-layout="fixed" max-height="64vh"
                    :header-cell-style="{ background: '#eef1f6', color: '#606266', height: '70px' }"
                    :cell-style="{ height: '50px' }">
                    <el-table-column prop="date" label="Date" />
                    <el-table-column prop="name" label="Name" />
                    <el-table-column prop="ada" label="ada" />
                    <el-table-column prop="asda" label="asda" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
            </div>
            <div style="margin-top: 30px;position: absolute;right:20px">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 30, 40]" :background="true"
                    layout="total, sizes, prev, pager, next, jumper" :total="100" @current-change="handleCurrentChange" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

let input:any = ref()
let currentPage = ref(1)
let pageSize = ref(10)
const handleCurrentChange = () => {
    console.log(currentPage.value);
}
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        ada: 'wer',
        asda: "sdsd",
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
onMounted(() => {
})
onUnmounted(() => {
})
</script>

<style lang="less" scoped>
.wBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.bodyTop {
    width: 98%;
    height: 80px;
    background-color: #fff;
    margin-top: 10px;
    box-shadow: 0 0px 12px 0px #d9d9d9;
    display: flex;
    align-items: center;
}

.bodyBottom {
    width: 98%;
    flex: auto;
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #fff;
    box-shadow: 0 0px 16px 0px #d9d9d9;
    box-sizing: border-box;
    padding: 15px;
}
</style>