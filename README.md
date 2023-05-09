## 项目说明
当前工程的入口点为src/index.tsx文件, 文件中引用了md-component/one.md文件.
one.md文件中引用了two.md.
## 实战题1 - 自定义loader:
- 背景: 当前页面代码因为部分代码文件是md格式, 且.md文件里的代码还需要做一点简单处理才能正常使用. 
- **需求:** 写一个loader, 并在webpack配置中引入, 使当前代码能够被npm run build命令编译通过, 且能够在网页上正常展示

## 实战题2 - 自定义plugin:
开始此题使请先注释掉webpack的alias配置.
- 背景: 代码中使用了@component的别名替代./src/md-component文件夹路径, 为了ide能够提示正确, 我们会给tsconfig.json里配置paths, 为了webpack打包编译能够正常通过, 我们会在Webpack配置alias.
- **需求:**: 写一个plugins, 能够在webpack打包时, 动态读取tsconfig.json中的paths数据, 作为alias的配置. 使别名路径不需要同时在tsconfig.json和webpack.base.config中都配置一次

## 实战题通过条件:
页面能够正确展示two.md中的组件内容.