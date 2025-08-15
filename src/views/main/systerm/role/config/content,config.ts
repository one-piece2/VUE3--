const contentConfig = {
  pagename: 'role',
  header: {
    title: '角色列表',
    btntitle: '新建角色',
  },
  propsList: [
    { type: 'selection', prop: '选择', width: '55px' },
    { type: 'index', label: '序号', prop: '序号', width: '55px' },
    { type: 'normal', label: '角色名称', prop: 'name', width: '150px' },
    { type: 'normal', label: '权限介绍', prop: 'intro', width: '150px' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作' },
  ],
};

export default contentConfig;
