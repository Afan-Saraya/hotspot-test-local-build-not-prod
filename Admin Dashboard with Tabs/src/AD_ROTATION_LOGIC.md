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

## 📊 JSON Data Structure

### Complete Configuration Object

```json
{
  "global": {
    "backgroundColor": "rgba(255, 255, 255, 1)",
    "primaryColor": "rgba(0, 123, 255, 1)",
    "secondaryColor": "rgba(108, 117, 125, 1)"
  },
  "heroVideos": [...],
  "heroBanners": [...],
  "blockSets": [...],
  "chips": [...],
  "footer": {
    "icons": [...],
    "styling": {...}
  }
}
```

---

## 🎬 Hero Videos (Rotating Content)

### Data Structure
```json
{
  "heroVideos": [
    {
      "id": "1699876543210",
      "videoFile": "https://cdn.example.com/video1.mp4",
      "thumbnail": "https://cdn.example.com/thumb1.jpg",
      "titleBosnian": "Dobrodošli na naš portal",
      "titleEnglish": "Welcome to our portal",
      "buttonTextBosnian": "Saznaj više",
      "buttonTextEnglish": "Learn more",
      "buttonLink": "https://example.com/promo1",
      "titleColor": "rgba(255, 255, 255, 1)",
      "buttonBackground": "rgba(0, 123, 255, 1)",
      "buttonTextColor": "rgba(255, 255, 255, 1)"
    },
    {
      "id": "1699876543211",
      "videoFile": "https://cdn.example.com/video2.mp4",
      "thumbnail": "https://cdn.example.com/thumb2.jpg",
      "titleBosnian": "Nova ponuda",
      "titleEnglish": "New offer",
      "buttonTextBosnian": "Pogledaj",
      "buttonTextEnglish": "View now",
      "buttonLink": "https://example.com/promo2",
      "titleColor": "rgba(0, 0, 0, 1)",
      "buttonBackground": "rgba(220, 53, 69, 1)",
      "buttonTextColor": "rgba(255, 255, 255, 1)"
    }
  ]
}
```

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

### Example Scenario
- **Admin has 5 hero videos**
- User A loads page → Sees Video 3
- User B loads page → Sees Video 1  
- User C loads page → Sees Video 5
- User A refreshes → Sees Video 2

---

## 🖼️ Hero Banners (Rotating Content)

### Data Structure
```json
{
  "heroBanners": [
    {
      "id": "1699876543220",
      "imageFile": "https://cdn.example.com/banner1.jpg",
      "titleBosnian": "Posebna akcija",
      "titleEnglish": "Special promotion",
      "subtitleBosnian": "Uštedjite do 50%",
      "subtitleEnglish": "Save up to 50%",
      "buttonTextBosnian": "Kupi sada",
      "buttonTextEnglish": "Shop now",
      "buttonLink": "https://shop.example.com/sale",
      "titleColor": "rgba(0, 0, 0, 1)",
      "subtitleColor": "rgba(75, 85, 99, 1)",
      "buttonBackground": "rgba(0, 123, 255, 1)",
      "buttonTextColor": "rgba(255, 255, 255, 1)"
    },
    {
      "id": "1699876543221",
      "imageFile": "https://cdn.example.com/banner2.jpg",
      "titleBosnian": "Novi proizvodi",
      "titleEnglish": "New products",
      "subtitleBosnian": "Pogledajte najnovije kolekcije",
      "subtitleEnglish": "Check out the latest collections",
      "buttonTextBosnian": "Istraži",
      "buttonTextEnglish": "Explore",
      "buttonLink": "https://shop.example.com/new",
      "titleColor": "rgba(255, 255, 255, 1)",
      "subtitleColor": "rgba(226, 232, 240, 1)",
      "buttonBackground": "rgba(220, 53, 69, 1)",
      "buttonTextColor": "rgba(255, 255, 255, 1)"
    }
  ]
}
```

