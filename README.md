# Vision4X Web UI Clone

A simple structure-first web UI scaffold.

## Fundamental structure

- `index.html` — root HTML
- `styles.css` — root stylesheet loaded by `index.html`.
- `app.js` — root bootstrap script loaded by `index.html`.
- `src/` — component folder tree containing `*.js`, `*.css`, and `*.html` files.
- `build.js` — scans `src/` and injects matching files into `index.html`.

## How it works

- `build.js` walks `src/` recursively.
- It finds component CSS and JS files and inserts them into `index.html`.
- It also reads HTML files from `src/` and injects their markup into the page.
- Root `styles.css` and `app.js` remain first in import order.

## Usage

Run:

```bash
node build.js
```
…or just build inside VSC. Then open or serve `index.html`.

## Important

- `index.html` is the final entrypoint.
- `src/` is only used by the build step.
- Component files in `src/` are automatically collected and injected when you run `build.js`.
