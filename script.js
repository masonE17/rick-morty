const submitButton = document.querySelector("#search-button");

submitButton.addEventListener("click", () => {
    const submitInput = document.querySelector("#search-input");
    if (!submitInput.value) {
        console.log("Please enter a character name.");
        return;
    }
    fetchCharacterData(submitInput.value);
});

async function fetchCharacterData(val) {
    try {
        const url = `https://rickandmortyapi.com/api/character/?name=${val}`;
        const response = await fetch(url);
        if (!response.ok) {
            console.log("Character not found.");
        }
        const data = await response.json();
        const container = document.querySelector(".results-container");
        if (container.classList.contains("hidden")) {
            container.classList.remove("hidden");
        }
        console.log(data);
        const characterName = document.querySelector(".results-header");
        characterName.textContent = data.results[0].name;
        const characterImage = document.querySelector(".results-image");
        characterImage.src = data.results[0].image;
        const characterDetails = document.querySelector(".results-details");
        characterDetails.innerHTML = `
            <p>Status: ${data.results[0].status}</p>
            <p>Species: ${data.results[0].species}</p>
            <p>Gender: ${data.results[0].gender}</p>
            <p>Origin: ${data.results[0].origin.name}</p>
            <p>Location: ${data.results[0].location.name}</p>
        `;
    } catch (error) {
        console.log("Error: " + error.message);
    }
};