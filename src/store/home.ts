import { defineStore } from 'pinia'
// useMain  可以是 useUser、useCart 之类的名字 
// defineStore('main',{..}) 在devtools 就使用 main 这个名
export const useMain = defineStore('main', {
    // 相当于data
    state: () => {
        return {
          // 所有这些属性都将自动推断其类型,如果推断失败可以试下 as xxx
        //   counter: 0,
          cebianName: "shouye|首页",
          editableTabs:[{title:"首页",name:"shouye|首页"}]
        //   menuAll:[
        //     {
        //         name:"系统管理",
        //         type:"directory", //目录
        //         index:1, //层级，可以用来排序
        //         children:[
        //             {
        //                 name:"菜单管理",
        //                 type:"menu", //菜单
        //                 index:1, //层级，可以用来排序
        //                 path:""
        //             },
        //             {
        //                 name:"用户管理",
        //                 type:"menu", //菜单
        //                 index:2, //层级，可以用来排序
        //             }
        //         ]
        //     }
        //   ]
        }
    },

    // // 相当于计算属性
    // getters: {
    //     doubleCount: (state) => {
    //         return state.counter * 2
    //     },
    // },
    // // 相当于vuex的 mutation + action，可以同时写同步和异步的代码
    // actions: {
    //     increment() {
    //       this.counter++
    //     },
    //     randomizeCounter() {
    //         setTimeout(() => {
    //             this.counter = Math.round(100 * Math.random())
    //         }, 0);
    //     },
    // },
    persist: true,
})