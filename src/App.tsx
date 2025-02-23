import { BookOpen, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface FlashCard {
  id: number;
  content: string;
  isFlipped: boolean;
  summary: string;
}

function App() {
  const [text, setText] = useState('');
  const [cards, setCards] = useState<FlashCard[]>([]);
  const [isProcessed, setIsProcessed] = useState(false);

  const processText = () => {
    if (!text.trim()) return;
    
    // Split text into roughly equal chunks
    const words = text.split(' ');
    const chunkSize = Math.ceil(words.length / 5);
    const chunks: FlashCard[] = [];
    
    for (let i = 0; i < words.length; i += chunkSize) {
      const chunk = words.slice(i, i + chunkSize).join(' ');
      chunks.push({
        id: i,
        content: chunk,
        isFlipped: false,
        summary: `Key point ${chunks.length + 1}`
      });
    }
    
    setCards(chunks);
    setIsProcessed(true);
  };

  const flipCard = (id: number) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
    ));
  };

  const resetCards = () => {
    setText('');
    setCards([]);
    setIsProcessed(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <BookOpen className="w-8 h-8 text-indigo-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Learning Cards</h1>
        </div>

        {!isProcessed ? (
          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here to convert it into learning cards..."
              className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
            <button
              onClick={processText}
              disabled={!text.trim()}
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Learning Cards
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => flipCard(card.id)}
                  className="relative h-64 cursor-pointer group perspective"
                >
                  <div
                    className={`absolute w-full h-full transition-all duration-500 preserve-3d ${
                      card.isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg p-6 flex items-center justify-center">
                      <p className="text-lg text-gray-700 font-medium">
                        {card.summary}
                      </p>
                    </div>
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-indigo-600 rounded-xl shadow-lg p-6 flex items-center justify-center">
                      <p className="text-white">
                        {card.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={resetCards}
                className="flex items-center gap-2 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Start Over
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;