const localStorageWithExpiry = {
    setItem: (key, value, expirySeconds) => {
        const item = {
            value: value,
            expiry: Date.now() + expirySeconds * 1000
        };
        localStorage.setItem(key, JSON.stringify(item));
    },
    getItem: (key) => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;
        const item = JSON.parse(itemStr);
        return (Date.now() <= item.expiry) ? item.value : (localStorage.removeItem(key), null);
    }
};

function saveToLocalStorage() {
    const inputValue = document.getElementById("inputValue").value;
    const expirySeconds = document.getElementById("expirySeconds").value;
    localStorageWithExpiry.setItem("savedValue", inputValue, expirySeconds);
    displaySavedValue();
}

function displaySavedValue() {
    const savedValue = localStorageWithExpiry.getItem("savedValue");
    const displayDiv = document.getElementById("displayValue");
    displayDiv.textContent = (savedValue !== null) ? "Saved Value: " + savedValue : "Saved Value: Expired";
}

displaySavedValue();
