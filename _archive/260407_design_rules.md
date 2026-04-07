# 260407 Design Rules

## Purpose

This document records the current UI and markdown rendering rules applied to this project as of `2026-04-07`.

It is written for future AI/code agents so they can reapply the same design direction without re-deriving the intent from the codebase.

Primary goal:

- Preserve the current Notion-inspired dark documentation UI
- Keep markdown image sizing hints such as `w-200`, `w-800`, `w-full`, `w-icon`
- Keep image cards visually consistent without forcing full-width layout
- Avoid reintroducing unnecessary wrappers, gradients, or decorative shells that fight the markdown content

---

## High-Level Design Direction

The site uses a `Notion-inspired dark documentation` look, but not a literal clone.

Core traits:

- Flat dark background, no page background gradient
- Clean document reading layout
- Inter typography
- Subtle blue accent
- Low-contrast borders
- Lightweight shadows only where needed
- Markdown content should remain the primary layout system

This is not a glossy landing page.
This is not a card-heavy dashboard.
This is a documentation viewer with restrained visual polish.

---

## Core Visual Tokens

These are the intended semantic tokens currently reflected in `style.css`.

### Backgrounds

- Page background: solid dark (`--bg`)
- Elevated surfaces: slightly lighter dark (`--bg-elevated`)
- Surface hover: very soft white overlay (`--bg-hover`)

### Borders

- Default border: low-contrast white alpha (`--border`)
- Stronger border: slightly stronger white alpha (`--border-strong`)

### Text

- Primary text: high legibility, not pure white
- Secondary text: subdued
- Muted text: captions, helper text, labels
- Heading text: strongest white tone

### Accent

- Single blue accent for links, focus, active navigation
- Accent must stay restrained and should not dominate the page

### Shadows

- Use subtle depth, not large neumorphic or floating-card shadows
- Image shadows should feel like a light media surface, not a panel container

---

## Layout Rules

### Global Layout

- Sticky topbar
- Sticky left sidebar on desktop
- Single centered markdown column
- Reading width intentionally narrowed for document-like density

### Content Width

- Use a constrained reading column via `--content-width`
- Current target width is approximately `820px`
- Do not widen this back to a landing-page layout unless intentionally redesigning the product

### Spacing

- Content area should have moderate side padding on desktop
- Mobile should stack naturally and preserve readability
- Avoid excessive empty space around markdown media blocks

---

## Typography Rules

### Font Stack

- Primary font: `Inter`
- Fallbacks: system sans stack

### Headings

- Strong weight
- Slightly tight letter spacing
- Compact but readable vertical rhythm

### Body Text

- Clean documentation spacing
- Avoid oversized paragraph gaps

### Captions

- Use small muted text
- Should feel like Notion media captions
- Never overpower the image or main paragraph text

---

## Image System

The image system is the most important implementation detail from this refactor.

### Design Intent

Images must satisfy all of the following:

- Respect markdown size hints embedded in alt text
- Support standalone image blocks
- Support `image + caption`
- Support `text, then markdown hard break, then image`
- Avoid forcing every image to full width
- Add subtle Notion-style media treatment using border/background/shadow only

### Size Hint Rules

Markdown alt text may contain width hints like:

- `w-100`
- `w-150`
- `w-200`
- `w-300`
- `w-400`
- `w-500`
- `w-600`
- `w-800`
- `w-1000`
- `w-1200`
- `w-full`
- `w-icon`

These hints are authoritative for image width.

Important:

- Do not add CSS that overrides these widths with `width: 100%` for image cards
- If an image is meant to stay small, such as `w-200`, it must remain small
- Image-card styling must decorate the image, not redefine its intended width

### Base Image Styling

Every markdown image should receive:

- Rounded corners
- Soft border
- Very subtle dark-theme media background
- Light surface shadow

This styling should be applied to the image element itself, not by wrapping it in a heavy outer card shell.

### What To Avoid

Do not reintroduce these patterns unless explicitly requested:

- Full-width forced image cards
- Thick outer bordered wrappers around standalone images
- Padding-based image frames that make small images look oversized
- Decorative gradient frames
- Multiple competing borders between wrapper and image

---

