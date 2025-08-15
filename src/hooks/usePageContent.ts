import { ref } from 'vue';
import pageContent from '@/components/page-content/page-content.vue';
// 使用hooks服用逻辑

function usepagecontent() {
  const contentRef = ref<InstanceType<typeof pageContent>>();
  const handlequery = (queryinfo: any) => {
    contentRef.value?.reqPageList('department', queryinfo);
  };
  const handlereset = () => {
    contentRef.value?.reqPageList('department');
  };
  return { contentRef, handlequery, handlereset };
}

export default usepagecontent;
