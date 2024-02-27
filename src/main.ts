import { createApp } from 'vue'
import App from './App.vue'

import router from "./routes/index";
import { createPinia } from 'pinia'
import * as echarts from 'echarts';
import Vant from 'vant';
import '../node_modules/vant/lib/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 自定义文字（使用默认文字不用设置）

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
function useTable(app: App) {
    app.use(VXETable)
}

zhCn.el.pagination.goto = '前往'
zhCn.el.pagination.pageClassifier = '页'
zhCn.el.pagination.pagesize = '条/页'
zhCn.el.pagination.total = `共 {total} 条`
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn  // 一定要加上，不然无效
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$echarts = echarts
app.use(pinia)
app.use(useTable)
app.use(Vant)
app.use(router)
app.mount('#app')
