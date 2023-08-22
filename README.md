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
