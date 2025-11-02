import React, { useState, useCallback } from 'react';
import { detectEmotion } from '../services/geminiService';
import type { EmotionPrediction } from '../types';

const emotionColorMap: { [key: string]: string } = {
  joy: 'bg-yellow-500',
  sadness: 'bg-blue-500',
  anger: 'bg-red-500',
  fear: 'bg-purple-500',
  surprise: 'bg-pink-500',
  love: 'bg-rose-500',
  neutral: 'bg-gray-500',
};

// Define ResultsDisplay outside HomePage to prevent re-creation on every render.
const ResultsDisplay: React.FC<{ predictions: EmotionPrediction | null }> = ({ predictions }) => {
  if (!predictions) return null;

  // FIX: Changed sort callback to use index access for more reliable type inference.
  // The original destructuring `([, a], [, b])` caused TypeScript to fail to infer `a` and `b` as numbers.
  const sortedEmotions = Object.entries(predictions).sort((a, b) => b[1] - a[1]);

  return (
    <div className="mt-8 p-6 bg-gray-800 border border-gray-700 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-100">Analysis Results</h2>
      <div className="space-y-4">
        {sortedEmotions.map(([emotion, score]) => (
          <div key={emotion}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-300 capitalize">{emotion}</span>
              <span className="text-sm font-medium text-gray-400">{(score * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className={`${emotionColorMap[emotion.toLowerCase()] || 'bg-gray-500'} h-2.5 rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${score * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const HomePage: React.FC = () => {
  const [text, setText] = useState('');
  const [predictions, setPredictions] = useState<EmotionPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setPredictions(null);
    try {
      const result = await detectEmotion(text);
      setPredictions(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [text]);

  return (
    <div className="animate-fade-in">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Emotion Detection NLP
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Analyze the emotional tone of any text using the power of Gemini.
        </p>
      </header>

      <div className="space-y-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here... e.g., 'I am so happy to be learning about AI today!'"
          className="w-full h-40 p-4 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 resize-none"
          disabled={isLoading}
        />
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-300 shadow-lg"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze Emotion'
          )}
        </button>
      </div>
      
      {error && (
        <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      <ResultsDisplay predictions={predictions} />
    </div>
  );
};

export default HomePage;