let boardId: string;
const startContainer: HTMLElement = document.querySelector(".start-input");
const input: HTMLInputElement =  document.createElement("input");
input.type = "text";
startContainer.appendChild(input);
const button: HTMLElement = document.createElement("button");
button.classList.add("start-button");
button.innerHTML = "Przejdź do lodówki";
startContainer.appendChild(button);
button.onclick = () =>{
    boardId = input.value ? input.value : "default";
    window.sessionStorage.setItem("boardId", `${encodeURIComponent(boardId)}`);
    location.href = "./board.html";
}
