import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2, HelpCircle, XCircle, Info, RefreshCw } from 'lucide-react';
import { askAiAdvisor } from '../services/api';

export default function AiChatWidget({ productId, productName }) {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      response_en: `Hi! I'm your Mumz AI Advisor. Ask me anything about compatibility or safety for the ${productName}.`,
      response_ar: `مرحباً! أنا مستشار Mumz بالذكاء الاصطناعي. اسألني عن أي شيء يتعلق بتوافق أو سلامة ${productName}.`,
      type: 'greeting',
      timestamp: new Date()
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

  const handleSubmit = async (e, retryQuestion = null) => {
    if (e) e.preventDefault();
    const questionToAsk = retryQuestion || input;
    if (!questionToAsk.trim() || isLoading) return;

    if (!retryQuestion) {
      setInput('');
      setMessages(prev => [...prev, { role: 'user', content: questionToAsk, timestamp: new Date() }]);
    }

    setIsLoading(true);

    try {
      const data = await askAiAdvisor(questionToAsk, i18n.language);
      setMessages(prev => [...prev, { role: 'ai', ...data, timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'ai',
        response_en: 'Service temporarily unavailable. Please try again.',
        response_ar: 'الخدمة غير متوفرة مؤقتاً. يرجى المحاولة مرة أخرى.',
        type: 'error',
        originalQuestion: questionToAsk,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAiMessageText = (msg) => {
    return i18n.language === 'ar' ? msg.response_ar : msg.response_en;
  };

  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="card flex flex-col h-[600px] lg:h-[700px] border-t-4 border-t-[#d99c9c] shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="bg-white p-5 flex items-center gap-4 border-b border-premium-100 z-10 relative">
        <div className="w-12 h-12 bg-[#fceeee] rounded-full flex items-center justify-center text-[#d99c9c] shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-lg text-premium-800">Ask Mumz AI Advisor</h2>
          <p className="text-xs text-premium-500 font-medium tracking-wide">Instant safety & compatibility checks</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 bg-[#fdfaf6] z-10 relative">
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';

          if (isUser) {
            return (
              <div key={idx} className="flex justify-end">
                <div className="flex flex-col items-end">
                  <div className="max-w-[85%] bg-[#d99c9c] text-white rounded-3xl rounded-tr-sm p-4 shadow-sm text-sm leading-relaxed">
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-premium-400 mt-1 px-1">{formatTime(msg.timestamp)}</span>
                </div>
              </div>
            );
          }

          // AI Message
          const isDanger = msg.safety_flag;
          const isError = msg.type === 'error';
          const cardBorder = isDanger ? 'border-red-400 bg-red-50' : isError ? 'border-amber-400 bg-amber-50' : 'border-premium-100 bg-white';

          return (
            <div key={idx} className="flex justify-start">
              <div className="flex flex-col items-start w-full">
                <div className={`max-w-[95%] border ${cardBorder} shadow-sm rounded-3xl rounded-tl-sm p-5 flex flex-col gap-4`}>

                  {/* Warning Alert */}
                  {isDanger && (
                    <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider mb-1 bg-red-100 p-2 rounded-lg">
                      <AlertTriangle className="w-4 h-4" /> Safety Alert
                    </div>
                  )}

                  {/* Main Text */}
                  <p className={`text-sm leading-relaxed ${isDanger ? 'text-red-900 font-medium' : isError ? 'text-amber-900 font-medium' : 'text-premium-800'}`}>
                    {getAiMessageText(msg)}
                  </p>

                  {/* Structured Data Badges */}
                  {!msg.type && (
                    <div className="mt-2 pt-4 border-t border-premium-100/50 flex flex-col gap-3">

                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                        {msg.is_compatible === true ? (
                          <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100">
                            <CheckCircle2 className="w-4 h-4" /> Compatible
                          </span>
                        ) : msg.is_compatible === false ? (
                          <span className="flex items-center gap-1.5 text-red-700 bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-100">
                            <XCircle className="w-4 h-4" /> Not Compatible
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-100">
                            <HelpCircle className="w-4 h-4" /> Not Sure
                          </span>
                        )}
                      </div>

                      {msg.confidence_score !== undefined && (
                        <div className="w-full mt-1">
                          <div className="flex justify-between text-[10px] uppercase text-premium-500 font-bold mb-1.5 tracking-wider">
                            <span>Confidence</span>
                            <span>{msg.confidence_score}%</span>
                          </div>
                          <div className="w-full bg-premium-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full transition-all duration-1000 ${msg.confidence_score > 80 ? 'bg-emerald-400' : msg.confidence_score > 50 ? 'bg-amber-400' : 'bg-red-400'}`}
                              style={{ width: `${msg.confidence_score}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {msg.source && (
                        <div className="flex items-center gap-1.5 text-[10px] text-premium-400 font-bold uppercase tracking-widest mt-1">
                          <Info className="w-3 h-3" /> Source: {msg.source}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Retry Button */}
                  {isError && msg.originalQuestion && (
                    <button
                      onClick={() => handleSubmit(null, msg.originalQuestion)}
                      className="flex items-center justify-center gap-2 mt-2 py-2 px-4 bg-white border border-amber-200 text-amber-800 rounded-xl text-sm font-medium hover:bg-amber-100 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" /> Retry Request
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-premium-400 mt-1 px-1">{formatTime(msg.timestamp)}</span>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-premium-100 shadow-sm rounded-3xl rounded-tl-sm p-5 flex flex-col gap-2">
              <div className="text-xs text-premium-400 font-medium tracking-wide mb-1">Analyzing product safety...</div>
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 bg-[#d99c9c] rounded-full animate-bounce"></div>
                <div className="w-2.5 h-2.5 bg-[#d99c9c] rounded-full animate-bounce delay-100"></div>
                <div className="w-2.5 h-2.5 bg-[#d99c9c] rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-premium-100 z-10 relative">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Will this fit in Nissan Patrol?"
            className="input-field rtl:pl-24 ltr:pr-24 text-sm font-medium disabled:opacity-50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute rtl:left-2 ltr:right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-[#d99c9c] text-white rounded-xl font-medium text-sm hover:bg-[#c68989] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Ask AI
          </button>
        </div>
      </form>

      {/* Decorative background blob */}
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#fceeee] rounded-full blur-3xl opacity-60 z-0 pointer-events-none"></div>
    </div>
  );
}
