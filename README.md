# 🚀 Negativity Shooter

## Blast away the negativity, dodge devastating boss attacks, and survive the neon battlefield in this visually stunning arcade shooter!

**Developed by: Dark Mephilus**

---

## ✨ Overview

Turn negative energy into a high score!

**Negativity Shooter** is a fast-paced, action-packed Progressive Web App (PWA) designed to challenge your reflexes and keep your adrenaline pumping. The game begins with a smooth learning curve and gradually increases in difficulty as your score rises, ensuring every session feels rewarding and exciting.

Featuring cinematic visual effects, responsive controls, immersive audio, and offline support, this game delivers an engaging experience across Desktop and Mobile devices.

---

## 🎮 Play Online

### Play the game now:

🔗 **https://dark-mephilus.github.io/Negativity-Shooter/**

If you enjoy the game, don't forget to ⭐ star the repository and share it with others!

---

## 🌟 Features

### ✅ Progressive Difficulty System

The challenge evolves as you play.

* Enemy speed increases dynamically.
* Boss attacks become more intense.
* Gameplay continuously adapts to your score.
* Easy to learn, difficult to master.

---

### ✅ AAA-Inspired Visual Effects

Experience a visually rich arcade environment featuring:

#### 🌌 Parallax Starfield

A layered moving star background creates a sense of depth and motion.

#### 💥 Particle Explosions

Enemies burst into vibrant particles upon destruction.

#### 📳 Screen Shake Effects

Feel every hit with responsive screen shake effects.

#### ✨ Neon Glow Effects

Bright neon aesthetics bring the battlefield to life.

---

### ✅ Dynamic Audio System

Powered entirely by the Web Audio API.

Includes:

* Laser shooting sounds
* Enemy destruction effects
* Boss warning alarms
* Responsive arcade-style feedback

No external audio assets required.

---

### ✅ Cross-Platform Controls

#### 🖥️ Desktop Controls

| Key      | Action     |
| -------- | ---------- |
| ←        | Move Left  |
| →        | Move Right |
| Spacebar | Shoot      |

#### 📱 Mobile Controls

* ◀ LEFT
* 🎯 SHOOT
* RIGHT ▶

Designed with glass-morphism styling and responsive touch interactions.

---

### ✅ Elegant User Interface

A stylish ℹ️ Information Button provides:

* Gameplay instructions
* PWA installation guide
* Mobile setup instructions
* Desktop installation instructions
* Smooth scrolling experience
* Traffic-Light themed UI design

---

### ✅ Progressive Web App (PWA)

Install the game directly on:

* Android Devices
* iPhones & iPads
* Windows PCs
* macOS Devices

Benefits include:

* Offline functionality
* Faster launch times
* Native app-like experience
* Home Screen support
* Taskbar integration

Works entirely offline after the first successful load.

---

## 💡 Tech Stack

Built entirely with modern web technologies:

### Frontend

* HTML5 Canvas
* CSS3
* Vanilla JavaScript

### Advanced Concepts Demonstrated

* Collision Detection (AABB)
* Particle Systems
* Dynamic Game Loops
* requestAnimationFrame Rendering
* PWA Caching
* Responsive UI Design
* Web Audio API
* Touch Event Handling

### No External Dependencies

❌ No Frameworks

❌ No Libraries

❌ No Game Engines

Pure JavaScript from start to finish.

---

## 🛠️ Setup Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Dark-Mephilus/Negativity-Shooter.git
```

Or download the ZIP file and extract it.

---

### 2️⃣ Configure PWA Assets

The repository already includes:

* `manifest.json`
* `sw.js`

To make the application fully installable, add the following icons to the project root:

```text
icon-192.png
icon-512.png
```

Ensure the filenames match those specified in `manifest.json`.

---

### 3️⃣ Run Locally

Open:

```text
index.html
```

in your preferred web browser.

#### Optional

To test offline capabilities and Service Worker functionality, use:

* VS Code Live Server Extension

or any local HTTP server.

---

## ✍️ Customization Guide

### 🏎️ Game Speed & Difficulty

Inside `script.js`:

```javascript
playerBaseSpeed
enemyBaseSpeed
speedMultiplier
```

Adjust these values to create a faster or slower gameplay experience.

---

### 🎨 Color Themes

Enemy colors are generated using:

```javascript
getRandomColor()
```

Modify this function to implement:

* Fixed themes
* Dark mode colors
* Neon palettes
* Custom branding colors

---

### ⚠️ Boss Attack Frequency

Locate:

```javascript
const bossInterval = 12000;
```

Lower values create more frequent boss attacks.

Higher values provide longer recovery periods.

---

## 🛡️ Privacy & Data Usage

### ✅ Zero Tracking

No:

* Analytics
* Cookies
* Third-party trackers

---

### ✅ Local Gameplay

All gameplay data remains within the user's browser.

Nothing is uploaded or stored remotely.

---

### ✅ No Permissions Required

The game never requests access to:

* Camera
* Microphone
* Location
* Contacts
* Files

---

## 🌐 Deployment

You can host this project for free using:

### Recommended

* GitHub Pages

### Alternatives

* Netlify
* Vercel

Deployment takes only a few minutes:

1. Upload the files.
2. Enable hosting.
3. Publish.
4. Share your game with the world.

---

## 🏆 Why This Project Stands Out

✅ Smooth Arcade Gameplay

✅ Dynamic Difficulty Scaling

✅ AAA-Style Visual Effects

✅ Fully Responsive Design

✅ Mobile & Desktop Compatible

✅ Installable PWA

✅ Offline Support

✅ Pure Vanilla JavaScript

✅ Lightweight and Fast

✅ Easy to Understand and Customize

---

## 🤝 Contributing

Contributions are always welcome!

Feel free to:

* Fork the project
* Add new enemies
* Create power-ups
* Improve visual effects
* Add new boss mechanics
* Implement cloud leaderboards
* Suggest gameplay improvements

Pull Requests are highly appreciated.

---

## 🎉 Final Words

Destroy the negativity.

Survive the chaos.

Defeat the bosses.

Set a new high score.

And most importantly...

**Have Fun! 🚀**

If you enjoyed this project:

⭐ Star the repository

🍴 Fork it

📢 Share it with others

Thank you for checking out **Negativity Shooter**!

Happy Shooting! 🎮✨
