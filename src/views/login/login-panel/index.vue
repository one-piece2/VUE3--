<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" :stretch="true" v-model="activeName">
        <el-tab-pane name="account">
          <!--  具名插槽 -->
          <template #label>
            <div class="label">
              <el-icon style="margin-right: 5px"><UserFilled /></el-icon>账号登录
            </div>
          </template>
          <el-form label-width="60px" :model="form" :rules="rules" ref="formRef">
            <el-form-item label="账号" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="密码 " prop="password">
              <el-input v-model="form.password" show-password />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon style="margin-right: 5px"><Cellphone /></el-icon>手机登录
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="control">
      <el-checkbox v-model="checked1" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div class="login">
      <el-button
        type="primary"
        style="width: 100%; margin-top: 24px; height: 40px"
        @click="handlelogin"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, type FormInstance } from 'element-plus';
import { useLoginStore } from '../../../store/login/login';
const loginStore = useLoginStore();
const checked1 = ref(false);
// 类型也可以用InstanceType<typeof ElForm>
const formRef = ref<FormInstance>();
const handlelogin = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      //  获取输入的账号和密码

      const name = form.value.name;
      const password = form.value.password;
      // 向服务器发送请求
      loginStore.loginw({ name, password }).then((res) => {
        if (checked1.value) {
          // 如果勾选了记住密码，将账号和密码存储到 localStorage
          localStorage.setItem('username', name);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        }
      });
    } else {
      ElMessage.error('表单验证失败，请检查输入');
    }
  });
};

const activeName = ref('account');
const form = ref({
  name: localStorage.getItem('username') ?? '',
  password: localStorage.getItem('password') ?? '',
});

// 定义校验规则
const rules = ref({
  name: [
    { required: true, message: 'Please input  name', trigger: 'blur' },
    { min: 3, max: 9, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please 输入密码', trigger: 'blur' },
    { min: 5, max: 8, message: 'Length should be 5 to 8', trigger: 'blur' },
  ],
});
</script>

<style scoped>
.label {
  display: flex;
  align-items: center;
  justify-content: center;
}
.control {
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: center;
}
.login-panel {
  width: 330px;
  height: 350px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
}
</style>
