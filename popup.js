document.addEventListener("DOMContentLoaded", () => {
    // Load and check current saved language
    chrome.storage.sync.get("targetLang", (data) => {
        const currentLang = data.targetLang || "hi";
        const input = document.querySelector(`input[value="${currentLang}"]`);
        if (input) input.checked = true;
    });

    // Save selected language
    document.getElementById("langForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const selectedLang = document.querySelector("input[name='lang']:checked").value;
        chrome.storage.sync.set({ targetLang: selectedLang }, () => {
            const status = document.getElementById("status");
            status.textContent = "Language saved!";
            setTimeout(() => status.textContent = "", 2000);
        });
    });
});
