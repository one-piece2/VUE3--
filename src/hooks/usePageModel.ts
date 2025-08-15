import pageModel from '@/components/page-model/page-model.vue';
import { nextTick, ref } from 'vue';
import { ElTree } from 'element-plus';
type editcallback = (data: any) => void;
function usepagemodel(tree: any, editcallback?: editcallback) {
  const modelref = ref<InstanceType<typeof pageModel>>();

  const handlecreate = () => {
    modelref.value?.setModelVisbal(true);

    tree.value?.setCheckedKeys([]);
  };

  const handedit = (x: any) => {
    modelref.value?.setModelVisbal(false, x);
    if (editcallback) {
      editcallback(x);
    }
  };
  return { modelref, handedit, handlecreate };
}
export default usepagemodel;
