<template>
  <div class="wBox">
    <div class="bodyTop">
      <div style="margin: 0 10px 0 50px; font-size: 15px">api名称</div>
      <el-input
        v-model="searchInput"
        placeholder="输入"
        style="width: 200px; margin-right: 20px"
      />
      <div style="margin: 10px; font-size: 15px">方法</div>
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
      <el-button type="primary" style="font-size: 13px; margin-left: 10px" @click="getData"
        >查询&nbsp;<el-icon> <Search /> </el-icon
      ></el-button>
      <el-button
        @click="handleEditAndDelete('add')"
        type="primary"
        style="font-size: 13px; margin-left: auto; margin-right: 150px"
        ><el-icon><Plus /></el-icon>&nbsp;新增api</el-button
      >
    </div>
    <div class="bodyBottom">
      <div style="padding: 3vh; box-sizing: border-box">
        <el-table
          :data="tableData"
          style="width: 100%; height: 60vh"
          table-layout="fixed"
          :header-cell-style="{
            background: '#eef1f6',
            color: '#606266',
            height: '70px',
          }"
          :cell-style="{ height: '50px' }"
        >
          <el-table-column prop="name" label="api名称" align="center" />
          <el-table-column prop="url" label="URL" align="center" />
          <el-table-column prop="method" label="方法" align="center" />
          <el-table-column prop="desc" label="描述" align="center" />
          <el-table-column label="操作" align="center">
            <template v-slot="scope">
              <div>
                <el-button
                  text
                  type="primary"
                  @click="handleEditAndDelete('edit', scope.$index, scope.row)"
                  ><el-icon><EditPen /></el-icon>编辑</el-button
                >
                <el-button
                  text
                  type="primary"
                  @click="
                    handleEditAndDelete('delete', scope.$index, scope.row)
                  "
                  ><el-icon><Delete /></el-icon>删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="bottom: 3vh; position: absolute; right: 60px">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :background="true"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <el-dialog
        v-model="centerDialogVisible"
        :title="dialogTitle"
        width="40%"
        align-center
      >
        <el-divider></el-divider>
        <el-form label-width="100px" :model="editFrom" style="max-width: 700px">
          <el-form-item label="api名称">
            <el-input v-model="editFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="URL">
            <el-input v-model="editFrom.url"></el-input>
          </el-form-item>
          <el-form-item label="方法">
            <el-select v-model="editFrom.method" clearable>
              <el-option
                v-for="item in selectOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详情">
            <el-input v-model="editFrom.desc"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="editApiData"> 确认 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getApiData,
  updateApiData,
  createApiData,
  deleteApiData,
} from "../../api/production/apiCenter";

let searchInput = ref();
let currentPage = ref(1);
let pageSize = ref(10);
let total = ref();
let payLoad = reactive({
  name: "",
  method: "",
  pageSize: pageSize,
  currPage: "1",
});

const apiSelect = ref();
const selectOptions = [
  {
    value: "GET",
    label: "GET",
  },
  {
    value: "POST",
    label: "POST",
  },
  {
    value: "PUT",
    label: "PUT",
  },
  {
    value: "DELETE",
    label: "DELETE",
  },
];

let dialogTitle = ref();
let editFrom = ref();
let judgeSig = ref();
let centerDialogVisible = ref(false);

const handleEditAndDelete = (x, y, z) => {
  if (x == "edit") {
    editFrom.value = z;
    dialogTitle.value = "修改api";
    judgeSig.value = "edit";
    centerDialogVisible.value = true;
  } else if (x == "add") {
    judgeSig.value = "add";
    editFrom.value = {
      desc: "",
      method: "",
      name: "",
      url: "",
    };
    dialogTitle.value = "增加api";
    centerDialogVisible.value = true;
  } else if (x == "delete") {
    deleteApiData(z._id).then((res) => {
      if (res.data.code == 200) {
        ElMessage.success("删除成功");
        getData();
      } else {
        ElMessage.error("删除失败");
      }
    });
  }
};
const editApiData = () => {
  if (judgeSig.value == "edit") {
    let editFromR = {
      desc: editFrom.value.desc,
      method: editFrom.value.method,
      name: editFrom.value.name,
      url: editFrom.value.url,
      _id: editFrom.value._id,
    };
    updateApiData(editFromR).then((res) => {
      if (res.data.code == 200) {
        ElMessage.success("修改成功");
      } else {
        ElMessage.error("修改失败");
      }
    });
  } else if (judgeSig.value == "add") {
    let editFromR = {
      desc: editFrom.value.desc,
      method: editFrom.value.method,
      name: editFrom.value.name,
      url: editFrom.value.url,
    };
    createApiData(editFromR).then((res) => {
      if (res.data.code == 200) {
        ElMessage.success("添加成功");
        getData();
      } else {
        ElMessage.error("添加失败");
      }
    });
  }
  centerDialogVisible.value = false;
};
const tableData = ref([])
const getData = () => {
  let payLoadR = {
    name: searchInput.value,
    method: apiSelect.value,
    pageSize: payLoad.pageSize,
    currPage: payLoad.currPage,
  };
  getApiData(payLoadR).then((res) => {
    total.value = res.data.data.total;
    tableData.value = res.data.data.pageData;
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
</style>
