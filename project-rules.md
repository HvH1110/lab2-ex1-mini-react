# Project Rules — Lab 02 / Exercise 1: Mini-React VNode & Mounting Engine

These rules are binding for every human or AI contribution to this repository.
A change that violates any rule below must not be committed.

## 1. Workflow (Anti-Monolithic Vibe Coding)

1. **Functional slicing** — work only on tasks listed in `TASK_DECOMPOSITION.md`.
2. **Contract first** — types/interfaces in `src/types.ts` are written *before* the code that uses them.
3. **Atomic generation** — one sub-task per prompt, one sub-task per commit. Never prompt AI with more than one sub-task at a time.
4. **Independent verification** — every task is verified (unit test, `npm run typecheck`, DevTools, `git diff`) before it is committed.
5. Tick the matching checkbox in `TASK_DECOMPOSITION.md` in the same commit that completes the task.

## 2. Git

- Conventional Commits: `type(scope): imperative summary` — types: `feat`, `fix`, `test`, `docs`, `chore`, `refactor`.
- Mandatory milestone commit messages (exact text):
  - `feat(core): implement createElement factory`
  - `feat(core): implement renderToDOM`
- `npm test` and `npm run typecheck` must pass before every commit.
- Never commit `node_modules/`, `dist/`, or editor/OS junk.

## 3. Language & Tooling

- TypeScript `strict` mode; no `any` (use `unknown` + typeguards).
- ES modules only, bundled with **Vite**. No Babel standalone, no CDN script tags.
- **BANNED:** `var` and implicit globals → use `const` / `let`.
- **BANNED:** `keypress` and `e.keyCode` → use `keydown` and `e.key` / `e.code`.

## 4. Security (XSS Prevention)

- **BANNED:** `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval`, `new Function`.
- Text content is created **only** via `document.createTextNode` (or `textContent`).
- Props are written with `setAttribute` / `addEventListener` — never by assigning arbitrary DOM properties.
- **BANNED:** inline event handler attributes (`onclick="..."`). Handlers are functions attached with `addEventListener`
  (Exercise 2 moves these to a root event-delegation hub).
- Checkpoint: passing `'<script>alert(1)</script>'` as a child must render as visible text, never as an element.

## 5. VNode Engine Contract

- A VNode is a frozen POJO `{ type, props: { ...attrs, children } }`. No classes, no prototype chain.
- Text leaves are always normalized to `{ type: 'TEXT_ELEMENT', props: { nodeValue, children: [] } }`.
- `props` is always an object (never `null`); `props.children` is always a flat array of VNodes.
- `null`, `undefined`, `true`, `false` children are dropped; `string` / `number` children become text VNodes.
- Anything else passed as a child is rejected with a `TypeError` (strict typeguard verification).
- Lowercase string `type` = native tag; function `type` = component.

## 6. Semantic HTML (Zero div-soup)

- **BANNED:** `<div>` and `<span>` as structural containers in the demo UI.
- Use landmark/semantic tags: `<main>`, `<header>`, `<section>`, `<article>`, `<footer>`, `<h1>`–`<h6>`, `<p>`, `<button>`, `<ul>`/`<li>`.
- Interactive elements are native (`<button>`, not a clickable `<div>`). Sections are labelled (`aria-labelledby`).

## 7. Verification / DevTools Audit

- The DOM produced by `renderToDOM` must be a 1:1 mirror of the VNode tree: same tags, same child count, same text — no orphan or extra nodes.
- `src/audit.ts` performs this parity check at runtime; the demo logs the result to the console.
- Before the milestone commits, inspect the Elements panel and confirm the tree matches (see README checklist).
