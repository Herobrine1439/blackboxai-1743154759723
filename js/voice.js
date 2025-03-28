class VoiceSystem {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.recognition = null;
    this.isListening = false;
    this.initVoices();
  }

  initVoices() {
    // Load available voices when they change
    this.synth.onvoiceschanged = () => {
      this.voices = this.synth.getVoices();
      this.selectVoice('Google UK English Male');
    };
    
    // Initial voice load
    this.voices = this.synth.getVoices();
    if (this.voices.length > 0) {
      this.selectVoice('Google UK English Male');
    }
  }

  selectVoice(voiceName) {
    this.selectedVoice = this.voices.find(voice => 
      voice.name.includes(voiceName)
    );
  }

  speak(text) {
    if (this.synth.speaking) {
      this.synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = 0.9;
    utterance.pitch = 0.8;
    this.synth.speak(utterance);
  }

  startRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      return;
    }

    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      return transcript;
    };

    this.recognition.start();
    this.isListening = true;
  }

  stopRecognition() {
    if (this.recognition) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  toggleRecognition() {
    if (this.isListening) {
      this.stopRecognition();
    } else {
      this.startRecognition();
    }
  }
}

// Export for module usage
export default VoiceSystem;