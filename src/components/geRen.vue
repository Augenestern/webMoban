<template>
  <div class="wBox">
    <div class="bodyTop">
      <div class="formText">
        <div class="formItem formText-left">头像</div>
        <div class="formItem"><div class="formItem-tx"><img style="width: 100%;height: 100%; border-radius: 50%;" :src="userImg" alt=""></div></div>
        <div class="formItem formText-left">手机号</div>
        <div class="formItem">{{ userPhone }}</div>
        <div class="formItem formText-left">账号</div>
        <div class="formItem">{{ account }}</div>
        <div class="formItem formText-left">密码</div>
        <div class="formItem"><el-button type="primary" @click="changePassWord">修改密码</el-button></div>
        <div class="formItem formText-left">姓名</div>
        <div class="formItem">{{ userName }}</div>
        <div class="formItem formText-left">性别</div>
        <div class="formItem">{{ userSex==""?"男":userSex }}</div>
        <div class="formItem formText-left">角色</div>
        <div class="formItem">{{ userRole }}</div>
      </div>
    </div>
    <el-dialog
      title="修改密码"
      v-model="centerDialogVisible"
      width="30%"
      align-center
    >
      <el-divider></el-divider>
      <el-form label-width="100px" style="max-width: 470px">
        <el-form-item label="原密码">
          <el-input v-model="oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="newPass"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="changePassWordR"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useMain } from "../store/home";
import { changeRolePasswd } from "../api/production/login";
import cookie from "js-cookie";
import router from "@/routes";

const store = useMain();

let centerDialogVisible = ref(false);
let userImg:any = localStorage.getItem("userImg");
let userPhone = localStorage.getItem("userPhone");
let userName = localStorage.getItem("userName");
let userSex = localStorage.getItem("userSex");
let account = localStorage.getItem("userAccount");
let userRole = localStorage.getItem("userRole");

let oldPass = ref();
let newPass = ref();
const changePassWord = () => {
  centerDialogVisible.value = true;
};
const changePassWordR = () => {
  let canshu = {
    _id: localStorage.getItem("userId"),
    account: localStorage.getItem("userAccount"),
    name: userName,
    phone: userPhone,
    oldPass: oldPass.value,
    newPass: newPass.value,
  };
  changeRolePasswd(canshu).then((res) => {
    console.log(res);
    if (res.data.code == 500) {
      ElMessage.error("原密码错误");
    } else if (res.data.code == 200) {
      ElMessage.success("修改成功，请重新登录");
      centerDialogVisible.value = false;
      cookie.remove("token");
      localStorage.clear;
      store.$reset();
      router.replace("/");
    }
  });
};
onMounted(() => {});
onUnmounted(() => {});
</script>

<style lang="less" scoped>
.wBox {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bodyTop {
  position: absolute;
  width: 98.8%;
  height: 97%;
  background-color: #fff;
  margin-top: 10px;
  box-shadow: 0 0px 12px 0px #d9d9d9;
}
.formText {
  margin: 40px 90px;
  width: 50%;
  height: 70%;
  display: grid;
  grid-template-columns: 25% 85%;
  grid-template-rows: 28% repeat(6, 14.2%);
  &-left{
    font-weight: 600;
    color: #848484;
  }
}
.formItem {
  display: flex;
  align-items: center;
  &-tx{
    width: 100px;
    height: 100px;
    border: 2px solid #bdbdbd;
    border-radius: 50%;
    background-color: #848484;
  }
}
</style>
