import React, { useState } from "react";
import SpeechToText from "./SpeechToText";
import TextToSpeech from "./TextToSpeech";

const PsychologistChat = () => {
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUserSpeech = async (text) => {
    setTranscript(text);
    setLoading(true);
    const reply = await getChatGPTResponse(text);
    setResponse(reply);
    setLoading(false);
  };

  const getChatGPTResponse = async (userInput) => {
    try {
      const res = await fetch("./api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });
      const data = await res.json();
      console.log("teste teste", data);
      if (data.reply) {
        return data.reply;
      } else {
        console.log("Erro na resposta do ChatGPT1 :", data.error);
        return "Desculpe, ocorreu um erro ao processar sua solicitação.";
      }
    } catch (error) {
      console.error("Erro na requisição do ChatGPT 2:", error);
      return "Desculpe, ocorreu um erro ao processar sua solicitação.";
    }
  };

  return (
    <div className="chat-container bg-indigo-100 min-h-screen flex flex-col items-center justify-evenly p-4 w-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">
          Psicólogo Online
        </h1>
        {/* <div className="flex justify-center mb-4">
          <button
            onClick={() => handleUserSpeech("Este é um teste de exemplo")}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Enviar Teste
          </button> 
        </div> */}
        <SpeechToText onTranscript={handleUserSpeech} />
        <div className="response-section mt-6">
          <h2 className="text-xl font-semibold mb-2 text-indigo-600">
            Resposta:
          </h2>
          <div className="bg-indigo-200 p-4 rounded-md min-h-[100px] max-h-[200px] overflow-y-auto text-indigo-900">
            {loading ? (
              <p className="text-blue-500">Carregando...</p>
            ) : (
              <p>{response}</p>
            )}
          </div>
          {response && <TextToSpeech text={response} />}
        </div>
      </div>
    </div>
  );
};

export default PsychologistChat;
