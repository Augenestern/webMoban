<template>
    <div class="wBox">
        <el-menu class="menuSty" active-text-color="#ffd04b" :collapse="isCollapse" background-color="#666666"
            :default-active="useMain().cebianName" text-color="#fff" @select="handleSelect">
            <div style="height:50px; display: flex;align-items: center;flex-direction:row-reverse;"
                :style="{ marginRight: isCollapse ? '5px' : '0px' }">
                <button id="mybutton" class="button" @click="jiantou"
                    :style="{ transform: isCollapse ? 'scale(0.6) translateX(5px) rotate(180deg)' : 'scale(0.6) translateX(5px) rotate(0deg)' }">
                    <div class="button-box">
                        <span class="button-elem">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 40">
                                <path
                                    d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z">
                                </path>
                            </svg>
                        </span>
                        <span class="button-elem">
                            <svg viewBox="0 0 46 40">
                                <path
                                    d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z">
                                </path>
                            </svg>
                        </span>
                    </div>
                </button>
                <div v-if="!isCollapse"
                    style="text-wrap: nowrap; color: #FFD04B;font-size: 20px;font-weight: 550;position: absolute;left: 20px;">商场管理平台
                </div>
            </div>
            <el-menu-item index="shouye">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <GoodsFilled />
                    </el-icon>
                    <span>商品管理</span>
                </template>
                <el-menu-item index="shangpinLie">商品列表</el-menu-item>
                <el-menu-item index="shangpinFen">商品分类</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="changdi">
                <el-icon>
                    <WalletFilled />
                </el-icon>
                <span>场地管理</span>
            </el-menu-item>
            <el-menu-item index="dingdan">
                <el-icon>
                    <document />
                </el-icon>
                <span>销售订单</span>
            </el-menu-item>
            <el-menu-item index="caiwu">
                <el-icon>
                    <document />
                </el-icon>
                <span>财务</span>
            </el-menu-item>
            <el-menu-item index="geren">
                <el-icon>
                    <Avatar />
                </el-icon>
                <span>个人中心</span>
            </el-menu-item>
        </el-menu>
        <div class="homeMain">
            <div class="mainHeader">
                <el-popover placement="bottom-end" :width="200" trigger="hover">
                    <template #default>
                        <div class="tuichuSty" @click="tuichu">退出登录</div>
                    </template>
                    <template #reference> 
                        <div class="rightTou" style="width: 150px;height: 100%;position: absolute;right: 0px;" @mouseenter="touxEnter" @mouseleave="touxLeave">
                            <img class="imgTouxiang" src="@/assets/toux.png" alt="">
                            <div
                                style="position: absolute;right: 35px;top: 50%;transform: translateY(-50%); cursor: pointer;">
                                admin
                            </div>
                            <el-icon class="elaaa">
                                <ArrowDown />
                            </el-icon>
                        </div>
                    </template>
                </el-popover>
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
import router from '@/routes';
import { useMain } from "@/store/home.ts";
const route = new(useRoute as any)
watch(()=>route.path,()=>{
    console.log(route.path);
    useMain().cebianName = route.path.slice(1)
},{immediate:true})

let isCollapse = ref(false)
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    router.push('/'+key)
}
const jiantou = () => {
    isCollapse.value = !isCollapse.value
    document.getElementsByClassName('button')[0].style.transform = "scale(0.6) translateX(5px) rotate(0)"
    //    transform: scale(0.6) rotate(180deg) translateX(5px);
}
const touxEnter = ()=>{
    document.getElementsByClassName('elaaa')[0].style.transform = "rotate(180deg)"
}
const touxLeave = ()=>{
    document.getElementsByClassName('elaaa')[0].style.transform = ""
}

const tuichu = ()=>{
    router.push('/login')
}
onMounted(() => {
})
onUnmounted(() => {
})
</script>

<style lang="less" scoped>
.wBox {
    width: 100vw;
    height: 100vh;
    display: flex;
}

/deep/.el-sub-menu__title {
    background-color: #666666;
}

/deep/.el-menu--vertical:not(.el-menu--collapse) {
    width: 240px;
}

/deep/.is-active {
    background-color: #4f4f4f;
    // width: 400px;
}

/deep/.el-menu-item.is-active {
    border-right: 4px solid;
}


.homeMain {
    flex: auto;
    background-color: #E8E8E8;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.homeBody{
    flex: auto;
}
.rightTou:hover{
    background-color: #d5d5d5;
}
.mainHeader {
    height: 50px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 6px 12px 0px #dddddd;
    // display: flex;
    // align-items: center;
    position: relative;
}
.tuichuSty{
    height: 40px;
    display: flex;
    // justify-content: center;
    align-items: center;
    padding-left: 10px;
    box-sizing: border-box;
}
.tuichuSty:hover{
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
    border: 2px solid rgb(135, 135, 135);
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
    box-shadow: 6px 6px 12px #c5c5c5,
        -6px -6px 12px #ffffff;
}

.button2:active {
    color: #666;
    box-shadow: inset 4px 4px 12px #c5c5c5,
        inset -4px -4px 12px #ffffff;
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
    border: 4px solid #F0EEEF;
    transition: opacity .4s cubic-bezier(.77, 0, .175, 1) 80ms, transform .5s cubic-bezier(.455, .03, .515, .955) 80ms;
}

.button:after {
    border: 4px solid #ffd562;
    transform: scale(1.3);
    transition: opacity .4s cubic-bezier(.165, .84, .44, 1), transform .5s cubic-bezier(.25, .46, .45, .94);
    opacity: 0;
}

.button:hover:before,
.button:focus:before {
    opacity: 0;
    transform: scale(0.7);
    transition: opacity .4s cubic-bezier(.165, .84, .44, 1), transform .5s cubic-bezier(.25, .46, .45, .94);
}

.button:hover:after,
.button:focus:after {
    opacity: 1;
    transform: scale(1);
    transition: opacity .4s cubic-bezier(.77, 0, .175, 1) 80ms, transform .5s cubic-bezier(.455, .03, .515, .955) 80ms;
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
    fill: #F0EEEF;
}

.button:hover .button-box,
.button:focus .button-box {
    transition: .4s;
    transform: translateX(-56px);
}
</style>