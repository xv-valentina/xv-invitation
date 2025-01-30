const api = `https://vale.somee.com/api`;


export async function getDataUser() {
  const urlParams = new URLSearchParams(window.location.search);
  const number = urlParams.get("number");
  const apiUrl = api + `/Functions?number=${number}`;

  try {
    const response = await fetch(apiUrl, { method: "GET" });
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}

export async function confirm(data) {
  const payload = {
    idGuest: data.id,
    confirmed: data.confirmed,
    companions: data.companions.map(({ id, confirmed }) => ({
      idCompanion: id,
      confirmed
    })),
  };

  const apiUrl = api + `/Functions/confirm`;

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    alert("Gracias por confirmar tus asistencias, puedes actualizarlas cuando quieras.");
    location.reload();
  } catch (error) {
    throw error;
  }
}

export async function uploadFile(fileInput, fileName) {
  if (!fileInput.files.length) {
    alert("Selecciona un archivo primero.");
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  const apiUrl = api + `/Functions/upload?folder=Antes`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      alert("Error: " + data);
    } else {
      alert("Gracias por compartir tu video con nostros.");
      fileInput.value = "";
      fileName.textContent = "Ningún archivo seleccionado";
    }
  } catch (error) {
    console.error("Error al subir el archivo:", error);
  }
}


export async function getPhotos() {
  const apiUrl = api + `/Functions/File`;
  try {
    const response = await fetch(apiUrl, { method: "GET" });
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}