"use strict";

// ==============================
// DOM
// ==============================

const tabsContainer = document.querySelector("#tabs");
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

const topLeft = document.querySelector("#top-left");
const topRight = document.querySelector("#top-right");
const bottomRight = document.querySelector("#bottom-right");
const bottomLeft = document.querySelector("#bottom-left");

const topLeftValue = document.querySelector("#top-left-value");
const topRightValue = document.querySelector("#top-right-value");
const bottomRightValue = document.querySelector("#bottom-right-value");
const bottomLeftValue = document.querySelector("#bottom-left-value");

const preview = document.querySelector("#preview");
const previewButton = document.querySelector("#preview-button");
const previewText = document.querySelector("#preview-text");
const coordinates = document.querySelector("#coordinates");

const cssCode = document.querySelector("#css-code");
const copyButton = document.querySelector("#copy-button");
const copyMessage = document.querySelector("#copy-message");

const presetForm = document.querySelector("#preset-form");
const presetName = document.querySelector("#preset-name");
const presetError = document.querySelector("#preset-error");
const presetMessage = document.querySelector("#preset-message");

const scrollTopButton = document.querySelector("#scroll-top");
const eventInfo = document.querySelector("#event-info");

const backgroundColor = document.querySelector("#background-color");
const backgroundColorValue = document.querySelector("#background-color-value");
const textColor = document.querySelector("#text-color");
const textColorValue = document.querySelector("#text-color-value");
const fontSize = document.querySelector("#font-size");
const fontSizeValue = document.querySelector("#font-size-value");
const fontFamily = document.querySelector("#font-family");

const flexBasis = document.querySelector("#flex-basis");
const flexBasisValue = document.querySelector("#flex-basis-value");
const alignSelf = document.querySelector("#align-self");

// ==============================
// ЗАВДАННЯ 1–2. TABS
// ==============================

// Приховує активний стан усіх вкладок і вмісту.
function hideTabs() {
    tabs.forEach(function (tab) {
        tab.classList.remove("active");
    });

    tabContents.forEach(function (content) {
        content.classList.remove("active");
    });
}

// Відображає вибрану вкладку.
function showTab(tabName) {
    hideTabs();

    const selectedTab = document.querySelector(
        '[data-tab="' + tabName + '"]'
    );

    const selectedContent = document.querySelector(
        '[data-content="' + tabName + '"]'
    );

    if (selectedTab && selectedContent) {
        selectedTab.classList.add("active");
        selectedContent.classList.add("active");
    }
}

// ==============================
// ЗАВДАННЯ 5–8. BORDER RADIUS
// ==============================

function generateBorderRadius() {
    const topLeftRadius = topLeft.value;
    const topRightRadius = topRight.value;
    const bottomRightRadius = bottomRight.value;
    const bottomLeftRadius = bottomLeft.value;

    const radius =
        topLeftRadius + "px " +
        topRightRadius + "px " +
        bottomRightRadius + "px " +
        bottomLeftRadius + "px";

    preview.style.borderRadius = radius;

    topLeftValue.textContent = topLeftRadius + " px";
    topRightValue.textContent = topRightRadius + " px";
    bottomRightValue.textContent = bottomRightRadius + " px";
    bottomLeftValue.textContent = bottomLeftRadius + " px";

    updateCSS();
}

// ==============================
// ЗАВДАННЯ 9. CSS ВЛАСТИВОСТІ
// ВАРІАНТ 18: flex-basis, align-self
// ==============================

function updateBackground() {
    preview.style.backgroundColor = backgroundColor.value;
    backgroundColorValue.textContent = backgroundColor.value;
    updateCSS();
}

function updateTextColor() {
    preview.style.color = textColor.value;
    textColorValue.textContent = textColor.value;
    updateCSS();
}

function updateFontSize() {
    previewText.style.fontSize = fontSize.value + "px";
    fontSizeValue.textContent = fontSize.value + " px";
    updateCSS();
}

function updateFontFamily() {
    previewText.style.fontFamily = fontFamily.value;
    updateCSS();
}

function updateFlexBasis() {
    preview.style.flexBasis = flexBasis.value + "px";
    flexBasisValue.textContent = flexBasis.value + " px";
    updateCSS();
}

function updateAlignSelf() {
    preview.style.alignSelf = alignSelf.value;
    updateCSS();
}

// Формування CSS-коду для всіх налаштувань.
function updateCSS() {
    const radius =
        topLeft.value + "px " +
        topRight.value + "px " +
        bottomRight.value + "px " +
        bottomLeft.value + "px";

    cssCode.value =
        "border-radius: " + radius + ";\n" +
        "background-color: " + backgroundColor.value + ";\n" +
        "color: " + textColor.value + ";\n" +
        "font-size: " + fontSize.value + "px;\n" +
        "font-family: " + fontFamily.value + ";\n" +
        "flex-basis: " + flexBasis.value + "px;\n" +
        "align-self: " + alignSelf.value + ";";
}

// ==============================
// ЗАВДАННЯ 10. FOCUS ТА BLUR
// ==============================

