// ==========================================
// 1. BASE DE DATOS DE PREGUNTAS (Estática)
// ==========================================
const quizzes = {
    'mod1': {
        title: "Cuestionario Módulo 1: Comprensión",
        questions: [
            { text: "1. ¿Qué busca la lectura crítica?", options: ["Leer rápido", "Juzgar valor y veracidad", "Memorizar"], correct: 1 },
            { text: "2. ¿Qué es la Tesis?", options: ["El título", "La idea principal/postura", "El índice"], correct: 1 },
            { text: "3. ¿Qué es lectura inferencial?", options: ["Lo explícito", "Lo que se deduce", "La opinión"], correct: 1 },
            { text: "4. Un texto informativo busca:", options: ["Entretener", "Informar objetivamente", "Persuadir"], correct: 1 },
            { text: "5. ¿Qué es marginalia?", options: ["Notas al margen", "Un tipo de margen", "Un libro"], correct: 0 }
        ]
    },
    'mod2': {
        title: "Cuestionario Módulo 2: Redacción",
        questions: [
            { text: "1. Partes fundamentales de un ensayo:", options: ["Inicio, Nudo, Desenlace", "Intro, Desarrollo, Conclusión", "Título y Texto"], correct: 1 },
            { text: "2. ¿Para qué sirven los conectores?", options: ["Decorar", "Dar cohesión y lógica", "Alargar el texto"], correct: 1 },
            { text: "3. 'Sin embargo' es un conector de:", options: ["Adición", "Oposición", "Causa"], correct: 1 },
            { text: "4. La conclusión debe:", options: ["Repetir todo", "Cerrar y sintetizar", "Introducir nuevos temas"], correct: 1 },
            { text: "5. La síntesis es:", options: ["Copiar todo", "Resumir con tus palabras", "Leer en voz alta"], correct: 1 }
        ]
    },
    'mod3': {
        title: "Cuestionario Módulo 3: Estudio",
        questions: [
            { text: "1. SQ3R significa:", options: ["Survey, Question, Read, Recite, Review", "Scan, Quick, Read, Run, Repeat", "Study, Quiet, Read, Rest, Relax"], correct: 0 },
            { text: "2. La memoria a corto plazo dura:", options: ["Días", "Segundos (15-30s)", "Años"], correct: 1 },
            { text: "3. Un mapa conceptual usa:", options: ["Solo imágenes", "Conceptos y enlaces", "Párrafos largos"], correct: 1 },
            { text: "4. Mnemotecnia ayuda a:", options: ["Leer rápido", "Memorizar", "Escribir"], correct: 1 },
            { text: "5. El Método Cornell es para:", options: ["Tomar apuntes", "Dormir mejor", "Hacer deporte"], correct: 0 }
        ]
    },
    'mod4': {
        title: "Cuestionario Módulo 4: Tiempo",
        questions: [
            { text: "1. La Matriz de Eisenhower clasifica por:", options: ["Fácil/Difícil", "Urgente/Importante", "Gustar/No gustar"], correct: 1 },
            { text: "2. Un Pomodoro dura:", options: ["60 min", "25 min", "10 min"], correct: 1 },
            { text: "3. Tareas Importantes pero NO Urgentes:", options: ["Se hacen ya", "Se planifican", "Se delegan"], correct: 1 },
            { text: "4. El descanso corto en Pomodoro es de:", options: ["30 min", "5 min", "1 hora"], correct: 1 },
            { text: "5. Procrastinar es:", options: ["Ser eficiente", "Posponer tareas", "Adelantar trabajo"], correct: 1 }
        ]
    }
};

// ==========================================
// 2. SISTEMA DE CALIFICACIONES (Con Persistencia)
// ==========================================

// Datos por defecto si no hay nada guardado
const defaultGrades = {
    'mod1': { name: 'Cuestionario Módulo 1', status: 'Pendiente', score: null },
    'mod2': { name: 'Cuestionario Módulo 2', status: 'Pendiente', score: null },
    'mod3': { name: 'Cuestionario Módulo 3', status: 'Pendiente', score: null },
    'mod4': { name: 'Cuestionario Módulo 4', status: 'Pendiente', score: null }
};

// Cargar desde LocalStorage o usar defecto
let gradesData = JSON.parse(localStorage.getItem('sdm_grades')) || defaultGrades;

