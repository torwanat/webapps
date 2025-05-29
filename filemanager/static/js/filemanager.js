try {
    const btnNewDir = document.getElementById("btnNewDir");
    const btnNewFile = document.getElementById("btnNewFile");
    const btnRenameFolder = document.getElementById("btnRenameFolder");

    const dirDialog = () => {
        const dialog = document.getElementById("dlNewDir");
        dialog.showModal();
    }

    const fileDialog = () => {
        const dialog = document.getElementById("dlNewFile");
        dialog.showModal();
    }

    const renameDialog = () => {
        const dialog = document.getElementById("dlRenameFolder");
        dialog.showModal();
    }

    btnNewDir.addEventListener("click", dirDialog);
    btnNewFile.addEventListener("click", fileDialog);
    btnRenameFolder.addEventListener("click", renameDialog);
} catch {
    console.log("morb");
}
