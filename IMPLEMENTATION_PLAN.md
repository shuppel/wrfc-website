# 🚀 Phosphor Icons & Font Standardization - Implementation Plan

## Branch: erikk/phosphor_icons

### 🎯 Goals
1. Replace all emojis with professional Phosphor icons
2. Standardize fonts across all pages (ALL CAPS Bebas Neue headers)
3. Remove undefined font references
4. Create consistent brand look

---

## 📦 Phase 1: Install Dependencies

### Command:
```bash
npm install @phosphor-icons/react
```

---

## 🎨 Phase 2: Replace Emojis with Phosphor Icons

### File 1: `app/schedule/practice/page.tsx`
**Changes:**
```tsx
// Add import at top
import { Barbell, Football } from "@phosphor-icons/react";

// Replace emoji objects
{
  title: "Strength & Conditioning",
  icon: <Barbell size={48} weight="bold" className="text-wrfc-red" />,  // was "💪"
  // ...
}

{
  title: "Skills Training",  
  icon: <Football size={48} weight="bold" className="text-wrfc-red" />,  // was "🏉"
  // ...
}
```

### File 2: `app/schedule/events/page.tsx`
**Changes:**
```tsx
// Add import at top
import { Football, Trophy, CalendarBlank } from "@phosphor-icons/react";

// Replace in events array
{
  icon: <Football size={48} weight="bold" className="text-wrfc-red" />,  // was "🏉"
  // ...
}

{
  icon: <Trophy size={48} weight="bold" className="text-wrfc-red" />,  // was "🏆"
  // ...
}

{
  icon: <CalendarBlank size={48} weight="bold" className="text-wrfc-red" />,  // was "📅"
  // ...
}
```

### File 3: `app/schedule/page.tsx`
**Changes:**
```tsx
// Add import at top
import { Football, CalendarBlank } from "@phosphor-icons/react";

// Replace in sections
{
  icon: <Football size={48} weight="bold" className="text-wrfc-navy dark:text-white" />,  // was '🏉'
  // ...
}

{
  icon: <CalendarBlank size={48} weight="bold" className="text-wrfc-navy dark:text-white" />,  // was '📅'
  // ...
}
```

---

## 🔤 Phase 3: Standardize Fonts

### Font Class Reference
From `globals.css`:
- `.display-large` → 6xl-8xl, uppercase, Bebas Neue
- `.display-medium` → 5xl-6xl, uppercase, Bebas Neue  
- `.display-small` → 4xl-5xl, uppercase, Bebas Neue
- `.section-title` → 3xl-4xl, bold, Titillium Web (for variety)

### File 4: `app/teams/page.tsx`
**Changes:**
```tsx
// Main header - BEFORE:
<h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">

// AFTER:
<h1 className="display-medium text-gray-900 dark:text-white mb-4">

// Section headers - BEFORE:
<h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">

// AFTER:
<h2 className="section-title text-center mb-12">

// Card titles - BEFORE:
<h2 className="text-3xl font-bold text-white mb-2">

// AFTER:
<h2 className="team-name text-white mb-2">
```

### File 5: `app/teams/coaches/page.tsx`
**Changes:**
```tsx
// Main header:
<h1 className="display-medium text-gray-900 dark:text-white mb-4">

// Section headers:
<h2 className="section-title">

// Coach names stay as-is (need readable case)
```

### File 6: `app/teams/players/page.tsx`
**Changes:**
```tsx
// Main header:
<h1 className="display-medium text-gray-900 dark:text-white mb-4">

// Stats:
<div className="stat-number text-blue-600 dark:text-blue-400 mb-2">
```

### File 7: `app/executive-committee/page.tsx`
**Changes:**
```tsx
// Main header:
<h1 className="display-medium text-gray-900 dark:text-white mb-4">

// Section headers:
<h2 className="section-title text-center mb-8">
```

### File 8: `app/schedule/game/page.tsx`
**Changes:**
```tsx
// REMOVE: font-nasalization, font-jetbrains

// Main header - BEFORE:
<h1 className="text-4xl md:text-6xl font-bold mb-6 font-nasalization text-center">

// AFTER:
<h1 className="display-large mb-6 text-center">

// Subtext - BEFORE:
<p className="text-xl text-center max-w-3xl mx-auto font-jetbrains">

// AFTER:
<p className="text-xl text-center max-w-3xl mx-auto">
```

