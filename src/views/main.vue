<template>
  <div class="zwBox">
    <el-menu
      class="menuSty"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      background-color="#161616"
      :unique-opened="true"
      :default-active="useMain().cebianName"
      text-color="#fff"
      @select="handleSelect"
    >
      <!-- <div
        style="
          height: 60px;
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
        "
        :style="{ marginRight: isCollapse ? '5px' : '0px' }"
      >
        <button
          id="mybutton"
          class="button"
          @click="jiantou"
          :style="{
            transform: isCollapse
              ? 'scale(0.6) translateX(5px) rotate(180deg)'
              : 'scale(0.6) translateX(5px) rotate(0deg)',
          }"
        >
          <div class="button-box">
            <span class="button-elem">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 40">
                <path
                  d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                ></path>
              </svg>
            </span>
            <span class="button-elem">
              <svg viewBox="0 0 46 40">
                <path
                  d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                ></path>
              </svg>
            </span>
          </div>
        </button>
        <div
          v-if="!isCollapse"
          style="
            text-wrap: nowrap;
            color: #409eff;
            font-size: 20px;
            font-weight: 550;
            position: absolute;
            left: 20px;
          "
        >
          众立诚
        </div>
      </div> -->
      <div
        style="
          height: 60px;
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
        "
        :style="{ marginRight: isCollapse ? '5px' : '0px' }"
      >
