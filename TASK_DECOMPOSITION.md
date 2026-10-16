# Work Breakdown Structure (WBS) — Exercise 1

Objective: implement `createElement`, `createTextElement` and `renderToDOM` from scratch,
render a semantic (zero div-soup) UI, prove XSS resistance, and audit DOM ↔ VNode parity.

> RULE: Never prompt AI with more than one sub-task at a time. One task = one commit.

| # | Task | Verification | Commit |
|---|------|--------------|--------|
| 1.0 | Project rules & WBS | Review | `chore: add project rules and task decomposition` |
| 1.1 | Toolchain: Vite + TypeScript (strict) + Vitest/jsdom | `npm run typecheck`, `npm test` run | `chore: scaffold vite typescript vitest toolchain` |
| 1.2 | Contract: `VNode`, `Props`, `Child` types + typeguards | Typeguard unit tests | `feat(types): define vnode contract and typeguards` |
| 1.3 | `createTextElement` + `createElement` (flatten, filter, normalize, freeze) | Unit tests | `feat(core): implement createElement factory` |
| 1.4 | Recursive `renderToDOM` + `mount` (text, elements, components, props, events) | Unit tests (jsdom) | `feat(core): implement renderToDOM` |
| 1.5 | Runtime DOM ↔ VNode parity auditor | Unit tests | `feat(audit): add vnode to dom parity auditor` |
| 1.6 | Semantic demo app with XSS checkpoint | Audit tests + DevTools | `feat(ui): mount semantic demo app with xss checkpoint` |
| 1.7 | README with run instructions and DevTools audit checklist | Manual review | `docs: add readme with devtools audit checklist` |

## Checklist

- [x] Task 1.0: Write `project-rules.md` and `TASK_DECOMPOSITION.md`
- [ ] Task 1.1: Scaffold Vite + TypeScript + Vitest toolchain
- [ ] Task 1.2: Define VNode & Props interfaces and typeguards (Contract)
- [ ] Task 1.3: Implement `createTextElement` and `createElement` flattening & mapping
- [ ] Task 1.4: Implement recursive `renderToDOM` with typeguards
- [ ] Task 1.5: Implement DOM ↔ VNode parity auditor (no orphan nodes)
- [ ] Task 1.6: Build semantic demo UI + XSS checkpoint (`<script>alert(1)</script>` as child)
- [ ] Task 1.7: Document DevTools audit procedure in README