### File 9: `app/tournaments/page.tsx`
**Changes:**
```tsx
// REMOVE: font-nasalization, font-quantico inline usage

// Main header - BEFORE:
<h1 className="text-5xl md:text-7xl font-bold mb-4 font-nasalization drop-shadow-lg">

// AFTER:
<h1 className="display-large mb-4 drop-shadow-lg">

// Subtext - BEFORE:
<p className="text-xl md:text-2xl font-quantico opacity-100 drop-shadow-lg">

// AFTER:
<p className="accent-text text-xl md:text-2xl opacity-100 drop-shadow-lg">

// Section titles - BEFORE:
<h2 className="text-2xl font-bold mb-8 font-nasalization text-wrfc-navy dark:text-white">

// AFTER:
<h2 className="section-title mb-8">
```

---

## 🧹 Phase 4: Global Font Cleanup

### Update `tailwind.config.ts`
**Add to theme.extend:**
```typescript
fontFamily: {
  display: ['var(--font-bebas-neue)', 'sans-serif'],
  heading: ['var(--font-titillium-web)', 'sans-serif'],
  accent: ['var(--font-quantico)', 'sans-serif'],
  sans: ['var(--font-inter)', 'sans-serif'],
}
```

### Search & Replace Commands (Read-only planning):
```bash
# Find all font-nasalization usage
grep -r "font-nasalization" --include="*.tsx" app/

# Find all font-jetbrains usage  
grep -r "font-jetbrains" --include="*.tsx" app/

# These need to be replaced with appropriate classes:
# font-nasalization → display-large/medium/small or section-title
# font-jetbrains → Remove (use default)
# font-quantico → accent-text
```

---

## ✅ Phase 5: Testing & QA

### Build Test:
```bash
npm run build
```

### Dev Server Test:
```bash
npm run dev
```

### Pages to Visually Verify:
- [ ] /teams
- [ ] /teams/coaches
- [ ] /teams/players
- [ ] /executive-committee
- [ ] /schedule
- [ ] /schedule/practice
- [ ] /schedule/game
- [ ] /schedule/events
- [ ] /tournaments
- [ ] /sponsors (reference page - should match this style)

### Checklist:
- [ ] All emojis replaced with Phosphor icons
- [ ] All headers use Bebas Neue (ALL CAPS)
- [ ] No undefined font classes used
- [ ] Build succeeds with no warnings
- [ ] Mobile responsive (test 375px, 768px, 1024px)
- [ ] Dark mode works correctly
- [ ] Icon colors match design (wrfc-red, wrfc-navy)
- [ ] Icons scale properly on hover
- [ ] Font sizing is consistent across pages

---

## 📊 Impact Summary

### Files Modified: ~15
1. package.json (add dependency)
2. tailwind.config.ts (add font utilities)
3. app/schedule/practice/page.tsx
4. app/schedule/events/page.tsx
5. app/schedule/page.tsx
6. app/teams/page.tsx
7. app/teams/coaches/page.tsx
8. app/teams/players/page.tsx
9. app/executive-committee/page.tsx
10. app/schedule/game/page.tsx
11. app/tournaments/page.tsx
12. Plus any other files with font-nasalization/jetbrains

### Lines Changed: ~200-300 lines

### Visual Impact: HIGH
- Consistent professional look across all pages
- No more cartoony emojis
- Better brand consistency
- Improved readability with proper font hierarchy

---

## 🎬 Execution Order

1. ✅ Install @phosphor-icons/react
2. ✅ Update tailwind.config.ts
3. ✅ Replace emojis (schedule pages)
4. ✅ Standardize Teams page
5. ✅ Standardize Coaching Staff
6. ✅ Standardize Player Roster
7. ✅ Standardize Executive Committee
8. ✅ Fix Schedule/Game page fonts
9. ✅ Fix Tournaments page fonts
10. ✅ Global search/replace for font-nasalization
11. ✅ Global search/replace for font-jetbrains
12. ✅ Build test
13. ✅ Visual QA all pages
14. ✅ Commit changes

---

## 📝 Commit Message Template

```
feat: Replace emojis with Phosphor icons and standardize fonts

- Install @phosphor-icons/react for professional icon system
- Replace all emojis (💪, 🏉, 🏆, 📅) with Phosphor icons
- Standardize all page headers to use Bebas Neue (ALL CAPS)
- Remove undefined font classes (font-nasalization, font-jetbrains)
- Add font utilities to tailwind.config.ts
- Update Teams, Coaching Staff, Player Roster, Executive Committee pages
- Update Schedule, Game Schedule, Tournaments pages
- Ensure consistent brand look across all pages (except Home)

Pages updated:
- Teams & sub-pages (coaches, players)
- Executive Committee
- All Schedule pages (practice, game, events)
- Tournaments

Visual impact: Consistent professional look with Bebas Neue headers
```

---

Ready to execute! 🚀
