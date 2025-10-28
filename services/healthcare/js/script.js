// Populate dropdowns
const villageSelect = document.getElementById("village");
const specialitySelect = document.getElementById("speciality");
const resultsDiv = document.getElementById("results");

villages.forEach(v => {
    const opt = document.createElement("option");
    opt.textContent = v;
    villageSelect.appendChild(opt);
});

specialities.forEach(s => {
    const opt = document.createElement("option");
    opt.textContent = s;
    specialitySelect.appendChild(opt);
});

// Search button
document.getElementById("searchBtn").addEventListener("click", () => {
    const place = villageSelect.value;
    const speciality = specialitySelect.value;
    resultsDiv.innerHTML = "";

    if (place === "-- Select Place --" || speciality === "-- Select Speciality --") {
        resultsDiv.innerHTML = `<p class="text-red-600 font-medium">⚠️ Please select both options.</p>`;
        return;
    }

    const list = hospitalsData[speciality];
    if (!list) {
        resultsDiv.innerHTML = `<p>No hospitals found for this speciality.</p>`;
        return;
    }

    const cards = list.map(h => `
        <div class="border rounded-lg p-4 bg-green-50 mb-2">
            <h3 class="font-semibold">${h.name}</h3>
            <p>📞 ${h.contact}</p>
            <p>📍 ${place}</p>
        </div>
    `).join("");
    resultsDiv.innerHTML = cards;
});

// Tab switching
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("border-green-600", "text-green-600", "font-semibold"));
        btn.classList.add("border-green-600", "text-green-600", "font-semibold");

        document.querySelectorAll(".tab-content").forEach(sec => sec.classList.add("hidden"));
        const id = btn.id.replace("tab-", "");
        document.getElementById(id).classList.remove("hidden");
    });
});
