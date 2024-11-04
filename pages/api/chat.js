import OpenAI from "openai";

const openai = new OpenAI({
  organization: process.env["ORG"],
  apiKey: process.env["OPENAI_API_KEY"],
});
export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-instruct",
      messages: [
        {
          role: "system",
          content:
            "Você é um psicólogo online profissional que oferece suporte emocional e conselhos baseados nas melhores práticas psicológicas.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const reply = response.data.choices[0].message.content.trim();
    res.status(200).json({ reply });
  } catch (error) {
    console.error(
      "Erro na integração com o ChatGPT:",
      error
    );
    res.status(500).json({ error: "Erro ao processar a requisição" });
  }
};
