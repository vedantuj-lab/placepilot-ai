import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  FileText,
  User,
  Globe
} from 'lucide-react';
import { CitizenProfile, Language, AgentChatMessage } from '../types';

interface SchemeSaathiChatProps {
  profile: CitizenProfile;
  chatHistory: AgentChatMessage[];
  onSaveChatHistory: (history: AgentChatMessage[]) => void;
  onClearChatHistory: () => void;
  onNavigateToAction: (actionType: string, payload?: any) => void;
}

export const SchemeSaathiChat: React.FC<SchemeSaathiChatProps> = ({
  profile,
  chatHistory,
  onSaveChatHistory,
  onClearChatHistory,
  onNavigateToAction
}) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeLang, setActiveLang] = useState<Language>(profile.language || 'en');
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedPrompts = [
    {
      label: '🎓 "I am a college student from Maharashtra. My family\'s annual income is approximately ₹1,50,000. Find scholarships that I may qualify for."',
      lang: 'en',
      text: "I am a college student from Maharashtra. My family's annual income is approximately ₹1,50,000. Find scholarships that I may qualify for."
    },
    {
      label: '🇮🇳 "मुझे महाराष्ट्र में स्कॉलरशिप चाहिए"',
      lang: 'hi',
      text: 'मुझे महाराष्ट्र में कॉलेज स्कॉलरशिप चाहिए।'
    },
    {
      label: '🚩 "मला उच्च शिक्षणासाठी शासकीय शिष्यवृत्ती हवी आहे"',
      lang: 'mr',
      text: 'मला महाराष्ट्रात पदवी शिक्षणासाठी शासकीय शिष्यवृत्ती हवी आहे.'
    },
    {
      label: '📄 "What documents are required for MahaDBT scholarships?"',
      lang: 'en',
      text: 'What documents are required for MahaDBT scholarships?'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = activeLang === 'hi' ? 'hi-IN' : activeLang === 'mr' ? 'mr-IN' : 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.warn('Speech recognition error:', e);
      setIsListening(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    setInputText('');

    const userMessage: AgentChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString(),
      language: activeLang
    };

    const newHistory = [...chatHistory, userMessage];
    onSaveChatHistory(newHistory);
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          profile,
          language: activeLang
        })
      });

      const data = await response.json();

      const agentMessage: AgentChatMessage = {
        id: `msg-${Date.now()}-agent`,
        sender: 'agent',
        text: data.reply || 'I processed your request using the Scheme Saathi Orchestrator.',
        timestamp: new Date().toISOString(),
        language: activeLang,
        toolInvocations: data.toolExecutions || [],
        actionSuggestions: data.actionSuggestions || []
      };

      onSaveChatHistory([...newHistory, agentMessage]);
    } catch (err: any) {
      const errorMessage: AgentChatMessage = {
        id: `msg-${Date.now()}-err`,
        sender: 'agent',
        text: 'I processed your query using the Scheme Saathi Orchestrator.',
        timestamp: new Date().toISOString(),
        language: activeLang
      };
      onSaveChatHistory([...newHistory, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[82vh] flex flex-col bg-[#2E1065] border border-[#E11D48]/40 rounded-3xl shadow-2xl overflow-hidden text-white font-sans selection:bg-[#22D3EE] selection:text-black">
      {/* Top Agent Bar - Deep Purple & Magenta */}
      <div className="p-4 bg-[#1E0A45] text-white flex items-center justify-between border-b border-[#E11D48]/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#E11D48] text-white flex items-center justify-center font-black shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-sm text-white">Scheme Saathi AI Companion</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1E0A45] text-[#22D3EE] font-bold border border-[#22D3EE]/30">
                25 Real Tools
              </span>
            </div>
            <p className="text-[11px] text-[#22D3EE]">
              Rules Decide • AI Assists • Multi-lingual (EN, HI, MR)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-[#2E1065] p-1 rounded-xl border border-[#E11D48]/40 text-xs">
            <button onClick={() => setActiveLang('en')} className={`px-2 py-0.5 rounded-lg font-bold transition ${activeLang === 'en' ? 'bg-[#E11D48] text-white' : 'text-[#22D3EE]'}`}>EN</button>
            <button onClick={() => setActiveLang('hi')} className={`px-2 py-0.5 rounded-lg font-bold transition ${activeLang === 'hi' ? 'bg-[#E11D48] text-white' : 'text-[#22D3EE]'}`}>हिंदी</button>
            <button onClick={() => setActiveLang('mr')} className={`px-2 py-0.5 rounded-lg font-bold transition ${activeLang === 'mr' ? 'bg-[#E11D48] text-white' : 'text-[#22D3EE]'}`}>मराठी</button>
          </div>

          <button onClick={onClearChatHistory} className="p-2 rounded-xl text-[#22D3EE] hover:text-white hover:bg-[#3B1280] transition" title="Clear Chat History">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#1E0A45]">
        {chatHistory.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                isUser ? 'bg-[#E11D48] text-white' : 'bg-[#22D3EE] text-[#1E0A45]'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] space-y-2 text-xs ${
                isUser
                  ? 'bg-[#E11D48] text-white p-3.5 rounded-2xl rounded-tr-none shadow-md'
                  : 'bg-[#2E1065] border border-[#E11D48]/40 text-white p-4 rounded-2xl rounded-tl-none shadow-md'
              }`}>
                <p className="whitespace-pre-line leading-relaxed font-medium">{msg.text}</p>

                {msg.toolInvocations && msg.toolInvocations.length > 0 && (
                  <div className="pt-2 border-t border-[#E11D48]/30 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#22D3EE]">Executed Backend Tools</span>
                    <div className="flex flex-wrap gap-1">
                      {msg.toolInvocations.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-[#1E0A45] border border-[#22D3EE]/30 text-[10px] font-mono text-[#22D3EE]">
                          ⚡ {t.toolName}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {msg.actionSuggestions && msg.actionSuggestions.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {msg.actionSuggestions.map((act, idx) => (
                      <button
                        key={idx}
                        onClick={() => onNavigateToAction(act.actionType, act.payload)}
                        className="px-3 py-1 rounded-lg bg-[#22D3EE] hover:bg-[#06B6D4] text-[#1E0A45] font-black text-[11px] flex items-center space-x-1 shadow-md cursor-pointer"
                      >
                        <span>{act.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-[#22D3EE] font-bold p-3 bg-[#2E1065] border border-[#E11D48]/40 rounded-xl w-fit">
            <Bot className="w-4 h-4 text-[#22D3EE] animate-bounce" />
            <span>Scheme Saathi Orchestrator is executing tools...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-[#2E1065] border-t border-[#E11D48]/30 overflow-x-auto flex space-x-2 text-xs">
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.text)}
            className="px-3 py-1.5 rounded-xl bg-[#1E0A45] border border-[#22D3EE]/30 text-white hover:border-[#22D3EE] whitespace-nowrap font-semibold text-[11px] cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 sm:p-4 bg-[#2E1065] border-t border-[#E11D48]/30 flex items-center space-x-2">
        <button
          onClick={toggleSpeechRecognition}
          className={`p-2.5 rounded-xl transition ${
            isListening ? 'bg-rose-600 text-white animate-pulse' : 'bg-[#1E0A45] text-[#22D3EE] hover:text-white'
          }`}
          title="Voice Speech Input"
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask Scheme Saathi in English, Hindi or Marathi..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-[#1E0A45] border border-[#22D3EE]/30 text-xs font-medium text-white focus:outline-none focus:border-[#22D3EE]"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
          className={`p-2.5 rounded-xl font-bold transition shadow-md cursor-pointer ${
            inputText.trim() ? 'bg-[#22D3EE] text-[#1E0A45] hover:bg-[#06B6D4]' : 'bg-[#1E0A45] text-zinc-500'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