<!-- 
        <button
          id="mybutton"
          class="button"
          @click="jiantou"
          :style="{
            transform: isCollapse
              ? 'scale(0.6) translateX(5px) rotate(180deg)'
              : 'scale(0.6) translateX(5px) rotate(0deg)',
          }"
        >
          <div class="button-box">
            <span class="button-elem">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 40">
                <path
                  d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                ></path>
              </svg>
            </span>
            <span class="button-elem">
              <svg viewBox="0 0 46 40">
                <path
                  d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                ></path>
              </svg>
            </span>
          </div>
        </button> -->
        <svg style="width: 28px; position: absolute;left: 20px;" t="1709001228350" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1782" width="32" height="32"><path d="M874.957 359.637c6.479 5.756 7.335 14.596 2.554 18.971-4.898 4.393-12.849 3.522-18.228-1.244-52.483-46.62-131.525-48.038-185.708-3.326-5.508 4.564-13.521 5.169-18.201 0.594-4.709-4.551-3.491-13.354 3.193-18.857 63.093-52.134 155.211-50.486 216.39 3.862z" fill="#409eff" p-id="1783"></path><path d="M835.27 389.031c8.083 6.253 9.854 16.208 4.925 20.485-4.933 4.328-13.271 2.961-19.447-1.766-31.925-24.893-76.88-25.694-109.793-1.97-6.305 4.498-14.79 5.562-19.497 1.078-4.723-4.468-2.567-14.341 5.728-20.294 41.32-29.855 97.825-28.838 138.084 2.467z" fill="#409eff" p-id="1784"></path><path d="M806.962 419.271c9.172 5.873 11.273 16.353 6.239 20.55-4.952 4.263-12.954 3.151-18.977-0.649-17.478-11.189-39.931-11.599-57.817-1.033-6.104 3.574-14.284 4.381-18.991-0.027-4.922-4.396-2.378-14.778 6.939-20.321 25.499-15.178 57.677-14.599 82.607 1.48z" fill="#409eff" p-id="1785"></path><path d="M351.626 877.062H215.483c-117.639 0-213.475-95.699-213.475-213.47 0-117.775 95.836-213.338 213.614-213.338v54.843c-87.475 0-158.634 71.157-158.634 158.495 0 87.471 71.16 158.628 158.634 158.628h136.143v54.842h-0.139z m0 0" fill="#409eff" p-id="1786"></path><path d="M670.147 299.779h67.615a316.792 316.792 0 0 0-53.79-65.326c-57.859-53.748-132.719-83.226-211.007-83.226-83.361 0-161.645 32.357-220.604 91.313-58.817 58.955-91.312 137.243-91.312 220.601h54.841c0-141.765 115.446-257.072 257.213-257.072 78.075 0 149.43 36.452 197.044 93.71zM985.273 779.577V636.555h-0.319l-14.63-220.1h-59.479l-14.63 220.1H870.24v-81.212h-1.062L733.577 471.48v57.464l-93.088-57.571v57.571l-93.086-57.571v83.864h-22.479v81.213H496.62v233.67h526.608v-90.542h-37.955z m-355.492-26.504h-61.808v-90.65h61.808v90.65z m1.379-125.107h-64.461v-47.499h64.461v47.499z m94.998 125.107h-61.814v-90.65h61.814v90.65z m1.269-125.107h-64.458v-47.499h64.458v47.499z m94.997 125.107h-61.812v-90.65h61.812v90.65z m1.376-125.107h-64.459v-47.499H823.8v47.499zM455.005 822.22H205v54.509h250.005c15.218 0 27.422-12.261 27.422-27.255 0-14.988-12.342-27.254-27.422-27.254z" fill="#409eff" p-id="1787"></path></svg>
        <div
          v-if="!isCollapse"
          style="
            text-wrap: nowrap;
            color: #409eff;
            font-size: 20px;
            font-weight: 550;
            position: absolute;
            left: 55px;
          "
        >
          众立诚
        </div>
      </div>
      <el-menu-item index="shouye|首页">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-sub-menu index="data" popper-class="test">
        <template #title>
          <el-icon><Coin /></el-icon>
          <span>数据中心</span>
        </template>
        <el-menu-item index="dianLu|电炉">电炉</el-menu-item>
        <!-- <el-menu-item index="shangpinFen">商品分类</el-menu-item> -->
      </el-sub-menu>
      <el-sub-menu index="set" popper-class="test">
        <template #title>
            <el-icon><Operation /></el-icon>
          <span>配置中心</span>
        </template>
        <el-menu-item index="shebeiLx|设备类型">设备类型</el-menu-item>
        <el-menu-item index="shebeiTable|设备表">设备表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="root" popper-class="test">
        <template #title>
            <el-icon><Lock /></el-icon>
          <span>权限中心</span>
        </template>
        <el-menu-item index="apibook|api管理">api管理</el-menu-item>
        <el-menu-item index="userbook|角色管理">角色管理</el-menu-item>
        <el-menu-item index="adminbook|用户管理">用户管理</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="geren|个人中心">
        <el-icon>
          <Avatar />
        </el-icon>
        <span>个人中心</span>
      </el-menu-item>
    </el-menu>
    <div class="homeMain">
      <div class="mainHeader">
        <div style="height: 100%;display: flex;align-items: center; margin-left: 14px; font-size: 24px;" @click="jiantou">
          <el-icon v-if="!isCollapse"><Fold /></el-icon>
          <el-icon v-else><Expand /></el-icon>
      </div>
        <el-popover placement="bottom-end" :width="200" trigger="hover">
          <template #default>
            <div class="topSty">
              <div class="topSty-item" style="grid-row: span 2;margin-left: 10px;"><img :src="userImg" style="width: 36px;height: 36px;"  alt=""></div>
              <div class="topSty-item">当前角色:</div>
              <div class="topSty-item">{{userRole}}</div>
            </div>
            <div class="tuichuSty" @click="roGeren">个人中心</div>
            <div class="tuichuSty" @click="tuichu">退出登录</div>
          </template>
          <template #reference>
            <div
              class="rightTou"
              style="width: 150px; height: 100%; position: absolute; right: 0px"
              @mouseenter="touxEnter"
              @mouseleave="touxLeave"
            >
              <img class="imgTouxiang" :src="userImg" alt="" />
              <div
                style="
                  position: absolute;
                  right: 35px;
                  top: 50%;
                  transform: translateY(-50%);
                  cursor: pointer;
                "
              >
                {{ account }}
              </div>
              <el-icon class="elaaa">
                <ArrowDown />
              </el-icon>
            </div>
          </template>
        </el-popover>
      </div>
      <div class="sideTabs">
        <el-tabs
          v-model="useMain().cebianName"
          type="card"
          class="demo-tabs"
          closable
          @tab-remove="removeTab"
          @tab-change="changeTab"
        >
          <el-tab-pane
            v-for="item in useMain().editableTabs"
            :key="item.name"
            :name="item.name"
          >
            <template #label>
              <div style="display: flex; align-items: center;">
                <el-icon><HelpFilled /></el-icon>
                <div>&nbsp;{{ item.title }}</div>
              </div>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="homeBody">
        <router-view></router-view>
      </div>
      <!-- <button class="button2">
                Hover me
            </button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/routes";
