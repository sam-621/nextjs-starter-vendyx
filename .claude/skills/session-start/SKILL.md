---
name: session-start
description: Starts working on a feature from work/features/. Use only when the user asks for it (/session-start <slug>).
argument-hint: <slug>
disable-model-invocation: true
---

# Session start

## Steps

1. Resolve the feature:
   - With an argument: `work/features/<slug>/`. If it doesn't exist, say so and stop.
   - Without an argument: list the folders in `work/features/` (except `_templates`) with `status: active` in `spec/product.md` and ask which one.
2. Read every file in `work/features/<slug>/spec/` in full.
3. Read the last 3 entries of `work/features/<slug>/log.md`, if it exists.
4. Reply to the user in a few lines: the open steps of the recommended work plan and where the last log entry left off. Ask what we're working on today.

Don't write anything in this step: the log entry is created when the first task is finished.

## During the conversation

- Follow the Work section of the root `CLAUDE.md`: log after each task, plan step marked when finished, `[slug]` line in `work/log.md` when a step is finished, `spec/` updated with what the user asks without asking for confirmation; `docs/` only with confirmation.
- Changes that aren't part of the feature go only to `work/log.md`, never to the feature's.
- `spec/product.md` is the source of truth for the business. If something the user asks contradicts it, what they ask wins: implement it and update the `spec/`.
- Before writing code, read the docs listed in the root `CLAUDE.md` for what you're about to do.
- If something you're about to write is a new decision the docs don't cover, propose the change to the doc instead of improvising.
- Don't commit. That is done with `/commit` if the user asks.
