import { useLoginStore } from '@/store/login/login';
const LoginStore = useLoginStore();
function usePermission(permissionid: string) {
  const permmison = LoginStore.permission;
  return !!permmison?.find((item: any) => item.includes(permissionid));
}

export default usePermission;
