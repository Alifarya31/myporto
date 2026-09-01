# Alif Arya Ramadhan — Personal Portfolio

A modern, responsive personal portfolio website showcasing my projects, skills and certifications.

## ✨ Features

- **Dark / Light theme** toggle (remembers your choice)
- **Animated hero** with an interactive particle network (particles.js)
- **Typing effect** for rotating roles
- **Animated stat counters**
- **Glassmorphism cards** with smooth hover micro-interactions
- **Data-driven** certifications & projects (rendered from JSON)
- **Scroll progress bar**, sticky blur navbar & active-section highlighting
- **Fully responsive** and accessible (respects `prefers-reduced-motion`)
- Built with HTML, CSS, JavaScript, Bootstrap 5, AOS & Font Awesome

## 🧰 Tech Stack

`HTML5` `CSS3` `JavaScript` `Bootstrap 5` `jQuery` `particles.js` `AOS` `Font Awesome`

## 🚀 Run Locally

Because the projects & certifications are loaded via `fetch()`, you need to serve
the site over HTTP (opening `index.html` directly with `file://` will block those
requests).

Pick any one of these from the project folder:

```bash
# Python 3
python -m http.server 5500

# Node.js (no install)
npx serve .

# VS Code
# Install the "Live Server" extension → right-click index.html → "Open with Live Server"
```

Then visit <http://localhost:5500>.

## 📁 Project Structure

├── index.html # Main page
├── 404.html # Custom not-found page
├── src/
│ ├── style.css # All styles (theming, layout, components)
│ ├── script.js # App logic (theme, nav, counters, render)
│ ├── app.js # particles.js configuration
│ └── particle.js # particles.js library
├── certification/
│ ├── certification.json # Certification data
│ └── \*.png # Certificate images
├── project/
│ └── project.json # Project data
└── assets/img/ # Profile, skills, project & icon assets

## 👤 About

**Alif Arya Ramadhan** — Front-End Web Developer, UI/UX Designer & Content Creator.
Based in Bekasi, West Java, Indonesia.

- 🌐 [alifaryaramadhan.com](https://alifaryaramadhan.com/)
- 💼 [LinkedIn](https://www.linkedin.com/in/alif-arya-ramadhan-743528249/)
- 🐙 [GitHub](https://github.com/Alifarya31)
- 📝 [Blog](https://blog.alifaryaramadhan.my.id)

---

© Alif Arya Ramadhan. Crafted with ❤️ & code.
