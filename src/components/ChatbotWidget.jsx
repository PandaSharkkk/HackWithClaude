import { useState } from 'react';
import resourcesData from '../data/resources.json';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm here to help you find community resources in San Francisco. What are you looking for today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const mockChatResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    let response = {
      reply: "I can help you find resources! Try asking about food banks, shelters, water fountains, restrooms, or repair cafes.",
      suggested_resources: [],
    };

    if (lowerMessage.includes('food') || lowerMessage.includes('hungry') || lowerMessage.includes('eat')) {
      const foodResources = resourcesData.filter(r => r.category === 'food_bank').slice(0, 3);
      response = {
        reply: "Here are some food banks near you that can help. They provide free groceries and meals:",
        suggested_resources: foodResources,
      };
    } else if (lowerMessage.includes('shelter') || lowerMessage.includes('sleep') || lowerMessage.includes('housing')) {
      const shelterResources = resourcesData.filter(r => r.category === 'shelter').slice(0, 3);
      response = {
        reply: "I found these shelters that offer emergency housing and support services:",
        suggested_resources: shelterResources,
      };
    } else if (lowerMessage.includes('water') || lowerMessage.includes('drink') || lowerMessage.includes('thirsty')) {
      const waterResources = resourcesData.filter(r => r.category === 'water').slice(0, 3);
      response = {
        reply: "Here are public water fountains where you can get free drinking water:",
        suggested_resources: waterResources,
      };
    } else if (lowerMessage.includes('restroom') || lowerMessage.includes('bathroom') || lowerMessage.includes('toilet')) {
      const restroomResources = resourcesData.filter(r => r.category === 'restroom').slice(0, 3);
      response = {
        reply: "Here are public restrooms available in San Francisco:",
        suggested_resources: restroomResources,
      };
    } else if (lowerMessage.includes('repair') || lowerMessage.includes('fix') || lowerMessage.includes('broken')) {
      const repairResources = resourcesData.filter(r => r.category === 'repair_cafe').slice(0, 3);
      response = {
        reply: "These repair cafes can help you fix broken items for free:",
        suggested_resources: repairResources,
      };
    }

    return response;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = mockChatResponse(userMessage);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.reply,
        resources: response.suggested_resources,
      }]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all hover:scale-110 z-50"
          aria-label="Open chatbot"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <h3 className="font-bold text-lg">Resource Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
              aria-label="Close chatbot"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index}>
                <div
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
                {message.resources && message.resources.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.resources.map((resource) => (
                      <a
                        key={resource.id}
                        href={`/resource/${resource.id}`}
                        className="block bg-blue-50 hover:bg-blue-100 rounded-lg p-3 border border-blue-200 transition-colors"
                      >
                        <h4 className="font-semibold text-blue-900">{resource.name}</h4>
                        <p className="text-sm text-gray-600">{resource.address}</p>
                        <p className="text-xs text-gray-500 mt-1">{resource.hours}</p>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about resources..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
