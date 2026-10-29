
// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

const navbar = document.querySelector(".custom-navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


// ==========================================
// TYPING EFFECT
// ==========================================

const typingText = document.getElementById("typing-text");

const words = [
    "Elhoseiny Mohamed",
    "Web Developer",
    "Front-End Developer",
    "Depi-Trainee",
    "ITI-Trainee"
];

let wordIndex = 0;
let characterIndex = 0;

let isDeleting = false;


// Speed settings

const typingSpeed = 120;
const deletingSpeed = 75;
const waitTime = 1800;


function typingEffect() {

    const currentWord = words[wordIndex];


    // =========================
    // WRITE
    // =========================

    if (!isDeleting) {

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        // Finished writing

        if (
            characterIndex ===
            currentWord.length
        ) {

            isDeleting = true;

            setTimeout(
                typingEffect,
                waitTime
            );

            return;
        }


        setTimeout(
            typingEffect,
            typingSpeed
        );

    }


    // =========================
    // DELETE
    // =========================

    else {

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        // Finished deleting

        if (characterIndex === 0) {

            isDeleting = false;

            wordIndex++;


            if (
                wordIndex >=
                words.length
            ) {

                wordIndex = 0;

            }


            setTimeout(
                typingEffect,
                500
            );

            return;
        }


        setTimeout(
            typingEffect,
            deletingSpeed
        );

    }

}


// Start

typingEffect();


// ==========================================
// ACTIVE NAVBAR LINK
// ==========================================

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


// ==========================================
// CLOSE MOBILE NAVBAR
// ==========================================

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        const navbarContent =
            document.getElementById(
                "navbarContent"
            );


        if (
            navbarContent.classList.contains(
                "show"
            )
        ) {

            const collapse =
                bootstrap.Collapse.getInstance(
                    navbarContent
                );


            if (collapse) {

                collapse.hide();

            }

        }

    });

});


// ==========================================
// CONTACT FORM
// ==========================================

