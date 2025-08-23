# Meditation App Hero Screen - Figma Design Specifications

## 📱 **iPhone Hero Screen Design Requirements**

### **Overall Layout**
- **Device**: iPhone (375 × 667pt base, scalable)
- **Design Philosophy**: Minimalist with generous white space
- **Color Palette**: Warm + calm meditation-inspired colors

---

## 🎨 **Three Artboard Variants**

### **1. Light Mode Artboard**
- **Background**: `#FFFFFF` (Pure white)
- **Text Color**: `#2D3748` (Charcoal)
- **Subtext**: `#2D374899` (Charcoal with 60% opacity)

### **2. Dim Mode Artboard** 
- **Background**: `#1A1A1A` (Dark gray)
- **Text Color**: `#F5F5F5` (Off-white)
- **Subtext**: `#F5F5F599` (Off-white with 60% opacity)

### **3. Dark Mode Artboard**
- **Background**: `#000000` (Pure black)
- **Text Color**: `#FFFFFF` (White)
- **Subtext**: `#FFFFFF99` (White with 60% opacity)

---

## 📐 **Layout Specifications**

### **Top Section - Header**
- **Position**: 80pt from top (includes safe area)
- **Alignment**: Center
- **Bottom Margin**: 60pt

#### **Welcome Text**
- **Text**: "Welcome back"
- **Font Size**: 36px
- **Font Weight**: Bold (700)
- **Letter Spacing**: -0.5px
- **Line Height**: Auto
- **Bottom Margin**: 8pt

#### **Subheading**
- **Text**: "Find your moment of peace"
- **Font Size**: 16px
- **Font Weight**: Regular (400)
- **Line Height**: 24px
- **Opacity**: 70%

---

### **Center Section - Breathing Circle**
- **Position**: Vertically centered in remaining space
- **Bottom Margin**: 80pt

#### **Circle Specifications**
- **Diameter**: 260px
- **Stroke Width**: 2px
- **Stroke Color**: `#FF6B6B` (Coral - Vibrant awakening energy)
- **Fill**: `#FF6B6B1A` (Coral with 10% opacity - translucent)
- **Animation**: Subtle scale pulse (1.0 → 1.05 → 1.0, 6s cycle)

#### **Circle Inner Text**
- **Text**: "Breathe"
- **Font Size**: 18px
- **Font Weight**: Medium (500)
- **Letter Spacing**: 1px
- **Color**: `#FF6B6B` (Coral)

---

### **Bottom Section - Practice Cards**
- **Position**: 40pt from bottom (safe area)
- **Layout**: Horizontal, equal width with gap
- **Gap**: 16pt between cards

#### **Card Shared Properties**
- **Height**: 120pt
- **Border Radius**: 16px
- **Padding**: 16px (all sides)
- **Shadow**: 
  - Offset: 0, 4pt
  - Blur: 12pt
  - Color: `#0000001A` (light), `#00000040` (dim), `#00000060` (dark)
  - Opacity: 8% (light), 25% (dim), 38% (dark)

#### **Morning Energy Card**
- **Gradient**: Linear, top-left to bottom-right
  - Start: `#FF6B6B` (Vibrant awakening energy)
  - End: `#FFE66D` (Soft golden sunlight)
- **Icon**: 🌅 (28px)
- **Text**: "Morning Energy" (16px, Semi-bold 600, White)

#### **Evening Calm Card**
- **Gradient**: Linear, top-left to bottom-right
  - Start: `#6C5CE7` (Mystical twilight)
  - End: `#74B9FF` (Evening calm)
- **Icon**: 🌙 (28px)
- **Text**: "Evening Calm" (16px, Semi-bold 600, White)

---

## 🎯 **Component States**

### **CTA Button States**
#### **Idle State**
- Normal scale (1.0)
- Full opacity
- Normal shadow

#### **Active State** (onPress)
- Scale: 0.98
- Slightly reduced opacity (0.9)
- Maintained shadow

---

## 🔧 **Figma Component Setup**

### **Master Component Structure**
```
🧩 Hero Screen Master
├── 📱 iPhone Frame (375×667)
├── 🎨 Background (Variant Property: Light/Dim/Dark)
├── 📝 Header Section
│   ├── Welcome Text (Bold, 36px)
│   └── Subheading (Regular, 16px)
├── ⭕ Breathing Circle
│   ├── Circle Shape (260px, Coral stroke)
│   └── Breathe Text (Medium, 18px)
└── 🎴 Practice Cards Row
    ├── Morning Card (Component Instance)
    └── Evening Card (Component Instance)
```

### **Card Component Variants**
```
🧩 Practice Card Component
├── 🌅 Morning Energy Variant
│   ├── Idle State
│   └── Active State
└── 🌙 Evening Calm Variant
    ├── Idle State
    └── Active State
```

---

## 📏 **Spacing System**

### **Vertical Rhythm**
- Header top margin: 80pt
- Header bottom margin: 60pt
- Circle bottom margin: 80pt
- Cards bottom margin: 40pt

### **Horizontal Spacing**
- Screen side margins: 24pt
- Card gap: 16pt
- Card internal padding: 16pt

---

## 🎨 **Color Tokens**

### **Meditation Palette**
```css
/* Sunrise Colors */
--coral: #FF6B6B;           /* Vibrant awakening energy */
--golden: #FFE66D;          /* Soft golden sunlight */
--sky-blue: #4ECDC4;        /* Calm morning breeze */
--light-peach: #FFAAA5;     /* Gentle warmth */

/* Sunset Colors */
--deep-purple: #6C5CE7;     /* Mystical twilight */
--twilight-blue: #74B9FF;   /* Evening calm */
--warm-coral: #FD79A8;      /* Romantic dusk */
--lavender: #DDD6FE;        /* Soft serenity */

/* Neutrals */
--warm-white: #FEFEFE;
--soft-gray: #F7FAFC;
--charcoal: #2D3748;
--light-gray: #E2E8F0;
```

---

## 📤 **Deliverables Checklist**

### **Figma File Structure**
- [ ] 3 Artboards (Light/Dim/Dark variants)
- [ ] Master Hero Screen component
- [ ] Practice Card component with states
- [ ] Color styles defined
- [ ] Text styles defined
- [ ] Component variants properly set up

### **Component Variants**
- [ ] CTA Idle states
- [ ] CTA Active states (0.98 scale)
- [ ] Theme variants (Light/Dim/Dark)
- [ ] Proper naming convention

### **Assets & Specifications**
- [ ] Exported PNGs at 1x, 2x, 3x
- [ ] Design tokens documented
- [ ] Measurement annotations
- [ ] Interaction specifications

---

## 💡 **Implementation Notes**

1. **Breathing Animation**: Implement as a subtle scale animation (1.0 → 1.05) over 6 seconds
2. **Touch Feedback**: Cards should scale to 0.98 on press with smooth transition
3. **Accessibility**: Ensure proper contrast ratios and touch target sizes (44pt minimum)
4. **Responsive**: Design scales appropriately for different iPhone sizes

---

*This specification ensures pixel-perfect implementation across all three theme variants while maintaining the minimalist meditation aesthetic.*