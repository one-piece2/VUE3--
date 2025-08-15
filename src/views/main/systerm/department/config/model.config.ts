const modelConfig = {
  header: {
    Newtitle: '新建部门',
    Edittitle: '编辑部门',
  },
  formItems: [
    { type: 'input', label: '部门名称', prop: 'name', placeholder: '请输入部门名称' },
    { type: 'input', label: '部门领导', prop: 'leader', placeholder: '请输入部门领导' },
    {
      type: 'select',
      label: '上级部门',
      prop: 'parentId',
      placeholder: '请选择',
      // 此处options不能写死，因为是从后端拿到返回来的数据，可从父组件传入子组件处，拿计算属性修改数据然后传递给子组件
      options: [],
    },
  ],
  pagename: 'department',
};

export default modelConfig;
