## ⚡ 简介

uniapp-miniprogram 是一个免费开源基于 uniapp 在 vsocode 中开发的脚手架，使用各类插件和类型提示插件方便用户在 vscode 中享受丝滑开发微信小程序的方案

## 🚀 开发

```bash
# 配置
1. 一键安装 .vscode 目录中推荐的插件
2. node 版本 16+
3. pnpm 版本 8.x

# 克隆项目
git clone https://github.com/HavocZhang/uniapp-miniprogram.git

# 进入项目目录
cd uniapp-miniprogram

# 安装依赖
pnpm i

# 启动服务
pnpm dev:mp-weixin
```

根据控制台提示打开微信小程序开发工具导入编译好的项目目录

## Git 提交规范参考

- `feat` 增加新的业务功能
- `fix` 修复业务问题/BUG
- `perf` 优化性能
- `style` 更改代码风格, 不影响运行结果
- `refactor` 重构代码
- `revert` 撤销更改
- `test` 测试相关, 不涉及业务代码的更改
- `docs` 文档和注释相关
- `chore` 更新依赖/修改脚手架配置等琐事
- `workflow` 工作流改进
- `ci` 持续集成相关
- `types` 类型定义文件更改
- `wip` 开发中

## 💕 感谢 Star

小项目获取 star 不易，如果你喜欢这个项目的话，欢迎支持一个 star！

## 相关教程如下：

#### 更新到最新正式版

```
npx @dcloudio/uvm
```

此操作会更新 package.json 中 uniapp 相关依赖

#### vscode 开发需要安装的插件

- uni-create-view (不强制推荐)
- uni-helper (强烈建议安装)
- uniapp 小程序扩展 (强烈建议安装)

#### 安装类型声明文件 (脚手架已安装)

```
pnpm add @types/wechat-miniprogram @uni-helper/uni-app-types -D
```

#### 配置 tsconfig.json (脚手架已配置)

```json
{
  "extends": "@vue/tsconfig/tsconfig.json",
  "compilerOptions": {
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "lib": ["esnext", "dom"],
    "types": [
      "@dcloudio/types",
      "@types/wechat-miniprogram",
      "@uni-helper/uni-app-types"
    ]
  },
  "vueCompilerOptions": {
    "nativeTags": ["block", "component", "template", "slot"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

types 内增加

- @types/wechat-miniprogram
- @uni-helper/uni-app-types

新增 vueCompilerOptions

```json
"vueCompilerOptions": {
    "nativeTags": ["block", "component", "template", "slot"]
},
```

#### 配置 json 无法使用注释问题 (脚手架已配置)

在 vscode 设置中搜索“文件关联”设置，添加 manifest.json pages.json 值为 jsonc

```json
{
  "files.associations": {
    "manifest.json": "jsonc",
    "pages.json": "jsonc"
  }
}
```

#### 安装 uni-ui (脚手架已安装)

关于 ui 框架强烈建议使用官方 uni-ui 不推荐使用其他 ui 框架

```
pnpm add @dcloudio/uni-ui
```

配置 easycom 节点

```json
// pages.json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      // uni-ui 规则如下配置
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
    }
  },

  // 其他内容
  "pages": [
    // ...
  ]
}
```

添加 uni-ui 组件类型

```
pnpm add @uni-helper/uni-ui-types -D
```

在 tsconfig.json 中配置在 types 内

#### 增加 pinia 依赖和 pinia 持久化依赖 (脚手架已安装)

```
pnpm add pinia pinia-plugin-persistedstate
```

需要在对应的 store 内设置持久化保存到本地存储

```ts
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key);
        },
        setItem(key, value) {
          uni.setStorageSync(key, value);
        },
      },
    },
  }
```

#### 增加 unocss 支持 (脚手架已安装)

```
pnpm add unocss unocss-preset-weapp -D
```

```ts
//vite.config.ts
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    // https://github.com/antfu/unocss
    Unocss(),
  ],
});
```

根目录新建 unocss.config.ts

```ts
import presetWeapp from "unocss-preset-weapp";
import {
  extractorAttributify,
  transformerClass,
} from "unocss-preset-weapp/transformer";

const { presetWeappAttributify, transformerAttributify } =
  extractorAttributify();

export default {
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
    // attributify autocomplete
    presetWeappAttributify(),
  ],
  shortcuts: [
    {
      "border-base": "border border-gray-500_10",
      center: "flex justify-center items-center",
    },
  ],

  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
};
```

在 main.ts 中引入 css

```ts
import "uno.css";
```

#### 封装 uniapp 接口请求 (脚手架已实现)

封装的内容在 utils/http 中
使用如下：

```ts
const getData = async () => {
  const res = http({
    method: "GET",
    url: "/test/hello",
  });
  console.log(res);
};
```