### Frontend Logic
```javascript
// On page load, select ONE random banner
const selectedBanner = heroBanners[Math.floor(Math.random() * heroBanners.length)];

// Determine language
const language = getUserLanguage(); // 'bosnian' or 'english'

// Display
const title = language === 'bosnian' ? selectedBanner.titleBosnian : selectedBanner.titleEnglish;
const subtitle = language === 'bosnian' ? selectedBanner.subtitleBosnian : selectedBanner.subtitleEnglish;
const buttonText = language === 'bosnian' ? selectedBanner.buttonTextBosnian : selectedBanner.buttonTextEnglish;
```

### Example Scenario
- **Admin has 10 hero banners**
- User A loads page → Sees Banner 7
- User B loads page → Sees Banner 3
- User C loads page → Sees Banner 10
- Each refresh shows a different random banner

---

## 📦 Block Sets (Rotating Content with Multiple Blocks)

### Data Structure
```json
{
  "blockSets": [
    {
      "id": "1699876543230",
      "blocks": [
        {
          "id": "1699876543231",
          "imageFile": "https://cdn.example.com/block1a.jpg",
          "title": "Product A",
          "description": "Amazing product with great features",
          "buttonText": "Learn more",
          "buttonLink": "https://example.com/product-a"
        },
        {
          "id": "1699876543232",
          "imageFile": "https://cdn.example.com/block1b.jpg",
          "title": "Product B",
          "description": "Another fantastic product",
          "buttonText": "Learn more",
          "buttonLink": "https://example.com/product-b"
        },
        {
          "id": "1699876543233",
          "imageFile": "https://cdn.example.com/block1c.jpg",
          "title": "Product C",
          "description": "The best product in category",
          "buttonText": "Learn more",
          "buttonLink": "https://example.com/product-c"
        }
      ],
      "styling": {
        "blockBackground": "rgba(255, 255, 255, 1)",
        "titleColor": "rgba(0, 0, 0, 1)",
        "descriptionColor": "rgba(75, 85, 99, 1)",
        "buttonBackground": "rgba(0, 123, 255, 1)",
        "buttonTextColor": "rgba(255, 255, 255, 1)"
      }
    },
    {
      "id": "1699876543240",
      "blocks": [
        {
          "id": "1699876543241",
          "imageFile": "https://cdn.example.com/block2a.jpg",
          "title": "Service X",
          "description": "Premium service offering",
          "buttonText": "Get started",
          "buttonLink": "https://example.com/service-x"
        },
        {
          "id": "1699876543242",
          "imageFile": "https://cdn.example.com/block2b.jpg",
          "title": "Service Y",
          "description": "Professional solutions",
          "buttonText": "Get started",
          "buttonLink": "https://example.com/service-y"
        }
      ],
      "styling": {
        "blockBackground": "rgba(248, 249, 250, 1)",
        "titleColor": "rgba(33, 37, 41, 1)",
        "descriptionColor": "rgba(108, 117, 125, 1)",
        "buttonBackground": "rgba(220, 53, 69, 1)",
        "buttonTextColor": "rgba(255, 255, 255, 1)"
      }
    }
  ]
}
```

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

### Example Scenario
**Setup:**
- Block Set 1: 3 blocks (Products A, B, C) - Blue theme
- Block Set 2: 2 blocks (Services X, Y) - Red theme
- Block Set 3: 4 blocks (Features 1, 2, 3, 4) - Green theme

**User Experience:**
- User A loads page → Sees Products A, B, C (all 3 blocks, blue theme)
- User B loads page → Sees Features 1, 2, 3, 4 (all 4 blocks, green theme)
- User C loads page → Sees Services X, Y (both blocks, red theme)

**Key Point:** When a block set is selected, ALL blocks within it are displayed together with the set's styling.

---

## 📍 Chips (Static Content)

### Data Structure
```json
{
  "chips": [
    {
      "id": "1699876543250",
      "name": "WiFi",
      "url": "https://example.com/wifi-info",
      "icon": "https://cdn.example.com/wifi-icon.png"
    },
    {
      "id": "1699876543251",
      "name": "Map",
      "url": "https://example.com/location",
      "icon": "https://cdn.example.com/map-icon.png"
    },
    {
      "id": "1699876543252",
      "name": "Support",
      "url": "https://example.com/help",
      "icon": "https://cdn.example.com/support-icon.png"
    }
  ]
}
```

