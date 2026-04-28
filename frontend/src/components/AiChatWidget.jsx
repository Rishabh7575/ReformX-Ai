import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, ShieldCheck, HelpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AiChatWidget({ productId, productName }) {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content_en: `Hi! I'm your AI Safety Advisor. Ask me anything about compatibility or safety for the ${productName}.`,
      content_ar: `مرحباً! أنا مستشار السلامة بالذكاء الاصطناعي. اسألني عن أي شيء يتعلق بتوافق أو سلامة ${productName}.`,
      type: 'greeting'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId, 
          question: userMessage,
          language: i18n.language
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', ...data }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content_en: 'Sorry, I encountered an error answering your question.',
        content_ar: 'عذراً، واجهت خطأ أثناء الإجابة على سؤالك.',
        type: 'error'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAiMessageContent = (msg) => {
    if (msg.type === 'greeting' || msg.type === 'error') {
      return i18n.language === 'ar' ? msg.content_ar : msg.content_en;
    }
    return i18n.language === 'ar' ? msg.response_ar : msg.response_en;
  };

  return (
    <div className="card h-full flex flex-col max-h-[800px]">
      <div className="bg-premium-800 text-white p-4 flex items-center gap-3">
        <div className="bg-premium-700 p-2 rounded-full">
          <ShieldCheck className="w-6 h-6 text-premium-100" />
        </div>
        <div>
          <h2 className="font-semibold">{t('safety_advisor')}</h2>
          <p className="text-xs text-premium-200 opacity-80">Instant compatibility & safety checks</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-premium-50/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-premium-500 text-white rounded-br-sm' 
                : 'bg-white border border-premium-100 shadow-sm rounded-bl-sm'
            }`}>
              {msg.role === 'ai' && !msg.type && (
                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider flex-wrap">
                  {msg.is_compatible === true ? (
                    <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded"><CheckCircle2 className="w-3 h-3"/> {t('compatible')}</span>
                  ) : msg.is_compatible === false ? (
                    <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded"><AlertCircle className="w-3 h-3"/> {t('not_compatible')}</span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded"><HelpCircle className="w-3 h-3"/> {t('unknown')}</span>
                  )}
                  {msg.safety_flag && (
                    <span className="text-red-500 font-bold bg-red-50 px-2 py-1 rounded flex items-center gap-1"><AlertCircle className="w-3 h-3"/> SAFETY ALERT</span>
                  )}
                </div>
              )}
              <p className={`text-sm ${msg.role === 'user' ? 'text-white' : 'text-premium-800'}`}>
                {msg.role === 'user' ? msg.content : getAiMessageContent(msg)}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-premium-100 shadow-sm rounded-2xl rounded-bl-sm p-4 text-premium-400 text-sm flex gap-2">
              <div className="w-2 h-2 bg-premium-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-premium-300 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-premium-300 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-premium-100 bg-white">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('ask_question')}
            className="input-field pr-12"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-premium-500 text-white rounded-lg hover:bg-premium-600 disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </form>
    </div>
  );
}
