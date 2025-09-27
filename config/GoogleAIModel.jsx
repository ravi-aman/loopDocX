
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "text-bison-001",
});

const generationConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.8,
  maxOutputTokens: 1024,
};


export const chatSession = model.startChat({
  generationConfig,
});


