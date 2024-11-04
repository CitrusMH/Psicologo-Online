import React, { useState } from "react";

const TextToSpeech = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Seu navegador não suporta a síntese de voz");
    }
  };

  return (
    <button
      onClick={speak}
      disabled={isSpeaking}
      className={`mt-4 px-4 py-2 rounded-md text-white ${
        isSpeaking
          ? "bg-indigo-300 cursor-not-allowed"
          : "bg-indigo-400 hover:bg-indigo-500"
      } transition duration-200`}
    >
      {isSpeaking ? "Reproduzindo..." : "Ouvir Resposta"}
    </button>
  );
};

export default TextToSpeech;