### Frontend Logic
```javascript
// Display all chips in order
chips.forEach(chip => {
  renderChip(chip.icon, chip.name, chip.url);
});
```

**Note:** Chips are static - all users see the same chips.

---

## 🦶 Footer (Static Content)

### Data Structure
```json
{
  "footer": {
    "icons": [
      {
        "id": "1699876543260",
        "name": "Facebook",
        "url": "https://facebook.com/yourpage",
        "icon": "https://cdn.example.com/facebook-icon.png"
      },
      {
        "id": "1699876543261",
        "name": "Instagram",
        "url": "https://instagram.com/yourpage",
        "icon": "https://cdn.example.com/instagram-icon.png"
      },
      {
        "id": "1699876543262",
        "name": "Twitter",
        "url": "https://twitter.com/yourpage",
        "icon": "https://cdn.example.com/twitter-icon.png"
      }
    ],
    "styling": {
      "footerBackground": "rgba(33, 37, 41, 1)",
      "iconColor": "rgba(255, 255, 255, 1)",
      "textColor": "rgba(255, 255, 255, 1)"
    }
  }
}
```

### Frontend Logic
```javascript
// Apply footer styling
applyFooterStyles(footer.styling);

// Display all footer icons
footer.icons.forEach(icon => {
  renderFooterIcon(icon.icon, icon.name, icon.url, footer.styling.iconColor);
});
```

**Note:** Footer is static - all users see the same footer.

---

## 🔄 Complete Frontend Implementation Example

```javascript
// Fetch configuration from backend
const config = await fetch('/api/portal-config').then(r => r.json());

// Apply global settings
document.body.style.backgroundColor = config.global.backgroundColor;

// 1. ROTATION: Select random hero video (if videos exist)
if (config.heroVideos.length > 0) {
  const randomVideo = config.heroVideos[
    Math.floor(Math.random() * config.heroVideos.length)
  ];
  renderHeroVideo(randomVideo, userLanguage);
}

// 2. ROTATION: Select random hero banner (if banners exist)
if (config.heroBanners.length > 0) {
  const randomBanner = config.heroBanners[
    Math.floor(Math.random() * config.heroBanners.length)
  ];
  renderHeroBanner(randomBanner, userLanguage);
}

// 3. STATIC: Render all chips
config.chips.forEach(chip => renderChip(chip));

// 4. ROTATION: Select random block set and render ALL its blocks
if (config.blockSets.length > 0) {
  const randomBlockSet = config.blockSets[
    Math.floor(Math.random() * config.blockSets.length)
  ];
  
  randomBlockSet.blocks.forEach(block => {
    renderBlock(block, randomBlockSet.styling);
  });
}

// 5. STATIC: Render footer
renderFooter(config.footer);
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

---

## 💡 Best Practices

1. **Hero Videos**: Add 5-10 variations for good rotation diversity
2. **Hero Banners**: Add 10-20 banners for different campaigns/products
3. **Block Sets**: 
   - Create 3-5 different sets
   - Each set can have 2-6 blocks
   - Use different themes/products per set
4. **Bilingual Content**: Always fill both Bosnian and English fields
5. **Image Optimization**: Use CDN URLs for better performance

---

## 🚀 Backend Implementation Notes

When saving from the admin dashboard, the `handleSave()` function outputs this exact JSON structure. Your backend should:

1. **Store the JSON** in a database or file
2. **Expose an API endpoint** (e.g., `/api/portal-config`) that returns this JSON
3. **Handle file uploads** for images/videos and return CDN URLs
4. **Validate the structure** before saving

Example API response:
```javascript
GET /api/portal-config

Response:
{
  "global": {...},
  "heroVideos": [...],
  "heroBanners": [...],
  "blockSets": [...],
  "chips": [...],
  "footer": {...}
}
```
