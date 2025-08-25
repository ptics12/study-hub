/**
 * New Quiz Engine - All Questions at Once
 * Expects global CHAPTERS array from questions.js
 */
const $ = (sel)=>document.querySelector(sel);
const $$ = (sel)=>Array.from(document.querySelectorAll(sel));

function renderChapterList(){
  const container = $("#chapter-list");
  if(!container) return;
  container.innerHTML = CHAPTERS.map(ch=>`
    <div class="chapter-card">
      <div class="badge">Chapter</div>
      <h4>${ch.title}</h4>
      <p>${ch.description||""}</p>
      <div class="chapter-actions">
        <a class="button" href="?chapter=${encodeURIComponent(ch.id)}">Start Quiz</a>
        <a class="button secondary" href="notes.html#${encodeURIComponent(ch.id)}">View Notes</a>
      </div>
    </div>
  `).join("");
}

function getParam(name){
  const u = new URL(location.href);
  return u.searchParams.get(name);
}

function normalize(s){ return (s??"").toString().trim().toLowerCase(); }

function startQuiz(chId){
  const chapter = CHAPTERS.find(c=>c.id===chId);
  if(!chapter) return;
  $("#chapters-card").style.display="none";
  const quizBox = $("#quiz-box");
  quizBox.style.display="block";
  $("#quiz-title").textContent = chapter.title;
  $("#quiz-meta").innerHTML = `<span class="badge">${chapter.questions.length} Questions</span>`;

  const form = document.createElement("form");
  form.id="quiz-form";
  form.innerHTML = chapter.questions.map((q,qi)=>{
    let html = `<div class="card" style="margin-bottom:12px">
      <div class="badge">Q${qi+1}</div>
      <p style="font-weight:600">${q.question}</p>`;
    if(q.type==='mcq'){
      html += q.options.map((opt,i)=>
        `<label class="option"><input type="radio" name="q${qi}" value="${opt}"> ${opt}</label>`
      ).join("");
    } else if(q.type==='tf'){
      ["True","False"].forEach(v=>{
        html += `<label class="option"><input type="radio" name="q${qi}" value="${v}"> ${v}</label>`;
      });
    } else if(q.type==='short'){
      html += `<input type="text" name="q${qi}" placeholder="Type your answer...">`;
    }
    html += `</div>`;
    return html;
  }).join("");

  form.innerHTML += `<div style="text-align:center;margin-top:20px">
    <button type="submit" class="button">Show Result</button>
  </div>`;
  quizBox.appendChild(form);

  form.addEventListener("submit", e=>{
    e.preventDefault();
    showResults(chapter, form);
  });
}

function showResults(chapter, form){
  const resultBox = $("#result-box");
  resultBox.style.display="block";
  $("#quiz-box").style.display="none";

  const answers = [];
  chapter.questions.forEach((q,i)=>{
    let val="";
    if(q.type==='short'){
      val = form[`q${i}`].value;
    }else{
      const inp = form[`q${i}`];
      if(inp && inp.length){ // radio group
        val = Array.from(inp).find(r=>r.checked)?.value || "";
      }else if(inp){ // single element
        val = inp.value;
      }
    }
    answers.push(val);
  });

  let correctCount=0;
  let detailHTML="";
  chapter.questions.forEach((q,i)=>{
    const userA = answers[i];
    let isCorrect=false;
    if(q.type==='short'){
      const expected = Array.isArray(q.answer)? q.answer.map(normalize) : [normalize(q.answer)];
      if(expected.includes(normalize(userA))) isCorrect=true;
    } else {
      if(normalize(userA)===normalize(q.answer)) isCorrect=true;
    }
    if(isCorrect) correctCount++;
    detailHTML += `<div class="card" style="margin-bottom:8px; border-left:6px solid ${isCorrect?"var(--success)":"var(--danger)"}">
      <p><strong>Q${i+1}:</strong> ${q.question}</p>
      <p>Your Answer: <em>${userA||"(no answer)"}</em></p>
      ${isCorrect? `<p style="color:var(--success)">✔ Correct</p>` :
        `<p style="color:var(--danger)">✘ Wrong</p><p>Correct Answer: <strong>${Array.isArray(q.answer)?q.answer.join(" / "):q.answer}</strong></p>`}
    </div>`;
  });

  $("#result-title").textContent = `Score: ${correctCount} / ${chapter.questions.length}`;
  $("#result-detail").innerHTML = detailHTML + `<div style="margin-top:12px;text-align:center">
    <a class="button" href="quiz.html?chapter=${encodeURIComponent(chapter.id)}">Retry</a>
    <a class="button secondary" href="quiz.html">Other Chapters</a>
  </div>`;
}

window.addEventListener("DOMContentLoaded", ()=>{
  renderChapterList();
  const chFromParam = getParam("chapter");
  if(chFromParam){
    startQuiz(chFromParam);
  }
});