const contactForm =
    document.getElementById(
        "contactForm"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.querySelector(
                    '[name="name"]'
                ).value.trim();


            const email =
                document.querySelector(
                    '[name="email"]'
                ).value.trim();


            const subject =
                document.querySelector(
                    '[name="subject"]'
                ).value.trim();


            const message =
                document.querySelector(
                    '[name="message"]'
                ).value.trim();


            // Validation

            if (
                name === "" ||
                email === "" ||
                subject === "" ||
                message === ""
            ) {

                formMessage.innerHTML = `
                    <div class="alert alert-danger mt-3">
                        Please fill in all fields.
                    </div>
                `;

                return;

            }


            // Create email

            const mailto =
                `mailto:engelhoseiny@gmail.com` +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(
                    `Name: ${name}\n` +
                    `Email: ${email}\n\n` +
                    `${message}`
                )}`;


            window.location.href = mailto;


            // Message

            formMessage.innerHTML = `
                <div class="alert alert-success mt-3">
                    Your email application is opening.
                </div>
            `;


            contactForm.reset();

        }
    );

}


// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

const animatedElements =
    document.querySelectorAll(
        ".skill-card, .service-card, .project-card, .timeline-card, .personal-info"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "show-element"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }
    );


animatedElements.forEach(element => {

    element.classList.add(
        "hidden-element"
    );

    observer.observe(element);

});


// ==========================================
// DYNAMIC FOOTER YEAR
// ==========================================

const copyright =
    document.querySelector(
        ".copyright"
    );


if (copyright) {

    const currentYear =
        new Date().getFullYear();


    copyright.textContent =
        `© ${currentYear} Elhoseiny Mohamed. All Rights Reserved.`;

}

// ==========================================
// UNIVERSITY TASKS: IndexedDB file storage
// ==========================================

const taskForm = document.getElementById("taskForm");
const tasksList = document.getElementById("tasksList");
const taskCount = document.getElementById("taskCount");
const taskFileInput = document.getElementById("taskFile");
const taskFileLabel = document.getElementById("taskFileLabel");
const taskFormMessage = document.getElementById("taskFormMessage");

const TASK_DB_NAME = "ElhoseinyPortfolioTasks";
const TASK_STORE_NAME = "tasks";
let taskDatabase = null;

function openTaskDatabase() {
    return new Promise((resolve, reject) => {
        if (!("indexedDB" in window)) {
            reject(new Error("Your browser does not support local task storage."));
            return;
        }

        const request = indexedDB.open(TASK_DB_NAME, 1);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(TASK_STORE_NAME)) {
                db.createObjectStore(TASK_STORE_NAME, { keyPath: "id" });
            }
        };

        request.onsuccess = function(event) {
            taskDatabase = event.target.result;
            resolve(taskDatabase);
        };

        request.onerror = function() {
            reject(request.error || new Error("Could not open task storage."));
        };
    });
}

function taskStore(mode) {
    return taskDatabase
        .transaction(TASK_STORE_NAME, mode)
        .objectStore(TASK_STORE_NAME);
}

function saveTaskRecord(task) {
    return new Promise((resolve, reject) => {
        const request = taskStore("readwrite").put(task);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

function getTaskRecords() {
    return new Promise((resolve, reject) => {
        const request = taskStore("readonly").getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
}

function deleteTaskRecord(id) {
    return new Promise((resolve, reject) => {
        const request = taskStore("readwrite").delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

function escapeTaskText(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }[char]));
}

function formatTaskDate(dateValue) {
    if (!dateValue) return "No deadline";
    const date = new Date(dateValue + "T00:00:00");
    return date.toLocaleDateString(undefined, {
        year: "numeric", month: "short", day: "numeric"
    });
}

function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(fileName) {
    const extension = (fileName.split(".").pop() || "").toLowerCase();
    if (extension === "pdf") return "bi-file-earmark-pdf";
    if (["doc", "docx", "odt"].includes(extension)) return "bi-file-earmark-word";
    if (["ppt", "pptx"].includes(extension)) return "bi-file-earmark-ppt";
    if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(extension)) return "bi-file-earmark-image";
    if (["zip", "rar", "7z"].includes(extension)) return "bi-file-earmark-zip";
    if (["html", "css", "js", "jsx", "ts", "tsx", "cpp", "java", "py"].includes(extension)) return "bi-file-earmark-code";
    return "bi-file-earmark";
}

async function renderTasks() {
    if (!taskDatabase || !tasksList) return;

    try {
        const tasks = await getTaskRecords();
        tasks.sort((a, b) => b.createdAt - a.createdAt);
        taskCount.textContent = `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"} saved`;

        if (!tasks.length) {
            tasksList.innerHTML = `
                <div class="tasks-empty-state">
                    <i class="bi bi-inbox"></i>
                    <h4>No tasks yet</h4>
                    <p>Upload your first university task using the form.</p>
                </div>`;
            return;
        }

        tasksList.innerHTML = tasks.map(task => `
            <article class="task-item-card">
                <div class="task-item-top">
                    <div class="task-file-icon"><i class="bi ${getFileIcon(task.fileName)}"></i></div>
                    <span class="task-date-chip"><i class="bi bi-calendar-event"></i> ${escapeTaskText(formatTaskDate(task.deadline))}</span>
                </div>
                <div class="task-item-content">
                    <span class="task-subject">${escapeTaskText(task.subject || "University task")}</span>
                    <h4>${escapeTaskText(task.title)}</h4>
                    <p class="task-description">${escapeTaskText(task.description || "No description added.")}</p>
                    <div class="task-file-meta">
                        <i class="bi bi-paperclip"></i>
                        <span title="${escapeTaskText(task.fileName)}">${escapeTaskText(task.fileName)}</span>
                        <small>${formatFileSize(task.fileSize)}</small>
                    </div>
                </div>
                <div class="task-card-actions">
                    <button type="button" class="btn task-download-btn" data-task-download="${task.id}">
                        <i class="bi bi-download"></i> Download
                    </button>
                    <button type="button" class="btn task-delete-btn" data-task-delete="${task.id}" aria-label="Delete ${escapeTaskText(task.title)}">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </article>
        `).join("");
    } catch (error) {
        tasksList.innerHTML = `<div class="tasks-empty-state"><i class="bi bi-exclamation-circle"></i><h4>Could not load tasks</h4><p>Please refresh the page and try again.</p></div>`;
    }
}

