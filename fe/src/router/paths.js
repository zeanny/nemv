/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  // {
  //   path: '',
  //   // Relative to /src/views
  //   view: 'Dashboard'
  // },
  {
    path: '',
    // Relative to /src/views
    view: 'Dashboard-exo'
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/haanlp',
    name: '언어분석툴킷',
    view: 'haanlp'
  },
  {
    path: '/deidentification',
    name: '비식별화',
    view: 'deidentification'
  },
  {
    path: '/wiseqa',
    name: 'WiseQA',
    view: 'wiseqa'
  },
  {
    path: '/odwiseqa',
    name: 'ODWiseQA',
    view: 'odwiseqa'
  },
  {
    path: '/autopuntuation',
    name: '구두점복원',
    view: 'autopunctuation'
  },

  {
    path: '/Dashboard',
    view: 'Dashboard'
  },
  {
    path: '/table-list',
    name: 'Table List',
    view: 'TableList'
  },
  {
    path: '/typography',
    view: 'Typography'
  },
  {
    path: '/icons',
    view: 'Icons'
  },
  {
    path: '/maps',
    view: 'Maps'
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: 'Upgrade'
  }
]
