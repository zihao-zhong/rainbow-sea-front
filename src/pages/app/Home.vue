<template>
  <div>
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="phone" label="手机号码" width="150" />
      <el-table-column prop="email" label="邮件地址" width="200" />
      <el-table-column prop="qq" label="qq号码" width="120" />
      <el-table-column prop="createdBy" label="创建人" />
      <el-table-column prop="updatedBy" label="修改人" />
      <el-table-column prop="createdAt" label="创建时间" width="200" />
      <el-table-column prop="updatedAt" label="修改时间" width="200" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="handleClick(row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { getUserList } from '@/api/app';
import { User } from '@/types/user.interface';

interface State {
  userList: User[];
  tableLoading: boolean;
}

export default defineComponent({
  setup() {
    const table = reactive<State>({
      userList: [],
      tableLoading: false,
    });
    onMounted(async () => {
      table.tableLoading = true;
      table.userList = await getUserList();
      table.tableLoading = false;
    });

    const handleClick = (user: User) => {
      console.log(user);
    };

    return {
      ...toRefs(table),
      handleClick,
    };
  },
});
</script>
