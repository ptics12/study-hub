
/**
 * Generic quiz engine.
 * Expects a global CHAPTERS array from questions.js
 * CHAPTERS: [{ id:'ch1', title:'', description:'', questions:[ {type:'mcq'|'tf'|'short', question:'', options?:[], answer:'value or array', hint?:'' } ] }]
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

function normalize(s){ return (s??"").toString().trim().toLowerCase(); }

let state = {
  chapter:null,
  index:0,
  answers:[],
  completed:false,
  score:0
};

function getParam(name){
  const u = new URL(location.href);
  return u.searchParams.get(name);
}

function startQuiz(chId){
  const chapter = CHAPTERS.find(c=>c.id===chId) || CHAPTERS[0];
  state.chapter = chapter;
  state.index = 0; state.answers=[]; state.completed=false; state.score=0;
  $("#quiz-title").textContent = chapter.title;
  $("#quiz-meta").innerHTML = `<span class="badge">${chapter.questions.length} Questions</span>`;
  renderQuestion();
}

function renderQuestion(){
  const q = state.chapter.questions[state.index];
  $("#progress").textContent = `Question ${state.index+1} of ${state.chapter.questions.length}`;
  $("#question").textContent = q.question;

  const area = $("#answer-area");
  area.innerHTML = "";
  if(q.type==='mcq'){
    q.options.forEach((opt,i)=>{
      const id = "opt"+i;
      const div = document.createElement("label");
      div.className="option";
      div.innerHTML = `<input type="radio" name="opt" value="${opt}"> <span>${opt}</span>`;
      area.appendChild(div);
    });
  } else if(q.type==='tf'){
    ["True","False"].forEach(v=>{
      const div = document.createElement("label");
      div.className="option";
      div.innerHTML = `<input type="radio" name="opt" value="${v}"> <span>${v}</span>`;
      area.appendChild(div);
    });
  } else if(q.type==='short'){
    const input = document.createElement("input");
    input.type="text"; input.placeholder="Type your answer...";
    area.appendChild(input);
  }

  $("#prev-btn").disabled = state.index===0;
  $("#next-btn").textContent = state.index === state.chapter.questions.length-1 ? "Finish" : "Next";
}

function collectAnswer(){
  const q = state.chapter.questions[state.index];
  if(q.type==='mcq' || q.type==='tf'){
    const checked = $("input[name='opt']:checked");
    return checked ? checked.value : "";
  }else{
    const val = $("#answer-area input")?.value || "";
    return val;
  }
}

function grade(){
  let correct = 0;
  state.chapter.questions.forEach((q,i)=>{
    const userA = state.answers[i];
    if(q.type==='short'){
      const expected = Array.isArray(q.answer) ? q.answer.map(normalize) : [normalize(q.answer)];
      if(expected.includes(normalize(userA))) correct++;
    } else {
      if(normalize(userA) === normalize(q.answer)) correct++;
    }
  });
  state.score = correct;
  state.completed = true;
}

function showResult(){
  $("#quiz-box").style.display="none";
  $("#result-box").style.display="block";
  const total = state.chapter.questions.length;
  $("#result-title").textContent = `Score: ${state.score} / ${total}`;
  const percent = Math.round((state.score/total)*100);
  $("#result-detail").innerHTML = `
    <div class="score">${percent}%</div>
    <p>Great job! You can retry or pick another chapter anytime.</p>
    <div class="hero-actions">
      <a class="button" href="?chapter=${encodeURIComponent(state.chapter.id)}">Retry Chapter</a>
      <a class="button secondary" href="quiz.html">All Chapters</a>
      <a class="button" href="notes.html#${encodeURIComponent(state.chapter.id)}">Review Notes</a>
    </div>
  `;
}

document.addEventListener("click", (e)=>{
  if(e.target.id==="next-btn"){
    const ans = collectAnswer();
    state.answers[state.index] = ans;
    if(state.index < state.chapter.questions.length-1){
      state.index++; renderQuestion();
    } else {
      grade(); showResult();
    }
  }
  if(e.target.id==="prev-btn"){
    state.index = Math.max(0, state.index-1);
    renderQuestion();
  }
});

window.addEventListener("DOMContentLoaded", ()=>{
  renderChapterList();
  const chFromParam = getParam("chapter");
  if(chFromParam || $("#quiz-box")){
    startQuiz(chFromParam);
  }
});
