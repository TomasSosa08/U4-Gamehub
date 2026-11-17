
// ===================================
// GAMEHUB - INTERACTIVE FEATURES
// ===================================

// ELEMENTOS
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const filterButtons = document.querySelectorAll(".filter-button");
const gameCards = document.querySelectorAll(".game-card");

const joinForm = document.getElementById("joinForm");
const supportForm = document.getElementById("supportForm");

const joinMessage = document.getElementById("joinMessage");
const supportMessage = document.getElementById("supportMessage");

const toast = document.getElementById("toast");


// ===================================
// NOTIFICATIONS
// ===================================

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


// ===================================
// MOBILE MENU
// ===================================

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


// ===================================
// GAME FILTERS
// ===================================

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    const selectedFilter = button.dataset.filter;

    // Actualizar botón activo
    filterButtons.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    // Filtrar tarjetas
    gameCards.forEach(card => {
      const category = card.dataset.category;

      if (selectedFilter === "all" || category === selectedFilter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});


// ===================================
// JOIN FORM
// ===================================

joinForm.addEventListener("submit", event => {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const platform = document.getElementById("platform").value;

  const selectedGenres = document.querySelectorAll(
    'input[name="genres"]:checked'
  );

  const terms = document.getElementById("terms").checked;

  // Validaciones
  if (firstName.length < 2) {
    showFormMessage(joinMessage, "Your name must have at least 2 characters.", "error");
    return;
  }

  if (username.length < 3) {
    showFormMessage(joinMessage, "Your gamer tag must have at least 3 characters.", "error");
    return;
  }

  if (!email.includes("@")) {
    showFormMessage(joinMessage, "Please enter a valid email address.", "error");
    return;
  }

  if (!platform) {
    showFormMessage(joinMessage, "Please select your main platform.", "error");
    return;
  }

  if (selectedGenres.length === 0) {
    showFormMessage(joinMessage, "Select at least one gaming genre.", "error");
    return;
  }

  if (!terms) {
    showFormMessage(joinMessage, "You must accept the terms and conditions.", "error");
    return;
  }

  const genres = Array.from(selectedGenres).map(input => input.value);

  showFormMessage(
    joinMessage,
    "Welcome to GameHub, " + firstName + "! Your demo profile is ready.",
    "success"
  );

  showToast("Welcome to the GameHub community!");

  console.log("New GameHub profile:", {
    firstName,
    username,
    email,
    platform,
    genres
  });

  joinForm.reset();
});


// ===================================
// SUPPORT FORM
// ===================================

supportForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("supportName").value.trim();
  const email = document.getElementById("supportEmail").value.trim();
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value.trim();

  if (name.length < 2) {
    showFormMessage(supportMessage, "Please enter your name.", "error");
    return;
  }

  if (!email.includes("@")) {
    showFormMessage(supportMessage, "Please enter a valid email address.", "error");
    return;
  }

  if (!subject) {
    showFormMessage(supportMessage, "Please select a subject.", "error");
    return;
  }

  if (message.length < 10) {
    showFormMessage(supportMessage, "Your message must have at least 10 characters.", "error");
    return;
  }

  showFormMessage(
    supportMessage,
    "Thank you, " + name + "! Your demo message has been registered.",
    "success"
  );

  showToast("Message completed successfully!");

  console.log("Support message:", {
    name,
    email,
    subject,
    message
  });

  supportForm.reset();
});


// ===================================
// FORM MESSAGES
// ===================================

function showFormMessage(element, message, type) {
  element.textContent = message;
  element.className = "form-message " + type;
}


// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});


// ===================================
// INITIALIZATION
// ===================================

console.log("GAMEHUB successfully loaded!");
