// https://umijs.org/config/
import os from 'os';
import pageRoutes from './router.config';
import webpackplugin from './plugin.config';
import defaultSettings from '../src/defaultSettings';

export default {
  // add for transfer to umi
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
        },
        polyfills: ['ie11'],
        ...(!process.env.TEST && os.platform() === 'darwin'
          ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime'],
            },
            hardSource: true,
          }
          : {}),
      },
    ],
  ],

  proxy: {
    // --------------------- ✨✨✨Gitlab 代理配置 ✨✨✨---------------------
    '/api': {
      // target: 'https://gitlab.devops.viewchain.net/api', -------- WAY_1: WORKS 👍
      target: 'https://gitlab.devops.viewchain.net',     // -------- WAY_2: WORKS 👍
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },                      -------- WAY_1: WORKS 👍
      pathRewrite: { '^/api': '/api' },                  // -------- WAY_2: WORKS 👍
      secure: false,
    },
    // --------------------- ✨✨✨ Jenkins 代理配置 (易普网) ✨✨✨---------------------
    /*** 
     * jenkins域名:  https://ci.devops.viewchain.net/job/vhepro2.0
     * 通过 【jenkins域名 + /job/{项目名称}/api】查看对应的 API, 比如:
     * https://ci.devops.viewchain.net/job/vhepro2.0/job/epro-mall/api
     * https://ci.devops.viewchain.net/job/vhepro2.0/job/epro-mall-web/api
    */
    '/job': {
      target: 'https://ci.devops.viewchain.net/job/vhepro2.0',
      changeOrigin: true,
      pathRewrite: { '^/job': '/job' },
      secure: false,
    },
    '/crumbIssuer': {
      target: 'https://ci.devops.viewchain.net',
      changeOrigin: true,
      pathRewrite: { '^/crumbIssuer': '/crumbIssuer' },
      secure: false,
    },

  },

  /**
   * 约定好的字段
   * chainWebpack, context, exportStatic, outputPath, plugins, routes, runtimePublicPath, 
   * singular, base, mountElementId, history, alias, babel, 
   * browserslist, chainConfig, copy, cssLoaderOptions, cssModulesExcludes, cssModulesWithAffix, 
   * cssnano, define, devtool, disableCSSModules, disableCSSSourceMap, disableDynamicImport, env, 
   * es5ImcompatibleVersions, externals, extraBabelIncludes, extraBabelPlugins, extraBabelPresets, 
   * extraPostCSSPlugins, hash, ignoreMomentLocale, lessLoaderOptions, manifest, proxy, publicPath, 
   * sass, theme, tsConfigFile, typescript, uglifyJSOptions, urlLoaderExcludes, mountElementId
   */

  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // 路由配置
  routes: pageRoutes,
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  externals: {
    '@antv/data-set': 'DataSet',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    name: 'ant-design-pro',
    background_color: '#FFF',
    description: 'An out-of-box UI solution for enterprise applications as a React boilerplate.',
    display: 'standalone',
    start_url: '/index.html',
    icons: [
      {
        src: '/favicon.png',
        sizes: '48x48',
        type: 'image/png',
      },
    ],
  },

  chainWebpack: webpackplugin,
  cssnano: {
    mergeRules: false,
  },
};
