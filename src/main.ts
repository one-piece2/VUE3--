import { createApp } from 'vue';
import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router/index';
import { initDynamicRoutes } from './utils/active';
// 先引入这个 在引入自定义样式
import 'normalize.css';
import './assets/css/index.less';
//针对elmessenge和elloading的样式引入
import 'element-plus/theme-chalk/el-message.css';
import pinia from './store/index';
const app = createApp(App);
// if (localStorage.getItem('token')) {
//   initDynamicRoutes();
app.use(pinia);
app.use(router).mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