// Función para guardar en LocalStorage y Consola
function saveGrades() {
    localStorage.setItem('sdm_grades', JSON.stringify(gradesData));
    console.log("💾 [SISTEMA] Calificaciones guardadas en memoria:", gradesData);
}

// ==========================================
// 3. SISTEMA DE FORO (Con Persistencia)
// ==========================================

// Hilos por defecto
const defaultThreads = [
    {
        id: 'thread-default-1',
        author: 'Juan Pérez',
        title: 'Duda sobre la Matriz de Eisenhower',
        date: 'Ayer',
        content: 'Hola a todos, no me queda claro cómo diferenciar entre "Urgente" e "Importante". ¿Algún consejo?',
        replies: []
    },
    {
        id: 'thread-default-2',
        author: 'María González',
        title: 'Presentación: ¡Hola Clase!',
        date: '10 Nov 2025',
        content: 'Soy María, estudiante de Pedagogía. Me interesa mucho aprender sobre el método SQ3R. ¡Éxito a todos!',
        replies: []
    }
];

// Cargar foro
let forumData = JSON.parse(localStorage.getItem('sdm_forum')) || defaultThreads;

function saveForum() {
    localStorage.setItem('sdm_forum', JSON.stringify(forumData));
    console.log("💾 [SISTEMA] Foro actualizado guardado:", forumData);
}

// ==========================================
// 4. LÓGICA DE NAVEGACIÓN
// ==========================================
function showSection(sectionId, element) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    if(element) element.classList.add('active');
    if (window.innerWidth <= 768) toggleMenu();
}

const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) { sidebar.classList.add('show'); overlay.classList.add('show'); }
    else { sidebar.classList.remove('show'); overlay.classList.remove('show'); }
}
menuBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// ==========================================
// 5. LÓGICA DE CUESTIONARIOS
// ==========================================
let currentQuizModule = null;

function openQuizModal(moduleId) {
    currentQuizModule = moduleId;
    const quiz = quizzes[moduleId];
    const container = document.getElementById('quiz-form-container');
    document.getElementById('modal-quiz-title').innerText = quiz.title;
    
    let html = '';
    quiz.questions.forEach((q, index) => {
        html += `<div class="quiz-question"><p>${q.text}</p>`;
        q.options.forEach((opt, optIndex) => {
            html += `<label class="quiz-option"><input type="radio" name="q${index}" value="${optIndex}"> ${opt}</label>`;
        });
        html += `</div>`;
    });
    container.innerHTML = html;
    document.getElementById('quizModal').style.display = 'flex';
}

function closeQuizModal() { document.getElementById('quizModal').style.display = 'none'; }

function submitQuiz() {
    if (!currentQuizModule) return;
    const quiz = quizzes[currentQuizModule];
    let score = 0;
    const pointsPerQuestion = 10 / quiz.questions.length;

    quiz.questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) score += pointsPerQuestion;
    });

    // Guardar datos
    gradesData[currentQuizModule].status = 'Calificado';
    gradesData[currentQuizModule].score = score;
    saveGrades(); // Persistencia

    closeQuizModal();
    updateButtonsState(); // Bloquear botones si ya se hizo
    renderGrades();
    alert(`Cuestionario finalizado. Tu calificación es: ${score}/10`);
}

function submitAssignment(moduleId, activityName) {
    const randomScore = (Math.random() * (10 - 8) + 8).toFixed(1);
    
    gradesData[moduleId].status = 'Calificado';
    gradesData[moduleId].score = randomScore;
    saveGrades(); // Persistencia

    updateButtonsState();
    renderGrades();
    alert(`Tarea entregada. Calificación simulada: ${randomScore}`);
}

// Bloquea botones de actividades ya realizadas
function updateButtonsState() {
    for (const modId in gradesData) {
        if (gradesData[modId].status === 'Calificado') {
            // Intenta encontrar botones de quiz
            const btnQuiz = document.getElementById(`btn-quiz-${modId}`);
            if (btnQuiz) {
                btnQuiz.innerText = `Calificación: ${gradesData[modId].score}/10`;
                btnQuiz.disabled = true;
                btnQuiz.style.backgroundColor = "#6c757d";
            }
            // Intenta encontrar botones de tarea normal (por si acaso)
            const btnTask = document.getElementById(`btn-${modId}`);
            if (btnTask) {
                btnTask.innerText = "Entregado";
                btnTask.disabled = true;
                btnTask.style.backgroundColor = "#6c757d";
            }
        }
    }
}

