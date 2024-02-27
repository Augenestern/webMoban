<template>
  <div class="wBox">
    <div class="bodyTop">
      <div style="margin: 0 10px 0 50px; font-size: 15px">角色名</div>
      <el-input
        v-model="searchInput"
        placeholder="请输入"
        style="width: 200px; margin-right: 20px"
      />

      <el-button
        type="primary"
        style="font-size: 13px; margin-left: 10px"
        @click="getData"
        >查询&nbsp;<el-icon> <Search /> </el-icon
      ></el-button>
      <el-button
        type="primary"
        style="font-size: 13px; margin-left: auto; margin-right: 150px"
        @click="handleLookAndEdit('add')"
        ><el-icon><Plus /></el-icon>&nbsp;新增角色</el-button
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
          <el-table-column prop="name" label="角色名称" align="center" />
          <el-table-column prop="code" label="权限类型" align="center" />
          <el-table-column prop="desc" label="描述" align="center" />
          <el-table-column prop="address" label="操作" align="center">
            <template v-slot="scoped">
              <el-button
                text
                type="primary"
                @click="handleLookAndEdit('edit', scoped.$index, scoped.row)"
                ><el-icon><EditPen /></el-icon>编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
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
    <el-dialog
      v-model="centerDialogVisible1"
      :title="title"
      width="40%"
    >
      <el-drawer
        v-model="drawer"
        :title="title"
      >
        <el-button type="primary" @click="saveApis" v-if="chouti === false"
          >保存</el-button
        >
        <el-divider></el-divider>
        <el-tree
          v-if="isShowTree"
          :data="treeData"
          ref="refTree"
          show-checkbox
          node-key="id"
          default-expand-all
        />
      </el-drawer>
      <el-divider></el-divider>
      <el-form label-width="100px" :model="ruleForm" style="max-width: 700px">
        <el-form-item label="角色名称">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色接口">
          <el-button
            text
            type="primary"
            @click="handleLookAndEdit('editapi', ruleForm.apis)"
            ><el-icon><Setting /></el-icon>设置api</el-button
          >
        </el-form-item>
        <el-form-item label="权限类型">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="centerDialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="subForm1()"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  getRoleData,
  updateRoleData,
  createRoleData,
} from "@/api/production/roleCenter";
import { getApiData } from "@/api/production/apiCenter";
import { ElMessage } from "element-plus";
let tableData = ref([]);
let centerDialogVisible1 = ref(false);
let drawer = ref(false);
const refTree = ref();
let isShowTree = ref(false);
let title = ref();
let total = ref();
let ruleForm = ref();
let chouti = ref(true);
let subFinalApi = ref();
let searchInput = ref();
let judgeSig = ref();
let judgeSigR = ref();
let pageSize = ref(10);
let treeData: any = [
  {
    id: "1",
    label: "GET",
    children: [],
  },
  {
    id: "2",
    label: "POST",
    children: [],
  },
  {
    id: "3",
    label: "PUT",
    children: [],
  },
  {
    id: "4",
    label: "DELETE",
    children: [],
  },
];
let payLoad = reactive({
  name: "",
  pageSize: pageSize,
  currPage: "1",
});
const getData = () => {
  let payLoadR = {
    name: searchInput.value,
    pageSize: payLoad.pageSize,
    currPage: payLoad.currPage,
  };
  getRoleData(payLoadR).then((res) => {
    tableData.value = res.data.data.pageData;
    total.value = res.data.data.total;
  });
};
const setSession = (arr: any, method: any) => {
  let res = [];
  res = arr.filter((i: any) => i.method == method);
  res.forEach((e: any) => {
    if (e.method == "GET") {
      treeData[0].children.push({
        id: e._id,
        label: e.name,
        disabled: false,
      });
    } else if (e.method == "POST") {
      treeData[1].children.push({
        id: e._id,
        label: e.name,
        disabled: false,
      });
    } else if (e.method == "PUT") {
      treeData[2].children.push({
        id: e._id,
        label: e.name,
        disabled: false,
      });
    } else if (e.method == "DELETE") {
      treeData[3].children.push({
        id: e._id,
        label: e.name,
        disabled: false,
      });
    }
  });
};
const getAllApi = async () => {
  await getApiData().then((res) => {
    console.log(res);
    setSession(res.data.data.pageData, "GET"),
      setSession(res.data.data.pageData, "POST"),
      setSession(res.data.data.pageData, "PUT"),
      setSession(res.data.data.pageData, "DELETE");
  });
  console.log(123);
};
const judgementF = (arr: any) => {
  arr.forEach((e: any) => {
    if (e.children === [] || e.children === undefined) {
      e.disabled = chouti.value;
    } else {
      judgementF(e.children);
    }
  });
};
const handleLookAndEdit = (x: any, y: any, z: any) => {
  console.log(x, y, z, tableData.value);
  if (x == "look") {
    chouti.value = true;
    judgementF(treeData);
    title.value = "查看角色api";
    let apiUsed = ref([]);
    z.apis.forEach((i) => {
      apiUsed.value.push({ id: i });
    });
    let apiUsedR = JSON.parse(JSON.stringify(apiUsed.value));
    console.log(apiUsedR);
    nextTick(() => {
      refTree.value.setCheckedNodes(apiUsedR);
    });
    isShowTree.value = true;
    drawer.value = true;
  } else if (x == "edit") {
    console.log(11233);
    chouti.value = false;
    judgementF(treeData);
    title.value = "修改用户";
    // console.log(JSON.parse(JSON.stringify([tableData.value[y]])), "这是z");
    ruleForm.value = JSON.parse(JSON.stringify([tableData.value[y]][0]));
    centerDialogVisible1.value = true;
  } else if (x == "editapi") {
    judgeSig.value = "editapi";
    chouti.value = false;
    judgementF(treeData);
    console.log(y);
    let apiUsed = ref([]);
    if(y){
      y.forEach((e) => {
      apiUsed.value.push({ id: e });
    });
    }
    let apiUsedR = JSON.parse(JSON.stringify(apiUsed.value));
    console.log(apiUsedR);
    isShowTree.value = true;
    drawer.value = true;
    nextTick(() => {
      refTree.value.setCheckedNodes(apiUsedR);
    });
  } else if (x == "add") {
    console.log(777);
    title.value = "新增用户";
    judgeSig.value = "add";
    judgeSigR.value = "add";
    ruleForm.value = {
      name: "",
      apis: [],
      code: "",
      desc: "",
    };
    centerDialogVisible1.value = true;
  }
};
const saveApis = () => {
  let checkArr = refTree.value
    .getCheckedNodes()
    .filter((item) => !item.children);
  let finalId = [];
  checkArr.forEach((e) => {
    finalId.push(e.id);
  });
  subFinalApi.value = finalId;
  drawer.value = false;
};
const subForm1 = () => {
  if (judgeSig.value == "editapi" && judgeSigR.value != "add") {
    ruleForm.value.apis = subFinalApi.value;
    console.log(judgeSig.value);
    updateRoleData(ruleForm.value).then((res) => {
      if (res.data.code == 200) {
        ElMessage.success("修改成功");
        getData();
      } else {
        ElMessage.error("修改失败");
        getData();
      }
    });
  } else if (judgeSigR.value == "add") {
    ruleForm.value.apis = subFinalApi.value || [];
    console.log(ruleForm.value, "99999");
    createRoleData(ruleForm.value).then((res) => {
      if (res.data.code == 200) {
        ElMessage.success("添加成功");
        getData();
      } else {
        ElMessage.error("添加失败");
        getData();
      }
    });
  }
  centerDialogVisible1.value = false;
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
  getAllApi();
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
