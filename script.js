(function () {
  "use strict";

  const root = document.documentElement;
  root.classList.replace("no-js", "js");
  const config = window.SITE_CONFIG || {};
  const defaultWhatsAppNumber = "8801572939017";
  const defaultWhatsAppMessage =
    "Hi Iftekhar, I run a UK plumbing business and would like to hear the AI receptionist demo.";

  const whatsappNumber = String(config.whatsappNumber || defaultWhatsAppNumber).replace(/\D/g, "");

  document.querySelectorAll("[data-whatsapp]").forEach(function (link) {
    const message = link.dataset.whatsappMessage || config.whatsappMessage || defaultWhatsAppMessage;
    link.href = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
  });

  if (config.email) {
    document.querySelectorAll("[data-email-row]").forEach(function (row) {
      row.hidden = false;
    });

    document.querySelectorAll("[data-email-link]").forEach(function (link) {
      link.href = "mailto:" + config.email;
      link.textContent = config.email;
    });

    document.querySelectorAll("[data-email-popup]").forEach(function (link) {
      link.href = "mailto:" + config.email;
    });

    document.querySelectorAll("[data-email-value]").forEach(function (node) {
      node.textContent = config.email;
    });

    document.querySelectorAll("[data-email-mailto]").forEach(function (link) {
      link.href = "mailto:" + config.email;
    });
  }

  document.querySelectorAll("[data-current-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  const header = document.querySelector("[data-site-header]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  function setMenu(open) {
    if (!menuButton || !mobileMenu) return;

    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    mobileMenu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  }

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", function () {
      setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuButton.focus();
      }
    });

    const desktopQuery = window.matchMedia("(min-width: 921px)");
    const closeAtDesktop = function (event) {
      if (event.matches) setMenu(false);
    };

    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", closeAtDesktop);
    } else if (typeof desktopQuery.addListener === "function") {
      desktopQuery.addListener(closeAtDesktop);
    }
  }

  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 16);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (revealItems.length && !reduceMotion && "IntersectionObserver" in window) {
    root.classList.add("reveal-enabled");

    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  const video = document.getElementById("demo-video");
  const playButton = document.querySelector("[data-play-demo]");

  if (video && playButton) {
    root.classList.add("video-enhanced");
    playButton.addEventListener("click", function () {
      const playRequest = video.play();
      playButton.classList.add("is-hidden");

      if (playRequest && typeof playRequest.catch === "function") {
        playRequest.catch(function () {
          playButton.classList.remove("is-hidden");
        });
      }
    });

    video.addEventListener("play", function () {
      playButton.classList.add("is-hidden");
    });

    video.addEventListener("ended", function () {
      playButton.classList.remove("is-hidden");
    });
  }

  const emailModal = document.querySelector("[data-email-modal]");
  const emailDialog = document.querySelector("[data-email-dialog]");
  const emailTriggers = Array.from(document.querySelectorAll("[data-email-popup]"));
  const emailCloseButtons = Array.from(document.querySelectorAll("[data-email-close]"));
  const copyEmailButton = document.querySelector("[data-copy-email]");
  const copyEmailLabel = document.querySelector("[data-copy-label]");
  const copyEmailStatus = document.querySelector("[data-copy-status]");
  let emailReturnFocus = null;

  function openEmailModal(trigger) {
    if (!emailModal || !emailDialog) return;
    emailReturnFocus = trigger;
    emailModal.hidden = false;
    document.body.classList.add("modal-open");

    if (copyEmailButton) {
      copyEmailButton.classList.remove("is-copied");
    }
    if (copyEmailLabel) copyEmailLabel.textContent = "Copy email";
    if (copyEmailStatus) copyEmailStatus.textContent = "";

    window.requestAnimationFrame(function () {
      (copyEmailButton || emailDialog).focus();
    });
  }

  function closeEmailModal() {
    if (!emailModal || emailModal.hidden) return;
    emailModal.hidden = true;
    document.body.classList.remove("modal-open");
    if (emailReturnFocus && typeof emailReturnFocus.focus === "function") {
      emailReturnFocus.focus();
    }
  }

  emailTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      if (!emailModal) return;
      event.preventDefault();
      openEmailModal(trigger);
    });
  });

  emailCloseButtons.forEach(function (button) {
    button.addEventListener("click", closeEmailModal);
  });

  async function writeEmailToClipboard() {
    const email = config.email || "iftekharahammedsamrat2@gmail.com";

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(email);
        return;
      } catch (error) {
        // Continue to the selection-based fallback below.
      }
    }

    const temporaryInput = document.createElement("textarea");
    temporaryInput.value = email;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";
    document.body.appendChild(temporaryInput);
    temporaryInput.select();
    const copied = document.execCommand("copy");
    temporaryInput.remove();
    if (!copied) throw new Error("Clipboard copy was not available");
  }

  if (copyEmailButton) {
    copyEmailButton.addEventListener("click", async function () {
      try {
        await writeEmailToClipboard();
        copyEmailButton.classList.add("is-copied");
        if (copyEmailLabel) copyEmailLabel.textContent = "Copied";
        if (copyEmailStatus) copyEmailStatus.textContent = "Email address copied to your clipboard.";
      } catch (error) {
        if (copyEmailStatus) copyEmailStatus.textContent = "Copy failed. Select the email address above and copy it manually.";
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (!emailModal || emailModal.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeEmailModal();
      return;
    }

    if (event.key === "Tab" && emailDialog) {
      const focusable = Array.from(
        emailDialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  const hero = document.querySelector("[data-hero]");
  const finalCta = document.querySelector(".final-cta");
  const mobileSticky = document.querySelector("[data-mobile-sticky]");
  let heroHasPassed = false;
  let finalCtaVisible = false;

  function updateMobileSticky() {
    if (!mobileSticky) return;
    mobileSticky.classList.toggle("is-visible", heroHasPassed && !finalCtaVisible);
  }

  if (hero && mobileSticky && "IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          heroHasPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          updateMobileSticky();
        });
      },
      { threshold: 0.03 }
    );

    heroObserver.observe(hero);

    if (finalCta) {
      const finalObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            finalCtaVisible = entry.isIntersecting;
            updateMobileSticky();
          });
        },
        { threshold: 0.1 }
      );

      finalObserver.observe(finalCta);
    }
  }

  document.querySelectorAll("[data-event]").forEach(function (element) {
    element.addEventListener("click", function () {
      const eventName = element.dataset.event;
      const detail = { event: "site_conversion", action: eventName };

      window.dispatchEvent(new CustomEvent("site:conversion", { detail: detail }));

      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push(detail);
      }
    });
  });
})();
