import { App } from 'vue';
import { ElButton, ElLink, ElContainer, ElHeader, ElMain, ElMessage, ElTable, ElTableColumn } from 'element-plus';

const ElComponents = [ElButton, ElLink, ElContainer, ElHeader, ElMain, ElMessage, ElTable, ElTableColumn];

export default function initElement(app: App): void {
  // 按需注册 Element 的组件
  ElComponents.forEach((component) => {
    app.component(component.name, component);
  });
}
