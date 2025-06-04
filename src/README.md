# STL Organizer — Project Roadmap

This file outlines the main development phases and tasks for STL Organizer, which aims to fully automate the organization and normalization of 3D model archives (STL, Chitubox, etc.) downloaded from various sources

---

## ✅ Phase 1 — Architecture & Database Design

- [x] Define core entities (`Model`, `ModelImage`, `ModelFile`, `Tag`, etc.)
- [x] Separate `input` vs `final` archives/images/files
- [x] Set up `AppConfig` and `InputDir` tables
- [x] Add `ModelStatus` enum and processing lifecycle
- [x] Introduce `ActionLog` for process history

---

## 🚧 Phase 2 — Scanning & Preview

- [ ] Iterate over all enabled `InputDir`
- [ ] Recursively scan for archives (`.zip`, `.rar`) and adjacent images
- [ ] Match archives with related images
- [ ] Extract metadata: filenames, keywords (bust, collection, author, etc.)
- [ ] Build scan preview tree and save `Model` entries in DB
- [ ] Status: `Model.status = 'new'`

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

## 🚧 Phase 6 — UI Implementation

- [ ] List all models with filters by status, tags, source folder
- [ ] Action buttons: Scan, Normalize, Archive
- [ ] Image preview from `ModelImage`
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
