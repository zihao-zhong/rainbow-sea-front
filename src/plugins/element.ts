import { App } from 'vue';
import {
  ElLoading,
  ElButton,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElMessage,
  ElTable,
  ElTableColumn,
  ElInput,
  ElSelect,
} from 'element-plus';

const ElComponents = [
  ElButton,
  ElLink,
  ElContainer,
  ElHeader,
  ElMain,
  ElMessage,
  ElTable,
  ElTableColumn,
  ElInput,
  ElSelect,
];

export default function initElement(app: App): void {
  // 按需注册 Element 的组件
  ElComponents.forEach((component) => {
    app.component(component.name, component);
  });

  // 注册loading指令
  app.use(ElLoading);
}
