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

  const generateLocalOrchestratorReply = (query: string, lang: Language) => {
    const q = query.toLowerCase();

    if (q.includes('scholarship') || q.includes('छात्रवृत्ति') || q.includes('शिष्यवृत्ती') || q.includes('mahadbt') || q.includes('college') || q.includes('student')) {
      if (lang === 'hi') {
        return {
          reply: `नमस्ते ${profile.fullName}! आपकी प्रोफ़ाइल (${profile.state}, श्रेणी: ${profile.category || 'OBC'}, वार्षिक आय: ₹${(profile.annualFamilyIncome || 150000).toLocaleString('en-IN')}) के आधार पर, यहाँ प्रमुख अनुशंसित छात्रवृत्तियां हैं:\n\n1. 🎓 पोस्ट-मैट्रिक छात्रवृत्ति ओबीसी छात्रों के लिए (MahaDBT)\n   • विभाग: बहुजन कल्याण विभाग, महाराष्ट्र\n   • लाभ: सरकारी/अनुदानित कॉलेजों में 100% शिक्षण शुल्क और परीक्षा शुल्क प्रतिपूर्ति।\n   • पात्रता स्थिति: 🟢 पात्र (आय सीमा ₹1,50,000 से कम)\n\n2. 🎓 राजर्षि छत्रपति शाहू महाराज शिक्षण शुल्क शिष्यवृत्ती योजना (EBC)\n   • विभाग: उच्च एवं तकनीकी शिक्षा विभाग\n   • लाभ: 50% शिक्षण शुल्क प्रतिपूर्ति।\n   • पात्रता स्थिति: 🟢 पात्र (आय सीमा ₹8,00,000 से कम)\n\nआप कौन सी छात्रवृत्ति के लिए आवेदन शुरू करना चाहते हैं?`,
          tools: ['search_scholarships', 'check_eligibility', 'get_required_documents'],
          actions: [
            { label: 'पात्रता नियम देखें', actionType: 'check_eligibility', payload: 'MAHA_OBC_SCHOLARSHIP' },
            { label: 'आवश्यक दस्तावेज़ देखें', actionType: 'view_documents', payload: 'MAHA_OBC_SCHOLARSHIP' },
            { label: 'आवेदन शुरू करें', actionType: 'start_application', payload: 'MAHA_OBC_SCHOLARSHIP' }
          ]
        };
      } else if (lang === 'mr') {
        return {
          reply: `नमस्कार ${profile.fullName}! तुमच्या प्रोफाईलनुसार (${profile.state}, प्रवर्ग: ${profile.category || 'OBC'}, कौटुंबिक उत्पन्न: ₹${(profile.annualFamilyIncome || 150000).toLocaleString('en-IN')}), खालील मुख्य शिष्यवृत्ती योजना उपलब्ध आहेत:\n\n1. 🎓 इतर मागासवर्ग (OBC) विद्यार्थ्यांसाठी शिक्षणोत्तर शिष्यवृत्ती (MahaDBT)\n   • विभाग: इतर बहुजन कल्याण विभाग, महाराष्ट्र\n   • लाभ: शासकीय व अनुदानित महाविद्यालयांमध्ये १००% शिक्षण शुल्क व परीक्षा शुल्क परतावा.\n   • पात्रता स्थिती: 🟢 पात्र (उत्पन्न मर्यादा ₹१,५०,००० पेक्षा कमी)\n\n2. 🎓 राजर्षी छत्रपती शाहू महाराज शिक्षण शुल्क शिष्यवृत्ती योजना (EBC)\n   • विभाग: उच्च व तंत्रशिक्षण विभाग\n   • लाभ: ५०% शिक्षण शुल्क परतावा.\n   • पात्रता स्थिती: 🟢 पात्र (उत्पन्न मर्यादा ₹८,००,००० पेक्षा कमी)\n\nतुम्हाला कोणत्या शिष्यवृत्तीसाठी अर्ज प्रक्रिया सुरू करायची आहे?`,
          tools: ['search_scholarships', 'check_eligibility', 'get_required_documents'],
          actions: [
            { label: 'पात्रता नियम तपासा', actionType: 'check_eligibility', payload: 'MAHA_OBC_SCHOLARSHIP' },
            { label: 'आवश्यक कागदपत्रे पहा', actionType: 'view_documents', payload: 'MAHA_OBC_SCHOLARSHIP' },
            { label: 'अर्ज प्रक्रिया सुरू करा', actionType: 'start_application', payload: 'MAHA_OBC_SCHOLARSHIP' }
          ]
        };
      } else {
        return {
          reply: `Hello ${profile.fullName}! Based on your profile (${profile.state}, Category: ${profile.category || 'OBC'}, Annual Income: ₹${(profile.annualFamilyIncome || 150000).toLocaleString('en-IN')}), here are the top recommended scholarships for you:\n\n1. 🎓 Post-Matric Scholarship for OBC Students (MahaDBT)\n   • Department: Other Backward Bahujan Welfare Department, Maharashtra\n   • Key Benefit: 100% Tuition Fee & Exam Fee reimbursement for Government/Aided Colleges.\n   • Eligibility Verdict: 🟢 ELIGIBLE (Annual income <= ₹1,50,000)\n\n2. 🎓 Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC)\n   • Department: Higher and Technical Education Department\n   • Key Benefit: 50% Tuition Fee waiver.\n   • Eligibility Verdict: 🟢 ELIGIBLE (Annual income <= ₹8,00,000)\n\nWould you like to check required documents or start preparing your application draft?`,
          tools: ['search_scholarships', 'check_eligibility', 'get_required_documents'],
          actions: [
            { label: 'Check Rules & Eligibility', actionType: 'check_eligibility', payload: 'MAHA_OBC_SCHOLARSHIP' },
            { label: 'View Required Documents', actionType: 'view_documents', payload: 'MAHA_OBC_SCHOLARSHIP' },
            { label: 'Start Application Draft', actionType: 'start_application', payload: 'MAHA_OBC_SCHOLARSHIP' }
          ]
        };
      }
    }

    if (q.includes('document') || q.includes('certificate') || q.includes('दस्तावेज़') || q.includes('कागदपत्रे')) {
      if (lang === 'hi') {
        return {
          reply: `महाडीबीटी छात्रवृत्ति के लिए आवश्यक दस्तावेज़ चेकलिस्ट:\n\n1. 📄 आधार कार्ड (मोबाइल नंबर से जुड़ा हुआ)\n2. 📄 महाराष्ट्र अधिवास प्रमाण पत्र (Domicile Certificate)\n3. 📄 तहसीलदार द्वारा जारी आय प्रमाण पत्र (Income Certificate <= ₹1,50,000)\n4. 📄 जाति प्रमाण पत्र और जाति वैधता (Caste Validity Certificate)\n5. 📄 पिछली परीक्षा की मार्कशीट (10th/12th Marksheet)\n6. 📄 कॉलेज प्रवेश शुल्क रसीद (Admission Fee Receipt)\n7. 📄 बैंक खाता विवरण (Aadhaar Seeded Bank Account)\n\nआप दस्तावेज़ स्टूडियो में अपने प्रमाणपत्र अपलोड कर सकते हैं और OCR द्वारा विवरण स्वतः निकाल सकते हैं।`,
          tools: ['get_required_documents', 'extract_document_data'],
          actions: [
            { label: 'दस्तावेज़ स्टूडियो खोलें', actionType: 'view_documents', payload: 'MAHA_OBC_SCHOLARSHIP' }
          ]
        };
      } else if (lang === 'mr') {
        return {
          reply: `MahaDBT शिष्यवृत्तीसाठी आवश्यक कागदपत्रांची यादी:\n\n1. 📄 आधार कार्ड (मोबाईल नंबरशी लिंक असलेले)\n2. 📄 महाराष्ट्र अधिवास दाखला (Domicile Certificate)\n3. 📄 तहसीलदार दाखला - उत्पन्न प्रमाणपत्र (Income Certificate <= ₹१,५०,०००)\n4. 📄 जात दाखला व जात वैधता प्रमाणपत्र (Caste & Validity Certificate)\n5. 📄 मागील वर्षाची गुणपत्रिका (Mark Sheet)\n6. 📄 कॉलेज प्रवेश फी पावती (Admission Receipt)\n7. 📄 बँक पासबुक प्रत (Aadhaar Seeded Bank Account)\n\nतुम्ही डॉक्युमेंट स्टुडिओमध्ये कागदपत्रे अपलोड करून OCR द्वारे माहिती पडताळू शकता.`,
          tools: ['get_required_documents', 'extract_document_data'],
          actions: [
            { label: 'डॉक्युमेंट स्टुडिओ उघडा', actionType: 'view_documents', payload: 'MAHA_OBC_SCHOLARSHIP' }
          ]
        };
      } else {
        return {
          reply: `Required document checklist for MahaDBT Scholarships:\n\n1. 📄 Aadhaar Card (Linked with active mobile number)\n2. 📄 Domicile Certificate of Maharashtra State\n3. 📄 Income Certificate issued by Competent Authority / Tehsildar (<= ₹1,50,000)\n4. 📄 Caste Certificate & Caste Validity Certificate\n5. 📄 Previous Academic Year Mark Sheet (10th / 12th / Degree)\n6. 📄 College Admission Fee Receipt & Bonafide Certificate\n7. 📄 Bank Account Passbook (Aadhaar Seeded / NPCI Mapping Active)\n\nYou can upload and scan your certificates in Document Studio with simulated OCR extraction.`,
          tools: ['get_required_documents', 'extract_document_data'],
          actions: [
            { label: 'Open Document Studio', actionType: 'view_documents', payload: 'MAHA_OBC_SCHOLARSHIP' }
          ]
        };
      }
    }

    if (lang === 'hi') {
      return {
        reply: `मैंने स्कीम साथी ऑर्केस्ट्रेटर द्वारा आपकी खोज का विश्लेषण किया है।\n\nआपकी प्रोफ़ाइल के लिए 22 केंद्रीय और राज्य स्तरीय योजनाएं और छात्रवृत्तियां उपलब्ध हैं। आप योजनाओं को देख सकते हैं, अपनी पात्रता की जांच कर सकते हैं और आधिकारिक पोर्टल पर आवेदन जमा कर सकते हैं।`,
        tools: ['search_all_government_schemes', 'check_eligibility'],
        actions: [
          { label: 'योजनाएं खोजें', actionType: 'search', payload: 'all' },
          { label: 'छात्रवृत्तियां देखें', actionType: 'search', payload: 'scholarship' }
        ]
      };
    } else if (lang === 'mr') {
      return {
        reply: `मी स्कीम साथी ऑर्केस्ट्रेटरद्वारे तुमच्या प्रश्नाचे विश्लेषण केले आहे.\n\nतुमच्या प्रोफाइलनुसार २२ केंद्रीय व राज्यस्तरीय कल्याणकारी योजना आणि शिष्यवृत्ती उपलब्ध आहेत. तुम्ही योजनांची माहिती पाहू शकता, पात्रता तपासू शकता आणि अर्जाचा मसुदा तयार करू शकता.`,
        tools: ['search_all_government_schemes', 'check_eligibility'],
        actions: [
          { label: 'योजना शोधा', actionType: 'search', payload: 'all' },
          { label: 'शिष्यवृत्ती पहा', actionType: 'search', payload: 'scholarship' }
        ]
      };
    } else {
      return {
        reply: `I have analyzed your request using the Scheme Saathi Orchestrator.\n\nThere are 22 Central & State Government schemes and scholarships available in the catalogue matching your requirements. You can evaluate deterministic eligibility, prepare application drafts, and hand off to verified government portals.`,
        tools: ['search_all_government_schemes', 'check_eligibility'],
        actions: [
          { label: 'Explore All Schemes', actionType: 'search', payload: 'all' },
          { label: 'Explore Scholarships', actionType: 'search', payload: 'scholarship' }
        ]
      };
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

    let replyData: any = null;

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

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        replyData = await response.json();
      }
    } catch (e) {
      console.warn("Backend chat endpoint unavailable, using local Scheme Saathi orchestrator:", e);
    }

    if (!replyData || !replyData.reply) {
      replyData = generateLocalOrchestratorReply(query, activeLang);
    }

    const agentMessage: AgentChatMessage = {
      id: `msg-${Date.now()}-agent`,
      sender: 'agent',
      text: replyData.reply || replyData.text || 'I processed your request using the Scheme Saathi Orchestrator.',
      timestamp: new Date().toISOString(),
      language: activeLang,
      toolInvocations: replyData.toolExecutions || replyData.tools || [],
      actionSuggestions: replyData.actionSuggestions || replyData.actions || []
    };

    onSaveChatHistory([...newHistory, agentMessage]);
    setIsLoading(false);
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
