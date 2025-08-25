
# Study Hub (SEBA & CBSE)

Pure HTML/CSS/JS website for notes and quizzes. Works on static hosting like GitHub Pages or Netlify.

## Structure
```
/index.html
/seba/notes.html
/seba/quiz.html
/seba/questions.js
/cbse/notes.html
/cbse/quiz.html
/cbse/questions.js
/assets/style.css
/assets/quiz.js
/assets/sample.pdf
/assets/sample-image.jpg
```

## How to add notes
- Open `seba/notes.html` or `cbse/notes.html`
- Duplicate an `<article class="chapter-card">...</article>` block
- Update the `id` (e.g., `ch4`) so quiz links work
- Link PDFs or images from `/assets`

## How to add quizzes
- Open `seba/questions.js` or `cbse/questions.js`
- Add a new item to `CHAPTERS` with `id`, `title`, `description`, and `questions`
- Supported question types: `mcq`, `tf`, `short`
- For short answers, you can provide an array of acceptable answers

## Hosting
- **GitHub Pages:** push the folder, then in repository settings enable Pages -> deploy from `main` branch `/root`.
- **Netlify:** drag-and-drop the folder to the Netlify dashboard (no build command needed).
