# Techfest 2026 - College Ambassador Landing Page

A high-fidelity, responsive landing page for the **Techfest, IIT Bombay** College Ambassador (CA) Program. Designed with a retro-futuristic, high-contrast cybernetic HUD interface.

---

## 🚀 Key Features

* **Dual Cybernetic Themes**:
  * **Default theme**: Deep Cyber-Blue (`#0a192f`) cockpit with neon-cyan accents.
  * **Holographic theme**: Light Icy-Cyan (`#e6f4f8`) high-contrast digital lab layout.
* **Interactive Terminal CLI (`CA_ENROLLMENT_PORTAL_v2026.exe`)**:
  * A full terminal command-line simulator allowing student registration with interactive terminal logs.
* **Systems Audio Engine**:
  * Retro-futuristic sound effects synthesized dynamically using the **Web Audio API** (no external audio assets required).
* **Rewards Leaderboard Matrix**:
  * Complete tiered list of campus ambassador rewards (Vouchers, Internships, Swag Kits, Accommodation packages, etc.).
* **Responsive Layout**:
  * Built using clean CSS Grid and Flexbox for seamless viewing on both mobile viewports and large desktop screens.

---

## 🛠️ Built With

* **Markup & Structure**: Semantic HTML5
* **Styling & Theme Engine**: Vanilla CSS3 Custom Variables (Tokens)
* **Logic & Audio Engine**: Vanilla ES6+ JavaScript & Web Audio API
* **Icons**: Lucide Icons

---

## 💻 How to Run Locally

Since this page uses advanced web APIs like the Web Audio API, it is recommended to run it through a local web server to avoid browser safety sandbox restrictions:

### Option A: Python Web Server (Fastest)
Run this command in your project directory:
```bash
python -m http.server 8000
```
Then navigate to **[http://localhost:8000](http://localhost:8000)** in your browser.

### Option B: Node.js (npx)
Run this command in your project directory:
```bash
npx http-server -p 8000
```
Then navigate to **[http://localhost:8000](http://localhost:8000)** in your browser.

### Option C: VS Code Live Server Extension
Open the directory in VS Code, right-click `index.html`, and choose **"Open with Live Server"**.

---

## 📂 Project Structure

```
├── assets/                  # High-quality visual assets
├── index.html               # Main landing page markup
├── style.css                # Visual theme systems, grids, and overrides
├── app.js                   # Web Audio synth engine, terminal core, and navigation
└── .gitignore               # Ignored local files
```