if (taskFileInput) {
    taskFileInput.addEventListener("change", function() {
        taskFileLabel.textContent = this.files && this.files[0]
            ? this.files[0].name
            : "Choose a file or click here";
    });
}

if (taskForm) {
    taskForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const title = document.getElementById("taskTitle").value.trim();
        const subject = document.getElementById("taskSubject").value.trim();
        const deadline = document.getElementById("taskDeadline").value;
        const description = document.getElementById("taskDescription").value.trim();
        const file = taskFileInput.files && taskFileInput.files[0];

        if (!title || !file) {
            taskFormMessage.textContent = "Please enter a task title and choose a file.";
            taskFormMessage.className = "task-form-message error";
            return;
        }

        const saveButton = taskForm.querySelector('button[type="submit"]');
        saveButton.disabled = true;
        saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';

        try {
            if (!taskDatabase) await openTaskDatabase();

            const task = {
                id: (window.crypto && crypto.randomUUID)
                    ? crypto.randomUUID()
                    : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                title,
                subject,
                deadline,
                description,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type || "application/octet-stream",
                file,
                createdAt: Date.now()
            };

            await saveTaskRecord(task);
            taskForm.reset();
            taskFileLabel.textContent = "Choose a file or click here";
            taskFormMessage.textContent = "Task saved successfully in this browser.";
            taskFormMessage.className = "task-form-message success";
            await renderTasks();
        } catch (error) {
            taskFormMessage.textContent = "Could not save the task. Try a smaller file or another browser.";
            taskFormMessage.className = "task-form-message error";
        } finally {
            saveButton.disabled = false;
            saveButton.innerHTML = 'Save Task <i class="bi bi-plus-circle"></i>';
        }
    });
}

if (tasksList) {
    tasksList.addEventListener("click", async function(event) {
        const downloadButton = event.target.closest("[data-task-download]");
        const deleteButton = event.target.closest("[data-task-delete]");

        if (downloadButton) {
            try {
                if (!taskDatabase) await openTaskDatabase();
                const tasks = await getTaskRecords();
                const task = tasks.find(item => item.id === downloadButton.dataset.taskDownload);
                if (!task || !task.file) return;

                const fileUrl = URL.createObjectURL(task.file);
                const link = document.createElement("a");
                link.href = fileUrl;
                link.download = task.fileName;
                document.body.appendChild(link);
                link.click();
                link.remove();
                setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
            } catch (error) {
                alert("Could not download this task file.");
            }
        }

        if (deleteButton) {
            const id = deleteButton.dataset.taskDelete;
            const confirmed = window.confirm("Are you sure you want to delete this task?");
            if (!confirmed) return;

            try {
                if (!taskDatabase) await openTaskDatabase();
                await deleteTaskRecord(id);
                await renderTasks();
                taskFormMessage.textContent = "Task deleted.";
                taskFormMessage.className = "task-form-message success";
            } catch (error) {
                alert("Could not delete this task. Please try again.");
            }
        }
    });
}

if (document.getElementById("tasks")) {
    openTaskDatabase()
        .then(renderTasks)
        .catch(() => {
            if (tasksList) {
                tasksList.innerHTML = `<div class="tasks-empty-state"><i class="bi bi-exclamation-circle"></i><h4>Task storage unavailable</h4><p>Try opening this website in a modern browser using Live Server.</p></div>`;
            }
        });
}
