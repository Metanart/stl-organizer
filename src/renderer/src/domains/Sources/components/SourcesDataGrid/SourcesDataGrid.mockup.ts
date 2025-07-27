export const SourcesDataGridMockup = {
  ROWS: [
    {
      id: '1',
      name: 'STL Library',
      path: '/Users/ilya/3dmodels/library',
      comment: 'Main storage with free models',
      isEnabled: true
    },
    {
      id: '2',
      name: 'Patreon Subs',
      path: '/Users/ilya/3dmodels/patreon',
      comment: 'Subscribed creators monthly packs',
      isEnabled: true
    },
    {
      id: '3',
      name: 'Old Archive',
      path: '/Users/ilya/3dmodels/old',
      comment: 'Legacy unorganized files',
      isEnabled: false
    },
    {
      id: '4',
      name: 'Kickstarter',
      path: '/Users/ilya/3dmodels/kickstarter',
      comment: 'Projects backed on Kickstarter',
      isEnabled: true
    },
    {
      id: '5',
      name: 'Work-In-Progress',
      path: '/Users/ilya/3dmodels/wip',
      comment: 'Unsorted models, temporary folder',
      isEnabled: false
    }
  ],
  COLUMNS: [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'path', headerName: 'Path', width: 300 },
    { field: 'comment', headerName: 'Comment', width: 250, editable: true },
    {
      field: 'isEnabled',
      headerName: 'Enabled',
      width: 120,
      type: 'boolean'
    }
  ]
}
