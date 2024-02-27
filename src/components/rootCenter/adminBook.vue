<template>
  <div class="wBox">
    <div class="bodyTop">
      <div style="margin: 0 10px 0 50px; font-size: 15px">用户名</div>
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
        @click="handleAddAndEdit('add')"
        ><el-icon><Plus /></el-icon>&nbsp;新增用户</el-button
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
          <el-table-column prop="AvatarUrl" label="头像" align="center">
            <template v-slot="scoped">
                <el-avatar :size="50" :src="scoped.row.AvatarUrl" />
            </template>
          </el-table-column>

          <el-table-column prop="account" label="账号" align="center" />
          <el-table-column prop="name" label="用户名" align="center" />
          <el-table-column prop="phone" label="电话" align="center" />
          <el-table-column prop="role.name" label="角色" align="center" />
          <el-table-column label="操作" align="center">
            <template v-slot="scoped">
            <div style="display: flex">
              <el-popconfirm
                confirm-button-text="确认"
                cancel-button-text="取消"
                title="是否重置密码"
                @confirm="confirmEvent(scoped.row)"
                @cancel="cancelEvent"
              >
                <template #reference>
                  <el-button text type="primary" style="width: 70px"
                    ><el-icon><Refresh /></el-icon>重置密码</el-button
                  >
                </template>
              </el-popconfirm>

              <el-button
                text
                type="primary"
                style="width: 50px"
                @click="handleAddAndEdit('edit', scoped.$index, scoped.row)"
                ><el-icon><EditPen /></el-icon>编辑</el-button
              >
              <el-button
                text
                type="primary"
                style="width: 50px"
                @click="handleAddAndEdit('delete', scoped.$index, scoped.row)"
                ><el-icon><Delete /></el-icon>删除</el-button
              >
            </div>
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
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-dialog
      v-model="centerDialogVisible"
      :title="title"
      width="40%"
      align-center
    >
      <el-divider></el-divider>
      <el-form label-width="100px" :model="ruleForm" style="max-width: 700px">
        <el-form-item label="头像" prop="AvatarUrl">
          <el-upload
            class="avatar-uploader"
            style="display: flex;justify-content: center;align-items: center;"
            :action="interfaceUrl"
            :show-file-list="true"
            name="file"
            :http-request="imgUpload"
          >
            <img
              v-if="ruleForm.AvatarUrl"
              :src="ruleForm.AvatarUrl"
              class="avatar"
            />
            <el-icon v-else><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item class="sexclass" label="性别" prop="sex">
          <el-radio v-model="ruleForm.sex" label="男">男</el-radio>
          <el-radio v-model="ruleForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item v-if="judgeSig == 'add'" label="密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="ruleForm.role._id" clearable>
            <el-option
              v-for="item in options"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="subForm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getRoleData } from "@/api/production/roleCenter";
import {
  getUserData,
  createUserData,
  deleteUserData,
  updateUserData,
  resetRolePasswd,
} from "@/api/production/adminCenter";
import { ElMessage } from "element-plus";
import { initMinio, putObject } from "minio-js";
import { useMain } from "../../store/home";
import cookie from "js-cookie";
import router from "../../routes/index";
const store = useMain();
let tableData = ref([]);
let searchInput = ref();
let pageSize = ref(10);
let total = ref();
let centerDialogVisible = ref();
let ruleForm = ref();
let title = ref();
let judgeSig = ref();
let options = ref();
let interfaceUrl = "http://106.52.170.16:9000/";
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
  getUserData(payLoadR).then((res) => {
    console.log(res.data.data.pageData);
    tableData.value = res.data.data.pageData;
    total.value = res.data.data.total;
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
const handleAddAndEdit = (x, y, z) => {
  if (x == "add") {
    imgUrl1.value = ""
    ruleForm.value = {
      AvatarUrl: "",
      role: {
        apis: [],
        code: "",
        desc: "",
        firstPage: "",
        name: "",
        roleRoutes: "",
        _id: "",
      },
    };
    judgeSig.value = "add";
    centerDialogVisible.value = true;
    title.value = "新增用户";
  } else if (x == "delete") {
    deleteUserData(z._id).then((res) => {
      if (res.data.code == 200) {
        ElMessage.success("删除成功");
        getData();
      } else {
        ElMessage.error("删除失败");
      }
    });
  } else if (x == "edit") {
    ruleForm.value = z;
    judgeSig.value = "edit";
    centerDialogVisible.value = true;
    title.value = "修改用户";
  }
};
const confirmEvent = (x) => {
  console.log(localStorage.getItem("userId") == x._id);
  let canshu = {
    _id: x._id,
    account: x.account,
    name: x.name,
    phone: x.phone,
    roleId: x.role._id,
  };
  resetRolePasswd(canshu).then((res) => {
    console.log(res, "123123213213");
    if (res.data.code == 200) {
      if (localStorage.getItem("userId") == x._id) {
        ElMessage.success("重置成功，请重新登录");
        cookie.remove("token");
        localStorage.clear;
        store.$reset();
        router.replace("/");
      } else {
        ElMessage.success("重置成功");
      }
    } else {
      ElMessage.error("重置失败");
    }
  });
};
let imgUrl1 = ref();
const imgUpload = (file) => {
  var f = file.file;
  let reader = new FileReader();
  reader.readAsArrayBuffer(f);
  reader.onload = async function (e) {
    imgUrl1.value = "http://106.52.170.16:9000/img-test/" + f.name;
    let res = e.target.result; //ArrayBuffer
    //先初始化
    initMinio({
      endPoint: "106.52.170.16",
      port: 9000,
      useSSL: false,
      accessKey: "admin",
      secretKey: "sdl@admin",
    });
    //再上传
    const metadata = {
      "content-type": f.type,
    };
    putObject("img-test", res, f.name, metadata, function (err, data) {
      if (err) console.log(err);
      else {
        console.log("上传完成", data);
      }
    });
    ElMessage.success("上传成功");
  };
};
const subForm = () => {
  if (judgeSig.value == "add") {
    let ruleFormR = JSON.parse(JSON.stringify(ruleForm.value));
    ruleFormR.roleId = ruleFormR.role._id;
    ruleFormR.AvatarUrl = imgUrl1.value;
    createUserData(ruleFormR).then((res) => {
      if (res.data.code == 200) {
        ElMessage.success("添加成功");
        getData();
        ruleFormR.AvatarUrl = "";
      } else {
        ElMessage.error("添加失败");
        getData();
        ruleFormR.AvatarUrl = "";
      }
    });
  } else if (judgeSig.value == "edit") {
    let ruleFormR = JSON.parse(JSON.stringify(ruleForm.value));
    ruleFormR.roleId = ruleFormR.role._id;
    if(imgUrl1.value){
        ruleFormR.AvatarUrl = imgUrl1.value;
    }
    updateUserData(ruleFormR).then((res) => {
      if (res.data.code == 200) {
        ElMessage.success("修改成功");
        getData();
        ruleFormR.AvatarUrl = "";
      } else {
        ElMessage.error("修改失败");
        getData();
        ruleFormR.AvatarUrl = "";
      }
    });
  }
  centerDialogVisible.value = false;
};
onMounted(() => {
  getData();
  getRoleData().then((res) => {
    options.value = res.data.data.pageData;
  });
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

.avatar-uploader {
  border: 1px dashed #d9d9d9b0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}
.avatar{
    width: 100%;
}
</style>
