document.addEventListener("dblclick", async (e) => {
    const selectedText = window.getSelection().toString().trim();
    if (!selectedText || selectedText.split(" ").length > 2) return;

    // Remove old bubble if any
    const old = document.getElementById("quicktranslate-bubble");
    if (old) old.remove();

    // Create new bubble
    const bubble = document.createElement("div");
    bubble.id = "quicktranslate-bubble";
    bubble.innerText = "🔄 Translating...";
    Object.assign(bubble.style, {
        position: "absolute",
        top: `${e.pageY + 10}px`,
        left: `${e.pageX + 10}px`,
        background: "#fff8dc",
        color: "#000",
        padding: "6px 10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        zIndex: 999999,
        fontSize: "14px",
        fontFamily: "Arial, sans-serif"
    });

    document.body.appendChild(bubble);

    chrome.storage.sync.get("targetLang", async (data) => {
        const targetLang = data.targetLang || "hi";

        try {
            const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(selectedText)}&langpair=en|${targetLang}`);
            const result = await res.json();
            const translated = result?.responseData?.translatedText || "⚠️ No result";
            bubble.innerText = `🈯 ${translated}`;
        } catch {
            bubble.innerText = "❌ Error";
        }

        setTimeout(() => bubble.remove(), 6000);
    });
});
