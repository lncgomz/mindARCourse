const imageFiles = [
  "agente.png",
  "anarvista.png",
  "anarvistaB.png",
  "caminata.png",
  "carajitosgrandes.png",
  "comuneros.png",
  "coprofagia.png",
  "desquiciadamente.png",
  "dw.png",
  "escasez.png",
  "falp.png",
  "fango.png",
  "fanzineroso.png",
  "fechoria.png",
  "katalexia.png",
  "ldm.png",
  "ldm2.png",
  "mayoria.png",
  "med.png",
  "nc.png",
  "odio.png",
  "perrera.png",
  "ppd.png",
  "ppj.png",
  "procesx.png",
  "proxtatikoz.png",
  "punkalparke.png",
  "punqueria.png",
  "rdc.png",
  "reciclaje.png",
  "sietebalazos.png",
  "som.png",
  "sotano.png",
  "tz.png",
  "ultrazonido.png",
  "vinilos.png"
];

const imageBasePath = "../../assets/images/assignment-1/";

const initializeViewer = () => {
  const imageElement = document.querySelector("[data-image-viewer]");
  const prevButton = document.querySelector("[data-image-prev]");
  const nextButton = document.querySelector("[data-image-next]");

  if (!imageElement || !prevButton || !nextButton) {
    return;
  }

  let currentIndex = 0;

  const renderImage = () => {
    const fileName = imageFiles[currentIndex];
    imageElement.src = imageBasePath + fileName;
    imageElement.alt = fileName.replace(/\.png$/i, "").replace(/[-_]/g, " ");
  };

  const pulseButton = (button) => {
    button.classList.remove("pulse");
    void button.offsetWidth;
    button.classList.add("pulse");
  };

  const goToPrevious = () => {
    currentIndex = (currentIndex - 1 + imageFiles.length) % imageFiles.length;
    renderImage();
  };

  const goToNext = () => {
    currentIndex = (currentIndex + 1) % imageFiles.length;
    renderImage();
  };

  prevButton.addEventListener("click", () => {
    pulseButton(prevButton);
    goToPrevious();
  });
  nextButton.addEventListener("click", () => {
    pulseButton(nextButton);
    goToNext();
  });

  renderImage();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeViewer);
} else {
  initializeViewer();
}
