(() => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navLogin = document.getElementById("navLogin");
  const navAdmin = document.getElementById("navAdmin");
  const authShell = document.getElementById("authShell");
  const adminDashboard = document.getElementById("adminDashboard");
  const closeAuth = document.getElementById("closeAuth");
  const closeAdmin = document.getElementById("closeAdmin");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  if (themeToggleBtn && themeIcon) {
    const themeKey = "task6_theme";
    const state = { theme: localStorage.getItem(themeKey) === "dark" ? "dark" : "light" };

    const renderTheme = () => {
      const isDark = state.theme === "dark";
      document.body.classList.toggle("dark", isDark);
      themeIcon.textContent = isDark ? "☀️" : "🌙";
      themeToggleBtn.setAttribute("aria-pressed", String(isDark));
      themeToggleBtn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    };

    themeToggleBtn.addEventListener("click", () => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem(themeKey, state.theme);
      renderTheme();
    });

    renderTheme();
  }

  const tabs = Array.from(document.querySelectorAll(".tab-btn"));
  const panels = Array.from(document.querySelectorAll(".panel"));

  const togglePanel = (selectedId) => {
    tabs.forEach((tab) => {
      const isActive = tab.id === selectedId;
      tab.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      const isActive = panel.getAttribute("aria-labelledby") === selectedId;
      panel.classList.toggle("active", isActive);
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => togglePanel(tab.id));
  });

  if (navLogin && authShell) {
    navLogin.addEventListener("click", (event) => {
      event.preventDefault();
      authShell.classList.add("show");
      togglePanel("login-tab");
    });
  }

  if (closeAuth && authShell) {
    closeAuth.addEventListener("click", () => {
      authShell.classList.remove("show");
    });
  }

  if (navAdmin && adminDashboard) {
    navAdmin.addEventListener("click", (event) => {
      event.preventDefault();
      adminDashboard.classList.add("show");
    });
  }

  if (closeAdmin && adminDashboard) {
    closeAdmin.addEventListener("click", () => {
      adminDashboard.classList.remove("show");
    });
  }

  document.querySelectorAll(".toggle-visibility").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (!input) {
        return;
      }
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      btn.textContent = isPassword ? "Hide" : "Show";
    });
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRules = [
    { test: (value) => value.length >= 10 },
    { test: (value) => /[A-Z]/.test(value) },
    { test: (value) => /[a-z]/.test(value) },
    { test: (value) => /\d/.test(value) },
    { test: (value) => /[^A-Za-z0-9]/.test(value) }
  ];

  const setError = (id, message) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = message;
    }
  };

  const clearErrors = (ids) => ids.forEach((id) => setError(id, ""));

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const forgotPasswordBtn = document.getElementById("forgot-password-btn");
  const loginBanner = document.getElementById("login-banner");
  const registerBanner = document.getElementById("register-banner");
  const strengthFill = document.getElementById("strength-fill");
  const strengthLabel = document.getElementById("strength-label");
  const registerPasswordInput = document.getElementById("register-password");

  const updateStrength = (value) => {
    if (!strengthFill || !strengthLabel) {
      return;
    }

    const passed = passwordRules.filter((rule) => rule.test(value)).length;
    const percent = Math.round((passed / passwordRules.length) * 100);
    strengthFill.style.width = `${percent}%`;

    let color = "var(--danger)";
    let label = "Weak password";
    if (passed >= 4) {
      color = "#f0ad4e";
      label = "Almost there";
    }
    if (passed === 5) {
      color = "#5cb85c";
      label = "Strong password";
    }

    strengthFill.style.background = color;
    strengthLabel.textContent = label;
  };

  if (registerPasswordInput) {
    registerPasswordInput.addEventListener("input", (event) => {
      updateStrength(event.target.value);
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      clearErrors(["login-email-error", "login-password-error"]);

      const emailInput = loginForm.elements.namedItem("email");
      const passwordInput = loginForm.elements.namedItem("password");
      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";

      let isValid = true;
      if (!emailPattern.test(email)) {
        setError("login-email-error", "Enter a valid work email address.");
        isValid = false;
      }
      if (password.length < 8) {
        setError("login-password-error", "Password must be at least 8 characters.");
        isValid = false;
      }

      if (loginBanner) {
        loginBanner.classList.remove("is-hidden", "error");
        if (isValid) {
          loginBanner.textContent = "Signed in successfully (demo).";
        } else {
          loginBanner.textContent = "Please fix the highlighted fields and try again.";
          loginBanner.classList.add("error");
        }
      }
    });
  }

  if (forgotPasswordBtn && loginBanner) {
    forgotPasswordBtn.addEventListener("click", () => {
      loginBanner.classList.remove("is-hidden", "error");
      loginBanner.textContent = "Password reset link sent (demo).";
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      clearErrors([
        "name-error",
        "register-email-error",
        "company-error",
        "role-error",
        "register-password-error",
        "confirm-password-error",
        "consent-error"
      ]);

      const nameInput = registerForm.elements.namedItem("name");
      const emailInput = registerForm.elements.namedItem("email");
      const companyInput = registerForm.elements.namedItem("company");
      const roleInput = registerForm.elements.namedItem("role");
      const passwordInput = registerForm.elements.namedItem("password");
      const confirmInput = registerForm.elements.namedItem("confirm");
      const consentInput = document.getElementById("consent");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const company = companyInput ? companyInput.value.trim() : "";
      const role = roleInput ? roleInput.value : "";
      const password = passwordInput ? passwordInput.value : "";
      const confirm = confirmInput ? confirmInput.value : "";
      const consent = consentInput ? consentInput.checked : false;

      let isValid = true;
      if (name.length < 2) {
        setError("name-error", "Please enter your full name.");
        isValid = false;
      }
      if (!emailPattern.test(email)) {
        setError("register-email-error", "Enter a valid work email address.");
        isValid = false;
      }
      if (company.length < 2) {
        setError("company-error", "Company name is required.");
        isValid = false;
      }
      if (!role) {
        setError("role-error", "Select your role to continue.");
        isValid = false;
      }
      if (!passwordRules.every((rule) => rule.test(password))) {
        setError("register-password-error", "Password must be 10+ chars with uppercase, lowercase, number, and symbol.");
        isValid = false;
      }
      if (password !== confirm) {
        setError("confirm-password-error", "Passwords do not match.");
        isValid = false;
      }
      if (!consent) {
        setError("consent-error", "You must agree to the terms to proceed.");
        isValid = false;
      }

      if (registerBanner) {
        registerBanner.classList.remove("error");
        if (isValid) {
          registerBanner.textContent = "Account created successfully (demo).";
        } else {
          registerBanner.textContent = "Please fix the highlighted fields and try again.";
          registerBanner.classList.add("error");
        }
      }
    });
  }
})();
