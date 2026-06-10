# GİB İnteraktif - Design System & UI/UX Context

This document serves as the absolute truth for the design system, component specifications, and user flows for the "GİB İnteraktif" mobile application project. 

## Project Overview
"GİB İnteraktif" is a gamified corporate social application designed for company employees. It bridges daily corporate actions (like completing tasks) with playful mechanics.
- **Tone:** Playful but Professional (Duolingo's joy meets Linear's polish).
- **Core Loop:** EARN points (Jira tasks, events, mini-games) ➔ SPEND points (Avatar accessories) ➔ SHOW OFF (Profiles, leaderboards) ➔ COMPETE.

---

## 1. Design System (Material 3 Expressive Inspired)

### Color Palette

#### Light Mode
- **Primary (Main Actions & Nav):** `#5B5BD6` (Vivid Indigo)
- **Primary Container:** `#E6E6FB`
- **Accent / POINTS:** `#FFB020` (Warm Gold - used for coins, balances, and reward moments)
- **Success (Done/Available):** `#1FB873` (Vivid Green)
- **Danger (Errors/Insufficient Balance):** `#E5484D` (Vivid Red)
- **Surface:** `#FFFFFF`
- **Surface-2 (Cards):** `#F6F6FB`
- **Background:** `#FAFAFD`
- **Text Primary:** `#16161D`
- **Text Secondary:** `#6B6B7B`
- **Outline:** `#E2E2EC` (1px subtle border on cards)

#### Dark Mode
- **Background:** `#0E0E14`
- **Surface:** `#181820`
- **Surface-2:** `#22222E`
- **Primary:** `#8E8EF5`
- **Accent / POINTS:** `#FFC24D` (Keep it vivid gold)
- **Success:** `#1FB873`
- **Text Primary:** `#F2F2F7`
- **Text Secondary:** `#A0A0B0`

### Typography (Inter / Plus Jakarta Sans)
- **Display (Screen titles & big balances):** `28px / Bold (700)`
- **Title (Section headers):** `20px / SemiBold (600)`
- **Body (Standard text):** `15px / Regular (400)`
- **Label (Buttons, chips):** `13px / Medium (500)`
- **Caption (Small details):** `11px / Medium (500)`
- *Rule:* Point values are ALWAYS bold, gold, and accompanied by a coin icon.

### Shapes & Spacing
- **Corner Radius:** Cards = `20px`, Buttons = `16px`, Chips/Pills = `999px` (Fully rounded), Avatar Canvas = `28px`.
- **Spacing Scale:** `4px` / `8px` / `12px` / `16px` / `24px`. Use airy padding.
- **Shadows:** Light mode uses soft shadow (`y: 4, blur: 16, 8% black`). Dark mode relies on elevation and `#22222E` surface colors instead of heavy shadows.

---

## 2. Signature Components

### 1. Point Badge (Pill)
- **Structure:** Fully rounded pill containing a gold coin icon and a bold point number (e.g., `1,240 🪙`).
- **Placement:** Top-right corner of almost every main dashboard and profile screen.

### 2. Avatar View
- **Structure:** Layered avatar character component (Base body + equipped hat, glasses, outfit, background).
- **Rarity Rings:** Circular or rounded-square frame with a glowing ring indicating rarity:
  - Common: Gray ring
  - Rare: Blue glow ring
  - Epic: Purple glow ring

### 3. Bottom Navigation Bar (5 Tabs)
- **Tabs:** Home (Ana Sayfa), Görevler, Oyna, Etkinlik, Profil.
- **Style:** Material 3 style with an indigo active pill background behind the active icon. The center "Oyna" tab can have a slightly emphasized visual weight.

---

## 3. Screen Specifications

### 1. Login Screen
- Top-aligned brand logo + playful mascot illustration.
- Tagline: "Çalış. Kazan. Eğlen."
- Full-width Indigo button: "Giriş Yap".
- Large circular secondary button: "Face ID ile gir" with biometric icon.

### 2. Home / Dashboard
- Top-left greeting: "Merhaba, Ahmet 👋" + small avatar thumbnail. Top-right: Point Badge.
- **Hero Card:** Full-body current Avatar standing on a colorful gradient background. Displays current balance `1,240 🪙` in large display font and an XP progress bar showing "Seviye 4".
- **Quick Actions Row:** 4 horizontal card tiles: "Görevlerim (3 açık)", "Shop", "Oyna", "Etkinlik".
- **Mini Stat Strip:** "Bugün Kazandıkların: +120 🪙, 2 görev, 1 etkinlik".
- **Mini Leaderboard Card:** Displays top 3 colleagues with avatars and scores, ending with a "Tümünü gör ➔" text link.