import { useMain } from "@/store/home.ts";
const route = new (useRoute as any)();
let userImg:any = localStorage.getItem("userImg");
let account = localStorage.getItem("userAccount");
let userRole = localStorage.getItem("userRole");

// const editableTabsValue = ref("2");
// const editableTabs = ref([
//   {
//     title: "Tab 1",
//     name: "1",
//   },
//   {
//     title: "Tab 2",
//     name: "2",
//   },
//   {
//     title: "Tab 3",
//     name: "3",
//   },
// ]);
const removeTab: any = (targetName: string) => {
  if (useMain().cebianName === targetName) {
    useMain().editableTabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab =
          useMain().editableTabs[index + 1] ||
          useMain().editableTabs[index - 1];
        if (nextTab) {
          useMain().cebianName = nextTab.name;
          router.push(nextTab.name.split("|")[0]);
        }
        if (useMain().editableTabs.length > 1) {
          useMain().editableTabs.splice(index, 1);
        }
      }
    });
  } else {
    useMain().editableTabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        if (useMain().editableTabs.length > 1) {
          useMain().editableTabs.splice(index, 1);
        }
      }
    });
  }
};

const changeTab: any = (targetName: string) => {
  console.log(targetName);
  router.push(targetName.split("|")[0]);
};
// watch(
//   () => route.path,
//   () => {
//     console.log(route.path,'333');
//     useMain().cebianName = route.path.slice(1);
//   },
//   { immediate: true }
// );

let isCollapse = ref(false);
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath, "6666");
  useMain().cebianName = key;
  let sign = true;
  useMain().editableTabs.forEach((item) => {
    console.log(item.name);
    if (item.name == key) {
      sign = false;
    }
  });
  if (sign) {
    useMain().editableTabs.push({ title: key.split("|")[1], name: key });
  }
  router.push("/" + key.split("|")[0]);
};
const jiantou = () => {
  isCollapse.value = !isCollapse.value;
  document.getElementsByClassName("button")[0].style.transform =
    "scale(0.6) translateX(5px) rotate(0)";
  //    transform: scale(0.6) rotate(180deg) translateX(5px);
};
const touxEnter = () => {
  document.getElementsByClassName("elaaa")[0].style.transform =
    "rotate(180deg)";
};
const touxLeave = () => {
  document.getElementsByClassName("elaaa")[0].style.transform = "";
};

const tuichu = () => {
  useMain().$reset()
  localStorage.clear()
  router.push("/login");
};
const roGeren = () => {
  handleSelect('geren|个人中心',[])
  router.push("/geren");
};

onMounted(() => {});
onUnmounted(() => {});
</script>

<style lang="less" scoped>
.zwBox {
  width: 100vw;
  height: 100vh;
  display: flex;
}

@bgColor: #0093fc;
//背景颜色
/deep/.el-menu-item {
  height: 50px;
}
/deep/.el-sub-menu__title {
  background-color: #161616;
  height: 50px;
}
/deep/.el-sub-menu__title:hover {
  background-color: #1e273a;
}
/deep/.el-menu-item:hover {
  background-color: #1e273a;
}
/deep/.el-tabs__item:hover {
  color: #409eff;
}

/deep/.el-tabs__item.is-active {
  background-color: #fff;
}
/deep/.el-tabs{
  height: 100%;
}

//一级类目选中
:deep(.el-sub-menu.is-active) {
  .el-sub-menu__title.el-tooltip__trigger.el-tooltip__trigger {
    color: @bgColor;
    border-right: 4px solid @bgColor;
  }
}
/deep/.el-menu-item.is-active {
  border-right: 4px solid @bgColor;
  color: @bgColor;
  background-color: #1e273a;
}

