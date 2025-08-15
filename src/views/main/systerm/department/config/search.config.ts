const searchConfig = {
  pagename: 'department',
  formitems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入查询部门名称',
      initalvalue: 'a',
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入查询领导名称',
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间',
    },
    // {
    //   type: 'select',
    //   prop: 'enable',
    //   label: '状态',
    //   options: [
    //     {
    //       label: '启动',
    //       value: 1,
    //     },
    //     {
    //       label: '禁用',
    //       value: 0,
    //     },
    //   ],
    // },
  ],
};

export default searchConfig;
