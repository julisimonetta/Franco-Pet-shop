let button = document.getElementById("mainButton");

const openForm = () => {
          button.className = "active";
};

const handleInputBlur = (input) => {
          if (input.value.length > 0) {
                    input.className = "active";
          } else {
                    input.className = "";
          }
};

const closeForm = () => {
          button.className = "";
};

const handleSendForm = () => {
  closeForm();
  alert("Su mensaje ha sido enviado con éxtios");
}


document.addEventListener("keyup", function (e) {
          if (e.keyCode == 27 || e.keyCode == 13) {
                    closeForm();
          }
});