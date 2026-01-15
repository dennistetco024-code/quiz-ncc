let questions=[];let current=0;let score=0;let mode='exam';let timer;let timeLeft=1800;
fetch('questions.json').then(r=>r.json()).then(d=>questions=d);
function startQuiz(m){mode=m;current=0;score=0;timeLeft=1800;
questions=questions.sort(()=>0.5-Math.random());
if(mode==='exam')questions=questions.slice(0,25);
document.getElementById('menu').classList.add('hidden');
document.getElementById('quiz').classList.remove('hidden');
if(mode==='exam')startTimer();showQuestion();}
function startTimer(){timer=setInterval(()=>{timeLeft--;
document.getElementById('timer').innerText='⏱ '+Math.floor(timeLeft/60)+':'+(timeLeft%60);
if(timeLeft<=0)finishQuiz();},1000);}
function showQuestion(){let q=questions[current];
document.getElementById('question').innerText=q.question;
let a=document.getElementById('answers');a.innerHTML='';
q.answers.forEach((t,i)=>{let b=document.createElement('button');
b.innerText=t;b.className='answer';b.onclick=()=>selectAnswer(i,b);a.appendChild(b);});}
function selectAnswer(i,b){let q=questions[current];
if(i===q.correctIndex){score++;b.classList.add('correct');}
else{b.classList.add('wrong');
document.querySelectorAll('.answer')[q.correctIndex].classList.add('correct');}}
function nextQuestion(){current++;if(current<questions.length)showQuestion();else finishQuiz();}
function finishQuiz(){clearInterval(timer);
document.getElementById('quiz').classList.add('hidden');
let r=document.getElementById('result');r.classList.remove('hidden');
let p=score>=21;
r.innerHTML='<h2>Punteggio: '+score+'/'+questions.length+'</h2><h1>'+(p?'✅ IDONEO':'❌ NON IDONEO')+'</h1>'; }