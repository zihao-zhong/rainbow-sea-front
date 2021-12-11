<template>
  <div class="rs-app-home">
    <!-- <a-table :dataSource="userList" :columns="columns" :loading="tableLoading" :pagination="false" /> -->
    <img src="../../assets/imgs/81.webp" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { getUserList } from '@/api/app';
import { User } from '@/types/api/user.interface';

interface State {
  userList: User[];
  tableLoading: boolean;
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
  },
  {
    title: '邮件地址',
    dataIndex: 'email',
  },
  {
    title: 'QQ号码',
    dataIndex: 'qq',
  },
  {
    title: '创建人',
    dataIndex: 'createdBy',
  },
  {
    title: '修改人',
    dataIndex: 'updatedBy',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
  },
  {
    title: '修改时间',
    dataIndex: 'updatedAt',
  },
];

export default defineComponent({
  setup() {
    onMounted(async () => {
      table.tableLoading = true;
      table.userList = await getUserList();
      table.tableLoading = false;
    });

    const table = reactive<State>({
      userList: [],
      tableLoading: false,
    });

    const handleClick = (user: User) => {
      console.log(user);
    };

    return {
      ...toRefs(table),
      columns,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.rs-app-home {
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
