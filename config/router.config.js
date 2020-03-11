export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      // { path: '/', redirect: '/publish/send-mr' },
      { path: '/', redirect: '/publish/projects' },
      // -------------- the code of Leslie demo
      // {
      //   path: '/demo',
      //   name: 'demo',
      //   icon: 'dashboard',
      //   routes: [
      //     {
      //       path: '/demo/products',
      //       name: 'products',
      //       component: './Demo/products',
      //     },
      //     {
      //       path: '/demo/todoList',
      //       name: 'todoList',
      //       component: './Demo/TodoList',
      //     },
      //   ],
      // },
      // publish
      {
        path: '/publish',
        name: 'publish',
        icon: 'gitlab',
        routes: [
          {
            path: '/publish/send-mr',
            name: 'send-mr',
            icon: 'rocket',
            component: './Publish/SendMR',
          },
          {
            path: '/publish/mr-accept',
            name: 'mr-accept',
            icon: 'check',
            component: './Publish/MRAccept',
          },

          // {
          //   path: '/publish/batch-tag',
          //   name: 'batch-tag',
          //   icon: 'code-sandbox',
          //   component: './Publish/BatchTag',
          // },
          {
            path: '/publish/batch-tag-basic',
            name: 'batch-tag-basic',
            icon: 'code-sandbox',
            component: './Publish/BatchTagBasic',
          },

          {
            path: '/publish/action-tag',
            name: 'action-tag',
            icon: 'tool',
            component: './Publish/ActionTag',
          },

          {
            path: '/publish/search-mr',
            name: 'search-mr',
            icon: 'search',
            component: './Publish/SearchMR',
          },
          {
            path: '/publish/branches',
            name: 'branches',
            icon: 'branches',
            component: './Publish/Branches',
          },
          {
            path: '/publish/commits',
            name: 'commits',
            icon: 'twitter',
            component: './Publish/Commits',
          },
          {
            path: '/publish/projects',
            name: 'projects',
            icon: 'project',
            component: './Publish/Projects',
          },
          {
            path: '/publish/contributors',
            name: 'contributors',
            icon: 'team',
            component: './Publish/Contributors',
          },
        ],
      },
      // jenkins
      {
        path: '/jenkins',
        name: 'jenkins',
        icon: 'deployment-unit',
        routes: [
          {
            path: '/jenkins/auth',
            name: 'auth',
            icon: 'key',
            component: './Jenkins/Auth',
          },
          {
            path: '/jenkins/job',
            name: 'job',
            icon: 'book',
            component: './Jenkins/Job',
          },
          {
            path: '/jenkins/project-info',
            name: 'info',
            icon: 'info-circle',
            component: './Jenkins/ProjectInfo',
          },
          // 误删,checkbox模式构建
          // {
          //   path: '/jenkins/pipeline',
          //   name: 'pipeline',
          //   icon: 'user',
          //   component: './Jenkins/Pipeline',
          // },
        ],
      },
      // jenkins
      {
        path: '/demos',
        name: 'demos',
        icon: 'deployment-unit',
        routes: [
          {
            path: '/demos/ref',
            name: 'ref',
            icon: 'key',
            component: './Demo/TestRef',
          },
          {
            path: '/demos/hoc',
            name: 'hoc',
            icon: 'key',
            component: './Demo/TestHoc',
          },
          {
            path: '/demos/pubsub',
            name: 'pubsub',
            icon: 'key',
            component: './Demo/PubSub',
          },
          {
            path: '/demos/hook',
            name: 'hook',
            icon: 'key',
            component: './Demo/Hook',
          },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
    ],
  },
];
