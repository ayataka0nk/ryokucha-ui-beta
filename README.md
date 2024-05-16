# ryokucha-ui

自分用のUIコンポーネントを作る練習

## 使い方

tailwind.config.tsのpresetsに追記

```ts
import { tailwindMD3Preset } from "@ayataka0nk/ryokucha-ui";

...

presets: [tailwindMD3Preset],
```

global.cssにmaterial design3で出力した.lightと.darkのアレをコピペ。生成方法は後で追記予定。

適当にルートでCSSをimport
```ts
import '@ayataka0nk/ryokucha-ui/dist/style.css'
```

