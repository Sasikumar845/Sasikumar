
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in text-gray-300 leading-relaxed">
      <header>
        <h1 className="text-4xl font-bold text-white">About EmotionAI</h1>
        <p className="mt-2 text-lg text-gray-400">
          Understanding the technology behind the analysis.
        </p>
      </header>
      
      <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl">
        <h2 className="text-2xl font-semibold mb-3 text-blue-400">What is this app?</h2>
        <p>
          EmotionAI is a demonstration of Natural Language Processing (NLP) capabilities for emotion detection. 
          You can input any text, and the application will analyze it to determine the underlying emotional tones, 
          such as joy, sadness, anger, and more. This provides a fascinating insight into how AI can understand 
          the nuances of human language.
        </p>
      </div>

      <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl">
        <h2 className="text-2xl font-semibold mb-3 text-purple-400">How does it work?</h2>
        <p>
          This application is powered by Google's advanced Gemini model. When you submit a piece of text, 
          it is sent to the Gemini API with a specific prompt instructing it to act as an emotion analysis tool.
          The model processes the text and returns a structured JSON object containing a score for several key emotions.
          The front-end, built with React and TypeScript, then visualizes these scores in an easy-to-understand format.
        </p>
        <p className="mt-4">
          While this app is built on Gemini, the concept is similar to using fine-tuned NLP models from platforms like Hugging Face, 
          where a base model is trained on a specific dataset to become an expert at a particular task, in this case, emotion classification.
        </p>
      </div>

      <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl">
        <h2 className="text-2xl font-semibold mb-3 text-teal-400">Technology Stack</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Frontend:</strong> React 18 with TypeScript</li>
          <li><strong>Styling:</strong> Tailwind CSS for a modern, responsive UI</li>
          <li><strong>Routing:</strong> React Router for page navigation</li>
          <li><strong>AI Model:</strong> Google Gemini API (gemini-2.5-flash)</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
