try {
    const filtersBtn = document.getElementById("imageFiltersBtn");
    const changeNameBtn = document.getElementById("changeImageNameBtn");
    const saveImageBtn = document.getElementById("saveImageBtn");
    const previewImageBtn = document.getElementById("previewImageBtn");
    const filtersDiv = document.getElementById("image-filters");
    const displayDiv = document.getElementById("image-display");
    const renameDialog = document.getElementById("dlRenameFile");
    let currentFilter = "None";

    filtersBtn.addEventListener("click", () => {
        if (filtersDiv.offsetWidth === 0) {
            filtersDiv.style.width = 200 + "px";
        } else {
            filtersDiv.style.width = 0 + "px";
        }
    });

    function setMainImage(newFilter) {
        if (newFilter === "None") {
            displayDiv.style.filter = "none";
        } else {
            displayDiv.style.filter = newFilter + "(100%)";
        }
        currentFilter = newFilter;
    }

    async function saveImage() {
        const name = displayDiv.getAttribute("src");
        const data = {
            name: name,
            filter: currentFilter
        }
        const response = await fetch("/saveImage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            keepalive: true,
            body: JSON.stringify(data)
        });
        const json = await response.json();
        if (json === "OK") {
            alert("Zapisano obraz");
        } else {
            alert("Błąd podczas zapisu obrazu");
        }
    }

    changeNameBtn.addEventListener("click", () => {
        renameDialog.showModal();
    })
    saveImageBtn.addEventListener("click", saveImage);
} catch {
    console.log("morb image");
}