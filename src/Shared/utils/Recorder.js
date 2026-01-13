
export default class Recorder {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.stream = null;
    this.isPaused = false;
  }

  // Initialisation du micro
  async init() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);

      // Capture des données audio
      this.mediaRecorder.addEventListener("dataavailable", (event) => {
        this.audioChunks.push(event.data);
      });

      return { success: true };
    } catch (error) {
      return { success: false, message: "Impossible d’accéder au micro : " + error.message };
    }
  }

  // Démarrer l'enregistrement
  start() {
    if (!this.isInit() || this.mediaRecorder.state === "recording") {
      return;
    }

    this.audioChunks = [];
    this.mediaRecorder.start();
  }

  // Mettre en pause l'enregistrement
  pause() {
    if (!this.isInit()) {
      return;
    }

    if (this.mediaRecorder.state === "recording") {
      this.mediaRecorder.pause();
      this.isPaused = true;
    } else {
      console.warn("⚠️ Impossible de mettre en pause : aucun enregistrement actif.");
    }
  }

  // Reprendre après une pause
  resume() {
    if (!this.isInit()) {
      return;
    }

    if (this.mediaRecorder.state === "paused") {
      this.mediaRecorder.resume();
      this.isPaused = false;
    } else {
      console.warn("⚠️ Impossible de reprendre : l'enregistrement n'est pas en pause.");
    }
  }

  // Arrêter l'enregistrement et renvoyer le blob audio
  stop() {
    return new Promise((resolve) => {
      if(!this.isInit()){
        resolve(null);
        return;
      }

      this.mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/webm" });
        resolve({ audioBlob });
      });
      
      this.mediaRecorder.stop();
    });
  }

  // Vérifie si l'objet est bien instancier
  isInit(){
    if (!this.mediaRecorder) {
      console.error("⚠️ AudioRecorder non initialisé !");
      return false;
    }
    else{
      return true;
    }
  }

  // Libérer les ressources du micro
  cleanup() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
  }
}
