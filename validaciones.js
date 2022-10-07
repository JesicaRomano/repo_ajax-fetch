function camposCorrectos({ operacion }) {
    if (operacion == "" || operacion.trim() == "") {
      Swal.fire({
        title: "Error!",
        text: "Debe ingresar que operación quiere hacer",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
      return false;
    }
    return true;
  }