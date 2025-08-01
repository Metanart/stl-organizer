# STL Organizer — Project Roadmap

This file outlines the main development phases and tasks for STL Organizer, which aims to fully automate the organization and normalization of 3D model archives (STL, Chitubox, etc.) downloaded from various sources

---

## ✅ Phase 1 — Architecture & Database Design

- [x] Define core entities (`Model`, `ModelImage`, `ModelFile`, `Tag`, etc.)
- [x] Separate `input` vs `final` archives/images/files
- [x] Set up `AppConfig` and `InputDir` tables
- [x] Add `ModelStatus` enum and processing lifecycle
- [x] Introduce `ActionLog` for process history
- [x] Prepare DTO mappers system fro the client side
- [x] Prepare DTO mappers for the server side
- [x] Oraganize IPC API methods TS types and structure for:
  - [x] Main
  - [x] Renderer
  - [x] Preload

---

## 🚧 Phase 2 — App configuration

- [x] Create Config UI
- [x] Provide IPC API methods
- [x] Cover Config UI with logic
- [ ] Cover Config UI container with tests
- [ ] Cover Config UI with validation

---

## 🚧 Phase 3 — Source folders

- [x] Create Config UI
- [x] Provide IPC API methods
- [x] Cover Sources UI with logic
- [ ] Cover Sources UI container with tests
- [ ] Cover Sources UI with validation

---

## 🚧 Phase 2 — Source folders

- [x] Create Config UI
- [x] Provide IPC API methods
- [x] Cover Sources UI with logic
- [ ] Cover Sources UI container with tests
- [ ] Cover Sources UI with validation

---

## 🚧 Phase 3 — Models catalog

- [x] Create Models UI
- [x] Provide IPC API methods
- [x] Cover Models UI with logic
- [ ] Implement basic archives unpacking and analyze
  - [ ] Use MVPs code - minimal logic for now
  - [ ] Transfer archive
  - [ ] Unpack it
  - [ ] Roughly normalize files names
  - [ ] Find and save to DB all related images
  - [ ] Save as a Model Entoty to DB with all related images
- [ ] Cover Models UI container with tests
- [ ] Cover Models UI with validation

---

## 🚧 Phase 3 — Multithreaded Processing

- [ ] Implement task queue with `worker_threads`
- [ ] Load `maxThreads` from `AppConfig`
- [ ] Handle concurrent unpacking, hashing, and metadata extraction
- [ ] Add queue state tracking (optional: in memory or persistent)
- [ ] Log each action with `ActionLog`

---

## 🚧 Phase 4 — Normalization Engine

- [ ] Normalize archive structure (rename folders, sanitize names)
- [ ] Move related images into target folder
- [ ] Compute file hashes, image dimensions, and sizes
- [ ] Detect and record STL, Chitubox, Lychee, etc. in `ModelFile`
- [ ] Store normalized structure in `outputDir`
- [ ] Status: `Model.status = 'normalized'`

---

## 🚧 Phase 5 — Archiving

- [ ] Repack processed models into `.zip` or `.7z`
- [ ] Save metadata in `ModelArchive`
- [ ] Update status to `archived`
- [ ] Optionally delete raw content after archiving

---

## 🚧 Phase 6 — Additional UI

- [ ] List all models with filters by status, tags, source folder
- [ ] Action buttons: Scan, Normalize, Archive
- [ ] Detail view: archive contents, metadata, file list
- [ ] Action log per model (`ActionLog`)

---

## 🔄 Phase 7 — Extended Metadata & Tagging

- [ ] Add support for authors, studios, categories
- [ ] Connect `Tag` entities to models (`ModelTag`)
- [ ] Enable manual tagging in UI
- [ ] Group by collection or franchise

---

## 🧪 Phase 8 — Stability, Logs & QA

- [ ] Improve error handling and recovery (`Model.status = 'error'`)
- [ ] Implement retry queue
- [ ] Allow deletion/cleanup of broken models
- [ ] Validate archive structure and log inconsistencies

---

## ✳️ Future Ideas

- [ ] STL/Chitubox preview in-browser (e.g., Three.js)
- [ ] Automatic classification using ML (e.g., detect busts, supports)
- [ ] Export collections as web galleries
- [ ] Discord bot integration for model discovery

---

**This roadmap is iterative — priorities may shift depending on performance bottlenecks or emerging user needs.**

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ yarn
```

### Development

```bash
$ yarn dev
```

### Build

```bash
# For windows
$ yarn build:win

# For macOS
$ yarn build:mac

# For Linux
$ yarn build:linux
```
