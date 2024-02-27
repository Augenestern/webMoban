<template>
  <div class="waiBox">
    <div class="loginForm">
      <div style="font-size: 30px;font-weight: 600;color: rgb(50, 50, 50); margin-bottom: 20px">众立诚</div>
      <el-input
        class="jianxi"
        clearable
        size="large"
        v-model="loginFrom.account"
      >
        <template #prepend>
          <el-icon><User /></el-icon>
        </template>
      </el-input>
      <el-input
        class="jianxi"
        clearable
        show-password
        size="large"
        v-model="loginFrom.password"
      >
        <template #prepend>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
      <el-button @click="loginHome" class="jianxi">登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Login } from "../api/production/login";
import router from "../routes/index";
import { useMain } from "@/store/home";
let loginFrom = reactive({
  account: "",
  password: "",
});

const loginHome = () => {
  let adasd = {
    account: loginFrom.account,
    password: loginFrom.password,
  };
  Login(adasd).then((res) => {
    if (res.data.code == 200) {
      ElMessage.success("登陆成功");
      localStorage.setItem("token", res.data.data.token);
      //   cookie.set("token", res.data.data.token);
      localStorage.setItem("userImg", res.data.data.AvatarUrl);
      localStorage.setItem("userSex", res.data.data.sex);
      localStorage.setItem("userName", res.data.data.name);
      localStorage.setItem("userPhone", res.data.data.phone);
      localStorage.setItem("userCode", res.data.data.roleCode);
      localStorage.setItem("userRole", res.data.data.role);
      localStorage.setItem("userId", res.data.data._id);
      localStorage.setItem("userAccount", res.data.data.account);
      // localStorage.setItem("")
      router.replace(useMain().cebianName.split("|")[0]);
    } else if (res.data.message == "账号错误") {
      ElMessage.error("账号错误");
    } else if (res.data.message == "密码错误") {
      ElMessage.error("密码错误");
    }
  });
};
onMounted(() => {});
onUnmounted(() => {});
</script>

<style lang="less" scoped>
.loginForm {
  display: flex;
  flex-direction: column;
  width: 22vw;
  margin-top: -100px;
  align-items: center;
}
.jianxi {
  margin-top: 20px;
}
.waiBox {
  background-image: url("../assets/tupian.jpg");
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-button {
  height: 42px;
  width: 100%;
}
</style>
