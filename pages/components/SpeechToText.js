// components/SpeechToText.js
import React, { useEffect, useState } from "react";

const SpeechToText = ({ onTranscript }) => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");

  var recognition;

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Seu navegador não suporta a Web Speech API");
      return;
    }

    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "pt-BR";

    recognition.onstart = () => {
      setListening(true);
      setError("");
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcriptPart + " ");
          if (onTranscript) {
            onTranscript(transcriptPart);
          }
        } else {
          interimTranscript += transcriptPart;
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Erro no reconhecimento de fala:", event.error);
      setError(event.error);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognition) {
      setListening(false);
      recognition.stop();
    }
  };

  return (
    <div >
      <h2 className="text-xl font-semibold mb-2 text-indigo-600">
        Transcrição:
      </h2>
      <p className="bg-indigo-200 p-4 rounded-md min-h-[100px] max-h-[200px] overflow-y-auto text-indigo-900">
        {transcript}
      </p>
      <p className="mt-2 text-sm text-gray-500"></p>
      {error && <p className="mt-2 text-sm text-red-500">Erro: {error}</p>}
      <div className="mt-4">
        {!listening ? (
          <button
            type="button"
            className="bg-indigo-400 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-200"
            onClick={startListening}
          >
            Começar a Ouvir
          </button>
        ) : (
          <button
            type="button"
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
            onClick={stopListening}
          >
            Parar de Ouvir
          </button>
        )}
      </div>
    </div>
  );
};

export default SpeechToText;