function renderGrades() {
    const tbody = document.getElementById('grades-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    for (const key in gradesData) {
        const item = gradesData[key];
        let badgeClass = 'pending';
        let scoreDisplay = '-- / 10';
        if (item.status === 'Calificado') {
            badgeClass = 'submitted';
            scoreDisplay = `<strong>${item.score}</strong> / 10`;
        }
        const row = `<tr><td>${item.name}</td><td><span class="grade-pill ${badgeClass}">${item.status}</span></td><td>${scoreDisplay}</td></tr>`;
        tbody.innerHTML += row;
    }
}

// ==========================================
// 6. LÓGICA DEL FORO (DINÁMICO + GUARDADO)
// ==========================================

function renderForum() {
    const container = document.getElementById('forum-threads-container');
    container.innerHTML = ''; // Limpiar y reconstruir

    forumData.forEach(thread => {
        // Construir HTML de respuestas previas
        let repliesHTML = '';
        thread.replies.forEach(reply => {
            repliesHTML += `
                <div class="forum-reply">
                    <span class="reply-meta">Autor: <strong>${reply.author}</strong> | Fecha: ${reply.date}</span>
                    <p>${reply.content}</p>
                </div>
            `;
        });

        // HTML del Hilo
        const threadHTML = `
            <div class="forum-thread" id="${thread.id}">
                <div class="thread-header">
                    <span class="thread-title">${thread.title}</span>
                    <span class="thread-meta">Autor: ${thread.author} | Fecha: ${thread.date}</span>
                </div>
                <div class="thread-body"><p>${thread.content}</p></div>
                
                <div id="responses-${thread.id}">
                    ${repliesHTML}
                </div>

                <div class="thread-actions">
                    <button class="btn-reply" onclick="toggleReplyForm('reply-form-${thread.id}')">Responder</button>
                </div>
                
                <div id="reply-form-${thread.id}" class="reply-form">
                    <input type="text" id="reply-name-${thread.id}" placeholder="Tu Nombre" class="form-input">
                    <textarea id="reply-text-${thread.id}" rows="3" placeholder="Escribe tu respuesta aquí..."></textarea>
                    <button class="btn-green" onclick="submitReply('${thread.id}')">Enviar Respuesta</button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('afterbegin', threadHTML); // Nuevos arriba, o loop inverso para orden cronológico
    });
}

// Crear Nuevo Hilo
function openNewThreadModal() { document.getElementById('newThreadModal').style.display = 'flex'; }
function closeNewThreadModal() { document.getElementById('newThreadModal').style.display = 'none'; }

function submitNewThread() {
    const name = document.getElementById('new-thread-name').value.trim() || "Anónimo";
    const title = document.getElementById('new-thread-title').value.trim();
    const content = document.getElementById('new-thread-content').value.trim();

    if (title === "" || content === "") { alert("Título y mensaje son obligatorios."); return; }

    const newThread = {
        id: 'thread-' + Date.now(),
        author: name,
        title: title,
        date: new Date().toLocaleDateString(),
        content: content,
        replies: []
    };

    // Agregar a datos y guardar
    forumData.push(newThread);
    saveForum();

    // Limpiar UI
    document.getElementById('new-thread-name').value = "";
    document.getElementById('new-thread-title').value = "";
    document.getElementById('new-thread-content').value = "";
    closeNewThreadModal();
    
    renderForum(); // Re-renderizar foro
}

// Responder a Hilo
function toggleReplyForm(formId) {
    const form = document.getElementById(formId);
    form.style.display = (form.style.display === "block") ? "none" : "block";
}

function submitReply(threadId) {
    const nameInput = document.getElementById('reply-name-' + threadId);
    const textArea = document.getElementById('reply-text-' + threadId);
    const text = textArea.value.trim();
    const name = nameInput.value.trim() || "Anónimo";

    if (text === "") { alert("Por favor escribe una respuesta."); return; }

    const now = new Date();
    const dateString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    const newReply = {
        author: name,
        date: dateString,
        content: text
    };

    // Encontrar el hilo en los datos y agregar respuesta
    const threadIndex = forumData.findIndex(t => t.id === threadId);
    if (threadIndex !== -1) {
        forumData[threadIndex].replies.push(newReply);
        saveForum(); // Guardar cambios
        renderForum(); // Re-renderizar para mostrar la respuesta
    }
}

// INICIALIZACIÓN AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    updateButtonsState();
    renderGrades();
    renderForum();
});