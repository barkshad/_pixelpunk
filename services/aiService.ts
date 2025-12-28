
import { GoogleGenAI, Modality, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeVintageItem = async (base64Image: string, mimeType: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType } },
        { text: "Analyze this vintage garment. Identify the likely era, fabric type, construction details, and historical significance. Provide styling advice for a modern context." }
      ]
    },
    config: {
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });
  return response.text;
};

export const generateArchiveConcept = async (prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: `A professional studio editorial photograph of a high-end vintage fashion piece: ${prompt}. High fashion aesthetic, dramatic lighting, detailed textures, 8k resolution, cinematic composition.`,
    config: {
      numberOfImages: 1,
      aspectRatio: '3:4',
      outputMimeType: 'image/jpeg'
    }
  });
  
  const base64 = response.generatedImages[0].image.imageBytes;
  return `data:image/jpeg;base64,${base64}`;
};

export const startCuratorSession = (callbacks: any) => {
  const ai = getAI();
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
      },
      systemInstruction: "You are the Lead Curator at PixelPunk, an elite vintage archive. You are sophisticated, knowledgeable about 20th-century fashion (from Victorian to Y2K), and have an eye for modern silhouettes. You help clients understand the provenance of their pieces and how to style them with contemporary techwear and minimalism. Keep your tone professional yet artistic."
    }
  });
};