## Image Card Parsing Rules

Markdown is rendered with `marked`, then post-processed in the DOM.

This post-processing is necessary because markdown source may produce several image-related patterns that need normalization.

### Current Parsing Strategy

After markdown render:

1. Inspect every `p`
2. Detect whether the paragraph contains an `img`
3. If the paragraph is compatible with image-card conversion, transform it into:

```html
<figure class="image-card">
  <img class="image-card-image" ... />
  <figcaption class="image-card-caption">...</figcaption>
</figure>
```

### Supported Patterns

The parser is intended to support:

1. Standalone image paragraph

```md
![example | w-800](path/image.webp)
```

2. Image followed by caption

```md
![example | w-800](path/image.webp)
*Caption text*
```

3. Text first, then hard line break, then image

```md
Some text here.  
![example | w-800](path/image.webp)
```

In the third case:

- The leading text should remain a paragraph
- The image should be extracted into a separate figure

### Caption Allowlist

Only lightweight inline caption content should be preserved inside `figcaption`.

Allowed trailing nodes:

- text nodes
- `BR`
- `EM`
- `STRONG`

If more complex content appears after the image inside the same paragraph, do not force image-card conversion unless intentionally expanding the parser.

### Why This Exists

Do not remove the post-processing layer unless you replace it with an equally robust markdown renderer strategy.

The parser exists because pure CSS selectors were not reliable enough for all markdown image patterns, especially:

- `image + caption` in the same rendered paragraph
- hard-break-based image placement
- mixed paragraph/image structures

---

## Navigation / Chrome Rules

### Topbar

- Sticky
- Slight translucent dark background
- Light blur
- Thin bottom border

### Sidebar

- Sticky on desktop
- Quiet visual presence
- Thin right border
- No strong card framing

### Active States

- Use restrained accent background
- Avoid highly saturated buttons or tabs

---

## Markdown Styling Rules

### Links

- Blue accent
- Underlined
- Underline should be soft, not high contrast

### Code

- Inline code: compact dark pill
- Code blocks: dark inset panel with quiet border

### Blockquotes

- Accent left border
- Light accent-tinted background
- Should read as notes, not alerts

### Tables

- Full-width within content column
- Quiet borders
- Soft header background

---

## Known Implementation Constraints

### Keep Existing Markdown Conventions

This project already uses markdown files with embedded width hints in alt text.
Future work should preserve this convention because the docs depend on it heavily.

### Do Not Assume CSS Alone Is Enough

Image formatting is not purely a CSS concern in this codebase.
Some markdown image patterns require DOM restructuring after `marked.parse(...)`.

### Do Not Reintroduce Page Gradient

The page background was intentionally flattened from an earlier gradient treatment.
Keep it solid unless a full visual redesign is requested.

---

## Refactor Guidance For Future AI Agents

If updating this system later, follow these rules:

1. Preserve `w-*` hint precedence
2. Preserve the markdown-to-`figure` image normalization pass
3. Prefer styling the image itself over adding decorative outer wrappers
4. Keep the reading layout narrow and document-centric
5. Avoid “marketing site” patterns unless explicitly requested
6. When changing image logic, test at least these cases:

Case A:

```md
![small | w-200](...)
```

Case B:

```md
![large | w-800](...)
*Caption*
```

Case C:

```md
Paragraph text.  
![image | w-600](...)
```

Case D:

```md
![icon | w-icon](...)
```

7. If image behavior breaks, inspect rendered DOM first before changing CSS

---

## Files To Reference

Primary implementation files:

- `style.css`
- `script.js`
- `docs/**/*.md`

If reproducing this design in another project, start by porting:

1. Theme tokens from `style.css`
2. Markdown image width hint rules from `style.css`
3. Markdown image post-processing logic from `script.js`
4. Narrow reading layout and sticky doc-navigation structure

---

## Summary

This project currently follows a restrained dark documentation design with a Notion-like tone.

The non-negotiable implementation details are:

- solid dark page background
- narrow markdown reading column
- markdown-driven image sizing via `w-*`
- image-card normalization via DOM post-processing
- subtle media styling on the image itself

If future edits break image sizing or make images full-width by default, that is a regression relative to the intended design.