### 3. Avatar & Shop Screen
- **Top Section:** Large avatar canvas preview with "Kaydet" and share actions.
- **Category Selectors:** Pill tabs for filtering items: "Şapka", "Gözlük", "Kıyafeti", "Arka Plan".
- **Item Grid:** 2-column or 3-column grid of items showing thumbnail, title, and state:
  - If owned: Displays "Sahip" or "Giyili" (with a green checkmark).
  - If locked/unaffordable: Card is slightly dimmed, showing price in gold.
- **Interactions:** - Confirmation bottom sheet when buying an affordable item: "`80 🪙 karşılığında al?`".
  - Inline error state for insufficient balance: Crimson text reading "`Yetersiz bakiye, 30 point eksik`".

### 4. Jira Görevleriyim (Task Manager)
- Header title "Görevlerim" with horizontal filter chips: "Tümü", "Yapılacak", "Devam Ediyor", "Tamamlanan".
- **Task Card UI:** Task key (`GIB-12`), Title, Story Point badge (`5 SP` in a gold-tinted pill), Assignee avatar, and a segmented control/swipe action for status changing.
- Bottom line of task card shows potential reward: "`Tamamlayınca +50 🪙`".
- **Key Success Animation State:** When a task is marked "Done", trigger a celebratory layout overlay showing a text burst: "`+50 🪙 kazandın!`" with micro-particle confetti. The card morphs into a green success state, and the global point badge counts up.
- **Empty State:** Friendly graphic with the text: "Tüm görevlerin bitti! 🎉".

### 5. Oyna (Mini Game Hub)
- **Landing State:** High-contrast game banner card, "Başla" CTA button, text showing "Bugünkü en iyi skorun: 1,840" and a hint line "Skor başına 🪙 kazan".
- **In-Game State Frame:** Reflex or quick corporate quiz UI mock, score tracker at the top, a counting-down timer line, and vibrant game asset visuals.
- **Game Over State:** Displays final score, reward message: "`+18 🪙 kazandın`", and twin actions: "Tekrar Oyna" & "Leaderboard'a bak".
- **Leaderboard Tab:** Vertical rank list. Top 3 users are displayed on a graphical podium with custom crowns. Current user row is sticky/highlighted with an indigo background tint.

### 6. Etkinlikler (Events Hub)
- **Event List Item:** Image cover or large emoji, title ("Cuma Kahve Molası ☕"), date/time, localized location tracker, avatar stacks of joiners ("+8 katılıyor"), and a horizontal capacity progress bar (e.g., 8/10).
- Action Button states: "Katıl" (Indigo) ➔ Turns into "Katıldın ✓" (Green outline/surface).
- **Create Event Form:** Input fields for title, description, location, pickers for time, and stepper for capacity. Includes inline validation handling (Red borders for errors).
- **Full State:** When capacity is full, the bar turns solid red, button disables, and displays "Kapasite Dolu".

### 7. Profil Screen
- Top layout: Large custom avatar preview, user name, department string, total accrued lifetime points, and level indicator badge.
- Grid stats for total tasks completed, events attended, and highest mini-game score.
- **Transaction History:** Linear list showing records like "`+50 Jira`", "`-80 Shop`", "`+18 Oyun`" with relative color coding (Green for plus, grey/red for minus).
- Settings items, native Dark-Mode switch toggle, and a "Çıkış Yap" option.

---

## 4. Universal Framework States
Ensure the implementation models these global UI states natively using consistent component wrappers:
- **Loading:** Skeleton shimmer effect matching exact card structure geometries.
- **Empty:** Playful system vector accompanied by a 1-line encouraging microcopy text.
- **Error:** Fixed or sticky crimson banner warning: "Bir şeyler ters gitti, tekrar dene".
- **Offline:** Minimalistic top status-bar overlay signal.
- **Success Toast:** High-z-index micro-confetti toast message for positive point ticks.
- **Confirm Sheet:** Bottom-anchored sliding modal container for transactional decisions.