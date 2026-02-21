document.addEventListener("DOMContentLoaded", () => {
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

  document.querySelectorAll(".toggle-visibility").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (!input) {
        return;
      }
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      btn.textContent = isHidden ? "Hide" : "Show";
    });
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRules = [
    { test: (value) => value.length >= 10, label: "At least 10 characters" },
    { test: (value) => /[A-Z]/.test(value), label: "One uppercase letter" },
    { test: (value) => /[a-z]/.test(value), label: "One lowercase letter" },
    { test: (value) => /\d/.test(value), label: "One number" },
    { test: (value) => /[^A-Za-z0-9]/.test(value), label: "One symbol" }
  ];

  const setError = (id, message) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = message;
    }
  };

  const clearErrors = (ids) => ids.forEach((id) => setError(id, ""));

  const validateEmail = (value) => emailPattern.test(value.trim());
  const validatePassword = (value) => passwordRules.every((rule) => rule.test(value));

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const strengthFill = document.getElementById("strength-fill");
  const strengthLabel = document.getElementById("strength-label");

  if (!loginForm || !registerForm || !strengthFill || !strengthLabel) {
    return;
  }

  const forgotPasswordBtn = document.getElementById("forgot-password-btn");
  const loginBanner = document.getElementById("login-banner");

  const updateStrength = (value) => {
    const passed = passwordRules.filter((rule) => rule.test(value)).length;
    const percent = Math.round((passed / passwordRules.length) * 100);
    strengthFill.style.width = `${percent}%`;

    let color = "var(--danger)";
    let label = "Weak password";
    if (passed >= 4) {
      color = "var(--warning)";
      label = "Almost there";
    }
    if (passed === 5) {
      color = "var(--success)";
      label = "Strong password";
    }
    strengthFill.style.background = color;
    strengthLabel.textContent = label;
  };

  const registerPasswordInput = document.getElementById("register-password");
  if (registerPasswordInput) {
    registerPasswordInput.addEventListener("input", (event) => {
      updateStrength(event.target.value);
    });
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors(["login-email-error", "login-password-error"]);
    let isValid = true;

    const emailInput = loginForm.elements.namedItem("email");
    const passwordInput = loginForm.elements.namedItem("password");
    const email = emailInput ? emailInput.value : "";
    const password = passwordInput ? passwordInput.value : "";

    if (!validateEmail(email)) {
      setError("login-email-error", "Enter a valid work email address.");
      isValid = false;
    }
    if (password.trim().length < 8) {
      setError("login-password-error", "Password must be at least 8 characters.");
      isValid = false;
    }

    if (loginBanner) {
      loginBanner.classList.remove("error", "is-hidden");
      if (isValid) {
        loginBanner.textContent = "Signed in successfully (demo).";
      } else {
        loginBanner.textContent = "Please fix the highlighted fields and try again.";
        loginBanner.classList.add("error");
      }
    }
  });

  if (forgotPasswordBtn && loginBanner) {
    forgotPasswordBtn.addEventListener("click", () => {
      loginBanner.classList.remove("error", "is-hidden");
      loginBanner.textContent = "Password reset link sent (demo).";
    });
  }

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

    let isValid = true;
    const nameInput = registerForm.elements.namedItem("name");
    const emailInput = registerForm.elements.namedItem("email");
    const companyInput = registerForm.elements.namedItem("company");
    const roleInput = registerForm.elements.namedItem("role");
    const passwordInput = registerForm.elements.namedItem("password");
    const confirmInput = registerForm.elements.namedItem("confirm");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const company = companyInput ? companyInput.value.trim() : "";
    const role = roleInput ? roleInput.value : "";
    const password = passwordInput ? passwordInput.value : "";
    const confirm = confirmInput ? confirmInput.value : "";
    const consent = document.getElementById("consent").checked;

    if (name.length < 2) {
      setError("name-error", "Please enter your full name.");
      isValid = false;
    }
    if (!validateEmail(email)) {
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
    if (!validatePassword(password)) {
      setError(
        "register-password-error",
        "Password must be 10+ chars with uppercase, lowercase, number, and symbol."
      );
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

    const banner = document.getElementById("register-banner");
    if (banner) {
      banner.classList.remove("error");
      if (isValid) {
        banner.textContent = "Account created successfully (demo).";
      } else {
        banner.textContent = "Please fix the highlighted fields and try again.";
        banner.classList.add("error");
      }
    }
  });
});
