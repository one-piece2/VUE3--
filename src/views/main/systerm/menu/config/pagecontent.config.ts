const contentconfig = {
  pagename: 'menu',
  header: {
    title: '菜单列表',
    btntitle: '新建菜单',
  },
  propsList: [
    { label: '菜单名称', prop: 'name', width: '150px' },
    { label: '级别', prop: 'type', width: '100px' },
    { label: '菜单url', prop: 'url', width: '150px' },

    { label: '菜单icom', prop: 'icon', width: '150px' },
    { label: '排序', prop: 'sort', width: '150px' },
    { label: '权限', width: '150px', prop: 'permission' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作' },
  ],
};

export default contentconfig;
