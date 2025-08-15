const contentConfig = {
  pagename: 'department',
  header: {
    title: '部门列表',
    btntitle: '新建部门',
  },
  propsList: [
    { type: 'selection', prop: '选择', width: '55px' },
    { type: 'index', label: '序号', prop: '序号', width: '55px' },
    { type: 'normal', label: '部门名称', prop: 'name', width: '150px' },
    { type: 'normal', label: '部门领导', prop: 'leader', width: '150px' },
    { type: 'normal', label: '上级部门', prop: 'parentId', width: '150px' },
    { type: 'custom', label: '部门管理2', slotName: '部门' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作' },
  ],
};

export default contentConfig;
