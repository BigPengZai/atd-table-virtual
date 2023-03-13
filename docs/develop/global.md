# 全局组件引入

<br />
<br />

> 如果你的组件库要支持全局组件的提示,可以在文件 src/components.d.ts 中写入我们开发的组件

```js
import * as components from "./index";
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    EaButton: typeof components.Button;
    EaIcon: typeof components.Icon;
  }
}
export {};

```

> 

```js
{
  "compilerOptions": {
    ...
   
  }
}
```
