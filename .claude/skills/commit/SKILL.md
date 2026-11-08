---
name: commit
description: Creates commits with the repo's format. Use only when the user explicitly asks for it (/commit).
disable-model-invocation: true
---

# Commit

## Format

`type(scope): description`

- In English, lowercase, no trailing period, in present tense or as a capability (`add ...`, `can remove ...`, `uses ...`).
- Title line only. No body.
- Never add `Co-Authored-By` or any other attribution line.

## Types

`feat`, `fix`, `chore`, `docs`, `tests`, `refactor`

## Scope

- The scope is the module in `src/lib/<module>`: `product`, `cart`, `customer`, `vendyx`...
- No scope when the change spans several modules or is **only** about the harness (`features/`, `.claude/`, `docs/`, `CLAUDE.md`): `docs: add features folder`.

## Steps

1. Check `git status` and `git diff` to understand the change.
2. By default, a single commit with **all** pending changes (code, `docs/`, `features/`, `.claude/`, `CLAUDE.md`, `AGENTS.md`). Split into several commits only if the user explicitly asks.
3. The type, scope and description come from the largest functional change. Small accompanying changes (docs, harness rules) aren't mentioned and don't change the message.
4. Add files by explicit path, every file `git status` shows. Never `git add -A` or `git add .`.
5. Commit with `git commit -m "<message>"`.
6. Never push.

## Examples

```
feat(cart): can update line quantity
fix(product): show variant price on product page
refactor(vendyx): move storefront client to server-only module
docs: add features folder
```
