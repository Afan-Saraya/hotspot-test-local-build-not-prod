# Ad Rotation Logic & JSON Structure

## Overview
This admin dashboard manages content for a captive portal advertising platform. The system supports **ad rotation** where different users see different content on each page load.

---

## 🎯 Content Types

### 1. **Static Content** (No Rotation)
- Global Settings
- Chips (navigation buttons)
- Footer

### 2. **Rotating Content** (Random selection on each load)
- Hero Videos
- Hero Banners  
- Block Sets

---

## 🎬 Hero Videos (Rotating Content)

### Frontend Logic
```javascript
// On page load, select ONE random video
const selectedVideo = heroVideos[Math.floor(Math.random() * heroVideos.length)];

// Determine language (e.g., from browser or user preference)
const language = navigator.language.startsWith('bs') ? 'bosnian' : 'english';

// Display
const title = language === 'bosnian' ? selectedVideo.titleBosnian : selectedVideo.titleEnglish;
const buttonText = language === 'bosnian' ? selectedVideo.buttonTextBosnian : selectedVideo.buttonTextEnglish;
```

---

## 🖼️ Hero Banners (Rotating Content)

### Frontend Logic
```javascript
// On page load, select ONE random banner
const selectedBanner = heroBanners[Math.floor(Math.random() * heroBanners.length)];

// Display
const title = language === 'bosnian' ? selectedBanner.titleBosnian : selectedBanner.titleEnglish;
const subtitle = language === 'bosnian' ? selectedBanner.subtitleBosnian : selectedBanner.subtitleEnglish;
const buttonText = language === 'bosnian' ? selectedBanner.buttonTextBosnian : selectedBanner.buttonTextEnglish;
```

---

## 📦 Block Sets (Rotating Content with Multiple Blocks)

### Frontend Logic
```javascript
// On page load, select ONE random block set
const selectedBlockSet = blockSets[Math.floor(Math.random() * blockSets.length)];

// Display ALL blocks from the selected set
selectedBlockSet.blocks.forEach(block => {
  // Render each block with the set's styling
  renderBlock(block, selectedBlockSet.styling);
});
```

**Key Point:** When a block set is selected, ALL blocks within it are displayed together with the set's styling.

---

## 🔄 Complete Frontend Implementation

```javascript
// Fetch configuration from backend
const config = await fetch('/api/content').then(r => r.json());

// 1. ROTATION: Select random hero video (if videos exist)
if (config.heroVideos?.length > 0) {
  const randomVideo = config.heroVideos[
    Math.floor(Math.random() * config.heroVideos.length)
  ];
  renderHeroVideo(randomVideo, userLanguage);
}

// 2. ROTATION: Select random hero banner (if banners exist)
if (config.heroBanners?.length > 0) {
  const randomBanner = config.heroBanners[
    Math.floor(Math.random() * config.heroBanners.length)
  ];
  renderHeroBanner(randomBanner, userLanguage);
}

// 3. ROTATION: Select random block set and render ALL its blocks
if (config.blockSets?.length > 0) {
  const randomBlockSet = config.blockSets[
    Math.floor(Math.random() * config.blockSets.length)
  ];
  
  randomBlockSet.blocks.forEach(block => {
    renderBlock(block, randomBlockSet.styling);
  });
}
```

---

## 📋 Summary

| Content Type | Quantity Displayed | Selection Method | Changes Per |
|--------------|-------------------|------------------|-------------|
| **Global Settings** | All | N/A | Static |
| **Hero Videos** | **1 video** | Random | Page load |
| **Hero Banners** | **1 banner** | Random | Page load |
| **Block Sets** | **1 set (all blocks in it)** | Random set | Page load |
| **Chips** | All | N/A | Static |
| **Footer** | All | N/A | Static |
