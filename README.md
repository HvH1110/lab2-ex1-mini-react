# Lab 02 · Exercise 1 — Mini-React VNode & Mounting Engine

`createElement`, `createTextElement` and `renderToDOM` implemented from scratch in strict TypeScript,
with a semantic demo UI (zero div-soup), an XSS checkpoint and a runtime VNode ↔ DOM parity audit.

- Rules: [project-rules.md](project-rules.md)
- Work breakdown: [TASK_DECOMPOSITION.md](TASK_DECOMPOSITION.md)

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit + checkpoint tests (Vitest, jsdom)
npm run typecheck  # tsc --noEmit (strict)
npm run build      # typecheck + production bundle
```

## Structure

| File | Responsibility |
|------|----------------|
| `src/types.ts` | VNode contract (`TextVNode`, `ElementVNode`, `ComponentVNode`, `Child`) and typeguards |
| `src/create-element.ts` | `createTextElement`, `createElement`: flatten, drop empty, wrap primitives, reject invalid children, freeze |
| `src/render-to-dom.ts` | `renderToDOM` (recursive), `mount` (`replaceChildren`) |
| `src/audit.ts` | `auditTree` / `auditMount`: DOM must mirror the VNode tree 1:1, flags div-soup |
| `src/app.ts`, `src/main.ts` | Semantic demo app and in-browser checkpoint assertions |
| `tests/` | Vitest suites for each module plus the Checkpoint 1 suite |

## How the engine works

```ts
createElement('main', { id: 'root-view' },
  createElement('h1', null, 'Mini React Engine'),
  '<script>alert(1)</script>',
);
// → frozen POJO
// { type: 'main', props: { id: 'root-view', children: [
//     { type: 'h1', props: { children: [{ type: 'TEXT_ELEMENT', props: { nodeValue: 'Mini React Engine', children: [] } }] } },
//     { type: 'TEXT_ELEMENT', props: { nodeValue: '<script>alert(1)</script>', children: [] } },
// ] } }
```

- **Children**: nested arrays are flattened; `null`/`undefined`/`true`/`false` are dropped; strings and numbers become
  `TEXT_ELEMENT` nodes. Anything else (plain objects, DOM nodes, functions, symbols) throws a `TypeError`.
- **Rendering**: text nodes use `document.createTextNode`. Elements use `document.createElement` + `setAttribute`
  (`className` → `class`, `htmlFor` → `for`, `true` → empty attribute, `false`/`null`/`undefined` → omitted).
  `onXxx` functions are attached with `addEventListener`. Function components are called and their output rendered.
- **Security**: `innerHTML` is never used. `innerHTML` / `outerHTML` / `dangerouslySetInnerHTML` props and string
  handlers such as `onclick: "alert(1)"` throw a `TypeError`.

## Checkpoint verification

### Security (XSS)

`'<script>alert(1)</script>'` and `'<img src=x onerror=alert(1)> Safe Text'` are passed as children. The tests in
`tests/render-to-dom.test.ts` and `tests/app.test.ts` assert that no `<script>`/`<img>` element exists and that the
text is identical to the payload. In the browser, the payload shows up as visible text and no alert fires.

### DevTools audit checklist

1. `npm run dev` and open the page in Chrome.
2. **Console**: expect `[audit] PASS: 33 VNodes ↔ 33 DOM nodes` and no assertion failures. The expanded VNode tree
   is logged below it.
3. **Elements panel**: expand `<body id="app">` and check:
   - [ ] exactly one child, `<main id="root-view">`: no orphan nodes next to it
   - [ ] `main > header, section ×3, footer`, the same order as the logged VNode tree
   - [ ] no `<div>` or `<span>` anywhere (`Ctrl+F` → `div`)
   - [ ] the payloads appear as `&lt;script&gt;…` text inside `<code>`, with no `<script>` or `<img>` element
   - [ ] the `<button>` has no `onclick` attribute; **Event Listeners** tab shows one `click` listener
4. Click **Click**: the console logs `Ping`.

## Commit history

Each task in `TASK_DECOMPOSITION.md` is one Conventional Commit. The mandatory milestones are
`feat(core): implement createElement factory` and `feat(core): implement renderToDOM`.
