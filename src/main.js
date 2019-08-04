import Vue from "vue";
import { Button } from "ant-design-vue";
import App from "./App.vue";
import index from "./router";
import store from "./store";
import "./permission";

import "./icons";

import "./plugins/index";

Vue.config.productionTip = false;

Vue.use(Button);

new Vue({
  router: index,
  store,
  render: h => h(App)
}).$mount("#app");

/*
 * 1.工作机制
 *    初始化  在new Vue()之后呢 Vue会进行初始化 初始化生命周期 事件 props methods data computed watch等 最重要的是通过
 *    Object.defineProperty 设置 getter setter 属性 用来实现响应式以及依赖收集
 *    初始化之后调用 $mount挂载组件
 *    在浏览器端我们直接引入vue.js的情况 这个时候我们是携带着编译器 $mount回调用这个编译器,主要作用呢就是要生成一个渲染函数 render function
 *    就是把我们自己写的 template变成一个函数 需要经过三步  1.解析（parse会把我们写的这些解析成抽象语法树，类似于js对象，这个js对象可以描述我
 *    们所有的节点 特别像虚拟dom另外会做一些静态节点（没有绑定动态的值）的标记，当你做虚拟dom比对的时候 这些节点都是可以跳过的 最后生成代码就会把
 *    我们前面的那个抽象语法树 得到一个render 函数的字符串 （字符串形式的函数） -> new Function(renderStr) 变成一个真正的函数 我们得到的这个
 *    渲染函数 最终能形成虚拟dom 而虚拟dom变成真实dom的过程需要打补丁 会使用patch()方法 patchVnode/updateChildren
 *    上面这个是初始化流程
 *    下面是更新流程
 *    在我们舒适化的时候呢，会生成组件，这个时候我们可以对组件中的data进行一个遍历 这个过程我们称之为数据响应式啊 给所有的data都定义属性 加上getter
 *    setter 将来知道我data中的哪个数据 是和哪一个组件有关系的 进行依赖收集 收集的东西就是一个观察者 watcher 将来真正用作更新的 他怎么知道更新呢
 *    是因为我们刚才定义的setter 当有人去设置的时候会触发这个setter 然后会执行一个通知 通知所有的watcher执行更新 执行更新函数 重新打包patch 打补丁
 *    新旧dom比对 得到最小的dom的真实操作 最后映射到页面中
 * ） 2.优化 3.代码生成
 *
 * 2.vue响应式原理
 * 3.依赖收集和追踪
 * 4.编译 compile
 * */
