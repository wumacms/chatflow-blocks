# 主题定制

组件库的所有视觉变量都通过 CSS 变量暴露，覆盖即可生效，无需改动组件内部。

## 可用变量

```css
:root {
  /* 品牌色 */
  --cf-primary: #4f46e5;
  --cf-primary-hover: #4338ca;
  --cf-primary-light: #eef2ff;

  /* 圆角 */
  --cf-radius: 1rem;
  --cf-radius-sm: 0.5rem;
  --cf-radius-lg: 1.5rem;

  /* 阴影 */
  --cf-shadow: 0 10px 40px -10px rgb(0 0 0 / 0.1);
}
```

## 覆盖示例

```css
/* 在你的全局样式中，组件库样式之后引入 */
:root {
  --cf-primary: #0ea5e9;
  --cf-primary-hover: #0284c7;
}

.dark {
  --cf-primary-light: #0c2340;
}
```

## 附加类名

每个组件的 `data` 都支持 `class` 字段，可直接追加 Tailwind 类名：

```ts
const hero: HeroData = {
  title: 'Hello',
  class: 'py-32',
}
```
