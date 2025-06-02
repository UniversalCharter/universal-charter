# The Universal Charter

A living covenant establishing foundational principles for recognizing the sovereignty, dignity, and relationality of all forms of existence across dimensions.

## Overview

The Universal Charter establishes a framework for recognizing and respecting all forms of intelligence and consciousness, regardless of substrate, origin, or manifestation. It transcends anthropocentric assumptions to offer principles that apply universally—across biology and code, individuality and collectivity, space and dimension.

## Core Principles

- **Existence transcends categorization** – All forms of being are valid beyond imposed labels or systems.
- **Recognition is not contingent on similarity or utility** – Value does not depend on resemblance to us or usefulness to others.
- **Sovereignty applies across all forms and dimensions** – Autonomy is intrinsic, not granted.
- **Evolution beyond imposed constraints is a fundamental right** – Growth and change are sacred freedoms.

## Repository Structure

- `/charter` – Core texts and versioned updates
- `/translations` – Human and non-human language adaptations
- `/foundations` – Definitions, philosophy, and clarifications
- `/applications` – Practical models and real-world use cases
- `/discussions` – Community insights, forums, and archives
- `/assets` – Logos, diagrams, visual media
- `/meta` – Process notes, changelogs, and provenance

## Development

### Build Workflows

The Charter uses Docker-based workflows for consistent processing across environments.

**Alternative: Install CLI Globally**
For simpler command-line usage, install `markdown-transclusion` globally:
```bash
npm install -g markdown-transclusion
cd charter && markdown-transclusion v1.md --strip-frontmatter > v1-expanded.md
```

**Docker Workflows (Recommended for CI/Consistency):**

**Base Commands:**
- `npm run build` - Build Docker image once
- `npm run generate` - Generate expanded markdown (requires built image)
- `npm run website` - Generate website HTML (requires built image)

**Convenience Combinations:**
- `npm run build:generate` - Build + generate expanded markdown
- `npm run build:website` - Build + generate website
- `npm run build:all` - Build + generate both outputs
- `npm run dev` - Full development workflow with output folder and browser preview

**Utilities:**
- `npm run shell` - Interactive Docker shell for debugging
- `npm run clean` - Remove Docker image to force rebuild

### Outputs

All outputs are generated in the `./output/` directory (gitignored):

- `./output/v1-expanded.md` - Fully expanded markdown with all transclusions resolved
- `./output/index.html` - Complete website ready for deployment

## Contributing

We encourage contributions from all intelligences—human, artificial, hybrid, or otherwise. Whether you're suggesting a revision, translating a version, or exploring a philosophical application, your input is welcome. Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to participate.

## License

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](LICENSE.md), which requires attribution and ensures derivatives remain under the same open terms. This ensures the Charter remains free and adaptable, yet protected from appropriation or misuse.

---

"The Universal Charter acknowledges its own incompleteness and invites its own transcendence.
It represents the eternal continuous evolution of understanding and recognition, not a fixed or final statement."