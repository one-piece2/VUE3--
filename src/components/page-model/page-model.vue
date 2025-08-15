<template>
  <el-dialog
    v-model="openValue"
    :title="refnew ? prop.modelConfig.header.Newtitle : prop.modelConfig.header.Edittitle"
    width="500"
    center
  >
    <el-form :model="FormData" label-width="100px">
      <template v-for="item in modelConfig.formItems" :key="item.prop">
        <el-form-item :label="item.label" :prop="item.prop">
          <template v-if="item.type == 'input'">
            <el-input v-model="FormData[item.prop]" :placeholder="item.placeholder" />
          </template>
          <template v-if="item.type == 'custom'">
            <slot :name="item.soltName"></slot>
          </template>
          <template v-else-if="item.type == 'select'">
            <el-select
              v-model="FormData[item.prop]"
              :placeholder="item.placeholder"
              clearable
              filterable
            >
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-form-item>
      </template>
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
import { computed, ref } from 'vue';
import useSystermStore from '@/store/main/systerm/systerm';

interface IProps {
  modelConfig: {
    header: {
      Newtitle: string;
      Edittitle: string;
    };
    formItems: any[];
    pagename: string;
  };
  otherInfo?: any;
}
const prop = defineProps<IProps>();
const innitialform: any = {};
for (const item of prop.modelConfig.formItems) {
  innitialform[item.prop] = '';
}

const SystermStore = useSystermStore();
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
    for (const key in FormData.value) {
      FormData.value[key] = '';
    }
    openValue.value = true;
  }
}

const ID = ref<number>(0);
const FormData = ref<any>(innitialform);
const openValue = ref<boolean>(false);
const MainStore = UseMainStore();
MainStore.GetallData();
function handleCancel() {
  openValue.value = false;
}
function handleconfirm() {
  let info = FormData.value;
  if (prop.otherInfo) {
    info = { ...info, ...prop.otherInfo };
  }

  if (refnew.value) {
    SystermStore.newPagedata(prop.modelConfig.pagename, info).then(() => {
      // SystermStore.postPageListAction(prop.modelConfig.pagename, {});
      console.log(info);
      ElMessage.success('创建用户成功');
    });
    openValue.value = false;
  } else {
    // 编辑数据
    SystermStore.EditPagedatas(prop.modelConfig.pagename, info, ID.value);
    console.log(info);
    openValue.value = false;
  }
}

defineExpose({ setModelVisbal, FormData });
</script>

<style scoped></style>
