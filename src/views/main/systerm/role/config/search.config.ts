const searchConfig = {
  pagename: 'role',
  formitems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入查询角色名称',
      initalvalue: 'a',
    },
    {
      type: 'input',
      prop: 'leader',
      label: '权限介绍',
      placeholder: '请输入权限介绍',
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间',
    },
  ],
};

export default searchConfig;
