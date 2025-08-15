const modelConfig = {
  header: {
    Newtitle: '创建角色',
    Edittitle: '编辑角色',
  },
  formItems: [
    { type: 'input', label: '角色名称', prop: 'name', placeholder: '请输入角色名称' },
    { type: 'input', label: '权限介绍', prop: 'intro', placeholder: '请输入权限介绍' },
    { type: 'custom', soltName: 'span', prop: 'menuList' },
  ],
  pagename: 'role',
};

export default modelConfig;
