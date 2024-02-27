<template>
  <div class="wBox">
    <div class="bodyTop">
      <!-- <div style="margin: 0 10px 0 50px; font-size: 15px">时间粒度</div>
      <el-input
        v-model="searchInput"
        placeholder="输入"
        style="width: 200px; margin-right: 20px"
      /> -->
      <div style="margin: 0 10px 0 50px; font-size: 15px">时间粒度</div>
      <el-select
        v-model="apiSelect"
        class="m-2"
        placeholder="请选择"
        style="width: 240px"
      >
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        type="primary"
        style="font-size: 13px; margin-left: 10px"
        @click="getData"
        >查询&nbsp;<el-icon> <Search /> </el-icon
      ></el-button>
    </div>
    <div class="bodyBottom">
      <div style="padding: 3vh; box-sizing: border-box">
        <vxe-table
          show-overflow
          show-header-overflow
          border="inner"
          height="590"
          :row-config="{ height: 50 }"
          :scroll-x="{ enabled: true, gt: 10 }"
          :scroll-y="{ enabled: true, gt: 100 }"
          :data="tableData"
          v-if="tableData.length != 0"
        >
        <vxe-column field="createTime" title="时间" align="center" width="180" fixed="left">
        </vxe-column>

        <vxe-column v-for="(item,index) in tableData[0].electricity" :key="index"  width="140" align="center">
            <template #header>
                <div>{{ item.key }}</div>
            </template>
            <template #default="{ row }">
                <div>
                    {{ row.electricity[index].value}}
                </div>
            </template>
          </vxe-column>
          <vxe-column v-for="(item,index) in tableData[0].totalPrice" :key="index"  width="140" align="center">
            <template #header>
                <div>{{ item.key }}</div>
            </template>
            <template #default="{ row }">
                <div>
                    {{ row.totalPrice[index].value}}
                </div>
            </template>
          </vxe-column>
          <vxe-column
            align="center"
            v-for="(item, index) in tableData[0].detail"
            :key="index"
            width="200"
          >
            <template #header>
              <div>{{ item.key }}</div>
            </template>
            <template #default="{ row }">
              <div>
                {{ row.detail[index].value }}
              </div>
            </template>
          </vxe-column>
        </vxe-table>
        <vxe-table v-else :data="tableData"></vxe-table>
        <!-- <el-table
          :data="tableData"
          style="width: 100%; height: 60vh"
          table-layout="fixed"
          :header-cell-style="{
            background: '#eef1f6',
            color: '#606266',
            height: '70px',
          }"
          :cell-style="{ height: '50px' }"
          v-if="tableData[0]"
        >
          <el-table-column label="时间" prop="createTime" align="center" width="100" fixed></el-table-column>
          <el-table-column v-for="(item,index) in tableData[0].electricity" :key="index"  width="140" align="center">
            <template #header>
                <div>{{ item.key }}</div>
            </template>
            <template v-slot="scoped">
                <div>
                    {{ tableData[scoped.$index].electricity[index].value}}
                </div>
            </template>
          </el-table-column>
          <el-table-column v-for="(item,index) in tableData[0].totalPrice" :key="index"  width="140" align="center">
            <template #header>
                <div>{{ item.key }}</div>
            </template>
            <template v-slot="scoped">
                <div>
                    {{ tableData[scoped.$index].totalPrice[index].value}}
                </div>
            </template>
          </el-table-column>
          <el-table-column v-for="(item,index) in tableData[0].detail" :key="index"  width="190" align="center">
            <template #header>
                <div>{{ item.key }}</div>
            </template>
            <template v-slot="scoped">
                <div>
                    {{ tableData[scoped.$index].detail[index].value}}
                </div>
            </template>
          </el-table-column>
        </el-table> -->
      </div>
      <div style="bottom: 3vh; position: absolute; right: 60px">
        <el-pagination
          v-model:page-size="pageSize"
          :background="true"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// const generateColumns = (length = 10, prefix = "column-", props?: any) =>
//   Array.from({ length }).map((_, columnIndex) => ({
//     ...props,
//     key: `${prefix}${columnIndex}`,
//     dataKey: `${prefix}${columnIndex}`,
//     title: `Column ${columnIndex}`,
//     width: 150,
//   }));

// const generateData = (
//   columns: ReturnType<typeof generateColumns>,
//   length = 200,
//   prefix = "row-"
// ) =>
//   Array.from({ length }).map((_, rowIndex) => {
//     return columns.reduce(
//       (rowData, column, columnIndex) => {
//         rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
//         return rowData;
//       },
//       {
//         id: `${prefix}${rowIndex}`,
//         parentId: null,
//       }
//     );
//   });

// const columns = generateColumns(500);
// const data = generateData(columns, 10);

import { dianluGetdata } from "@/api/production/dianlu";

let pageSize = ref(10);
let total = ref();
let payLoad = reactive({
  pageSize: pageSize,
  currPage: "1",
});

const apiSelect = ref(1);
const selectOptions = [
  {
    value: 1,
    label: "实时",
  },
  {
    value: 5,
    label: "5分钟",
  },
  {
    value: 15,
    label: "15分钟",
  },
  {
    value: 60,
    label: "小时实时",
  },
];

const tableData: any = ref([]);
const getData = () => {
  let payLoadR = {
    interval: apiSelect.value,
    pageSize: payLoad.pageSize,
    currPage: payLoad.currPage,
  };
  dianluGetdata(payLoadR).then((res) => {
    tableData.value = res.data.data.Data ? res.data.data.Data : [];
    total.value = res.data.data.count;
    console.log(res.data.data.Data);
  });
};
const handleSizeChange = (e) => {
  payLoad.pageSize = e;
  getData();
};
const handleCurrentChange = (e) => {
  payLoad.currPage = e;
  getData();
};
onMounted(() => {
  getData();
});
onUnmounted(() => {});
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
  width: 98.8%;
  height: 10vh;
  background-color: #fff;
  margin-top: 10px;
  box-shadow: 0 0px 12px 0px #d9d9d9;
  display: flex;
  align-items: center;
}

.bodyBottom {
  width: 98.8%;
  flex: auto;
  height: 0;
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 0px 16px 0px #d9d9d9;
  box-sizing: border-box;
  padding: 15px;
}

/deep/.vxe-table--header{
    height: 70px;
    background-color: #EEF1F6;
    font-weight: 600;
}


/*表格滚动条样式*/
/deep/.vxe-table--body-wrapper::-webkit-scrollbar{
    width: 10px;
}

/deep/.vxe-table--body-wrapper::-webkit-scrollbar-thumb{
    border-radius: 5px;
    height: 10px;
    background-color: #818181 !important;
    border-radius: 30px !important;
}

/deep/.vxe-table--body-wrapper::-webkit-scrollbar-thumb:hover{
    border-radius: 5px;
    height: 10px;
    background-color: #b8b8b8 !important;
    border-radius: 30px !important;
}
/deep/.vxe-table--body-wrapper::-webkit-scrollbar-track{
    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    // background-color: #5C6974;
    // background: rgba(0,0,0,0.4);
}
</style>