/deep/.el-menu--vertical:not(.el-menu--collapse) {
  width: 240px;
  flex-shrink: 0;
}

// /deep/.is-active {
//   background-color: #4f4f4f;
// //   width: 400px;
// }

.homeMain {
  flex: 1;
  background-color: #e8e8e8;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.homeBody {
  flex: 1;
  height: 0;
}
.rightTou:hover {
  background-color: #d5d5d5;
}
.mainHeader {
  height: 6.6vh;
  background-color: #f4f4f4;
  display: flex;
  // align-items: center;
  position: relative;
}
.sideTabs {
  height: 40px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 6px 12px 0px #dddddd;
}

.topSty{
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(208, 208, 208);
&-item{
  display: flex;
  align-items: center;
  // justify-content: center;
}
}
.tuichuSty {
  height: 40px;
  display: flex;
  // justify-content: center;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;
}
.tuichuSty:hover {
  background-color: #dbdada;
}
.imgTouxiang {
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  right: 85px;
  top: 50%;
  transform: translateY(-50%);
  // border: 2px solid rgb(135, 135, 135);
  cursor: pointer;
}

.elaaa {
  // background-color: #009087;
  width: 30px;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  transition-duration: 0.5s;
  transform-origin: center 25%;
  position: absolute;
  cursor: pointer;
}

// .elaaa:hover {
//     transform: rotate(180deg);
// }



.button2 {
  display: inline-block;
  transition: all 0.2s ease-in;
  position: relative;
  top: 20px;
  left: 30px;
  z-index: 1;
  color: #090909;
  padding: 0.7em 1.7em;
  font-size: 18px;
  border-radius: 0.5em;
  background: #e8e8e8;
  border: 1px solid #e8e8e8;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
}

.button2:active {
  color: #666;
  box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
}

.button2:before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scaleY(1) scaleX(1.25);
  top: 100%;
  width: 140%;
  height: 180%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.button2:after {
  content: "";
  position: absolute;
  left: 55%;
  transform: translateX(-50%) scaleY(1) scaleX(1.45);
  top: 180%;
  width: 160%;
  height: 190%;
  background-color: #009087;
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

.button2:hover {
  color: #ffffff;
  border: 1px solid #009087;
}

.button2:hover:before {
  top: -35%;
  background-color: #009087;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.button2:hover:after {
  top: -45%;
  background-color: #009087;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.button {
  display: block;
  position: relative;
  width: 56px;
  height: 56px;
  margin: 0;
  overflow: hidden;
  outline: none;
  background-color: transparent;
  transform: scale(0.6) translateX(5px) rotate(180deg);
  transition-duration: 1s;
  border: 0;
}

.button:before,
.button:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  inset: 7px;
}

.button:before {
  border: 4px solid #f0eeef;
  transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
    transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
}

.button:after {
  //   border: 4px solid #ffd562;
  border: 4px solid @bgColor;
  transform: scale(1.3);
  transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0;
}

.button:hover:before,
.button:focus:before {
  opacity: 0;
  transform: scale(0.7);
  transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.button:hover:after,
.button:focus:after {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
    transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
}

.button-box {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}

.button-elem {
  display: block;
  width: 20px;
  height: 20px;
  margin: 17px 18px 0 18px;
  transform: rotate(180deg);
  fill: #f0eeef;
}

.button:hover .button-box,
.button:focus .button-box {
  transition: 0.4s;
  transform: translateX(-56px);
}

//侧边菜单收缩时弹出菜单选中颜色
.test {
  .el-menu {
    // 修改二级菜单整个背景颜色
    background-color: #121212;
    // 二级菜单中的子选项
    .el-menu-item {
      background-color: transparent !important;
      width: 100%;
      text-align: center;
      // 被选择的子选项
      &:not(.is-disabled):hover {
        color: #fff;
        background-color: #1e273a !important;
        width: 100%;
        text-align: center;
      }
    }
    .el-menu-item.is-active {
      border-right: 4px solid @bgColor;
      color: @bgColor;
      background-color: #1e273a;
    }
  }
  .el-menu--popup {
    color: #eee;
  }
}
</style>