presetName.addEventListener("focus", function () {
    presetName.classList.add("focused");
    presetError.textContent = "";
    presetMessage.textContent = "";
});

presetName.addEventListener("blur", function () {
    presetName.classList.remove("focused");

    if (presetName.value.trim() === "") {
        presetName.classList.add("error");
        presetError.textContent = "Введіть назву пресета";
    } else {
        presetName.classList.remove("error");
        presetError.textContent = "";
    }
});

// ==============================
// ЗАВДАННЯ 11. SUBMIT
// ==============================

function handlePresetSubmit(event) {
    event.preventDefault();

    const name = presetName.value.trim();

    if (name === "") {
        presetName.classList.add("error");
        presetError.textContent = "Введіть назву пресета";
        presetName.focus();
        return;
    }

    presetName.classList.remove("error");
    presetError.textContent = "";

    console.log("Пресет: " + name);
    console.log(cssCode.value);

    presetMessage.textContent = 'Пресет "' + name + '" збережено.';
}

presetForm.addEventListener("submit", handlePresetSubmit);

// ==============================
// ЗАВДАННЯ 12. КЛАВІАТУРА
// ==============================

function handleKeyDown(event) {
    if (event.key === "Escape") {
        topLeft.value = 0;
        topRight.value = 0;
        bottomRight.value = 0;
        bottomLeft.value = 0;

        generateBorderRadius();
    }
}

document.addEventListener("keydown", handleKeyDown);

// ==============================
// ЗАВДАННЯ 13. КОПІЮВАННЯ CSS
// ==============================

async function copyCSS() {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(cssCode.value);
        } else {
            cssCode.focus();
            cssCode.select();

            const copied = document.execCommand("copy");

            if (!copied) {
                throw new Error("Не вдалося скопіювати код.");
            }
        }

        copyMessage.textContent = "CSS-код скопійовано";
    } catch (error) {
        copyMessage.textContent =
            "Скопіюй CSS вручну з поля коду.";
    }
}

copyButton.addEventListener("click", copyCSS);

// ==============================
// ЗАВДАННЯ 14. ДЕЛЕГУВАННЯ ПОДІЙ
// ==============================

tabsContainer.addEventListener("click", function (event) {
    const clickedTab = event.target.closest(".tab");

    if (!clickedTab || !tabsContainer.contains(clickedTab)) {
        return;
    }

    const tabName = clickedTab.dataset.tab;

    // Завдання 4: аналіз об'єкта event.
    console.log(event.type);
    console.log(event.target);
    console.log(event.currentTarget);

    showTab(tabName);

    eventInfo.textContent =
        "Вибрана вкладка: " + clickedTab.textContent.trim();
});

// ==============================
// ЗАВДАННЯ 15. ПОШИРЕННЯ ПОДІЙ
// ==============================

preview.addEventListener("click", function () {
    console.log("Preview click");
    eventInfo.textContent = "Натиснуто Preview.";
});

previewButton.addEventListener("click", function (event) {
    event.stopPropagation();

    console.log("Button click");
    eventInfo.textContent =
        "Натиснуто кнопку всередині Preview. Поширення зупинено.";
});

// ==============================
// ЗАВДАННЯ 16. ПОДІЇ МИШІ
// ==============================

preview.addEventListener("mouseover", function () {
    preview.classList.add("hovered");
});

preview.addEventListener("mouseout", function () {
    preview.classList.remove("hovered");
});

// ==============================
// ЗАВДАННЯ 17. КООРДИНАТИ КУРСОРА
// ==============================

preview.addEventListener("mousemove", function (event) {
    coordinates.textContent =
        "X: " + event.clientX + "; Y: " + event.clientY;

    console.log("pageX:", event.pageX);
    console.log("pageY:", event.pageY);
});

// ==============================
// ЗАВДАННЯ 18. SCROLL
// ==============================

function handleScroll() {
    if (window.scrollY > 300) {
        scrollTopButton.classList.add("visible");
    } else {
        scrollTopButton.classList.remove("visible");
    }
}

window.addEventListener("scroll", handleScroll, { passive: true });

// ==============================
// ЗАВДАННЯ 19. ПОВЕРНЕННЯ НАГОРУ
// ==============================

scrollTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ==============================
// ПІДКЛЮЧЕННЯ ОБРОБНИКІВ RANGE
// ==============================

topLeft.addEventListener("input", generateBorderRadius);
topRight.addEventListener("input", generateBorderRadius);
bottomRight.addEventListener("input", generateBorderRadius);
bottomLeft.addEventListener("input", generateBorderRadius);

backgroundColor.addEventListener("input", updateBackground);
textColor.addEventListener("input", updateTextColor);
fontSize.addEventListener("input", updateFontSize);
fontFamily.addEventListener("change", updateFontFamily);

flexBasis.addEventListener("input", updateFlexBasis);
alignSelf.addEventListener("change", updateAlignSelf);

// ==============================
// ПОЧАТКОВІ ЗНАЧЕННЯ
// ==============================

generateBorderRadius();
updateBackground();
updateTextColor();
updateFontSize();
updateFontFamily();
updateFlexBasis();
updateAlignSelf();
showTab("radius");
handleScroll();