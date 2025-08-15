<template>
  <el-dialog v-model="openValue" title="新建用户" width="500" center>
    <el-form :model="FormData" label-width="100px">
      <el-form-item label="用户名" prop="name" style="width: 80%">
        <el-input v-model="FormData.name"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname" style="width: 80%">
        <el-input v-model="FormData.realname"></el-input>
      </el-form-item>
      <el-form-item v-show="refnew" label="密码" prop="password" style="width: 80%">
        <el-input v-model="FormData.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="cellphone" style="width: 80%">
        <el-input v-model="FormData.cellphone"></el-input>
      </el-form-item>
      <el-form-item label="选择角色" prop="roleId" style="width: 80%">
        <el-select v-model="FormData.roleId" placeholder="" clearable filterable>
          <el-option
            v-for="item in MainStore.rolelist"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择部门" prop="departmentId" style="width: 80%">
        <el-select v-model="FormData.departmentId" clearable filterable>
          <el-option
            v-for="item in MainStore.deparmentlist"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">Cancel</el-button>
        <el-button type="primary" @click="handleconfirm"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import UseMainStore from '@/store/main/systerm/main';
import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue';
const refnew = ref<boolean>(true);
function setModelVisbal(isnew: boolean = true, x?: any) {
  if (!isnew) {
    openValue.value = true;
    ID.value = x.id;
    for (const key in FormData.value) {
      FormData.value[key] = x[key];
    }
    refnew.value = isnew;
  } else {
    refnew.value = isnew;
    FormData.value = {
      name: '',
      realname: '',
      cellphone: '',
      password: '',
      roleId: '',
      departmentId: '',
    };
    openValue.value = true;
  }
}
const ID = ref<number>(0);
const FormData = ref<any>({
  name: '',
  realname: '',
  cellphone: '',
  password: '',
  roleId: '',
  departmentId: '',
});
const openValue = ref<boolean>(false);
const MainStore = UseMainStore();
MainStore.GetallData();
function handleCancel() {
  openValue.value = false;
}

function handleconfirm() {
  if (refnew.value) {
    MainStore.Auser(FormData.value).then(() => {
      ElMessage.success('创建用户成功');
    });
    openValue.value = false;
  } else {
    // 编辑数据
    MainStore.Edit(FormData.value, ID.value);
    openValue.value = false;
  }
}

defineExpose({ setModelVisbal, FormData });
</script>

<style scoped></style>
