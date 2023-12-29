<template>
    <div class="wBox">
        <div class="login">
            <h1>Login</h1>
            <div class="formt">
                <input type="text" placeholder="账号">
                <input type="password" placeholder="密码">
                <button @click="toMain()">登录</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const router = new (useRouter as any)
const toMain = () => {
    console.log(111);
    router.push("/main")
}
onMounted(() => {
})

</script>

<style scoped lang="less">
* {
    margin: 0;
    padding: 0;
    color: #eee;
}
.wBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #4f4f4f;
}

.login {
    /* 超出部分隐藏 */
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 450px;
    background-color: #666666;
    border-radius: 10px;
    box-shadow: 10px 10px 20px rgba(33, 44, 55, .3);
}

h1 {
    font-size: 45px;
    font-weight: 400;
    /* 提高层级 */
    z-index: 1;
}

.formt {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 230px;
    /* 提高层级 */
    z-index: 1;
}

input {
    width: 200px;
    height: 40px;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid #eee;
    font-size: 16px;
    outline: none;
}

input::placeholder {
    font-size: 12px;
    color: #eee;
}

button {
    width: 180px;
    height: 36px;
    border: 1px solid #eee;
    border-radius: 18px;
    background-color: transparent;
    font-size: 14px;
    cursor: pointer;
}

button:hover{
    background-color: #4f4f4f;
    box-shadow: 0 0 4px 4px #9a9a9a;
}
</style>