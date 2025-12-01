import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Code, 
  Cpu, 
  Globe, 
  Database, 
  Layout, 
  Server, 
  ShieldAlert, 
  Trophy, 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Home, 
  Menu,
  X,
  Lightbulb,
  Clock
} from 'lucide-react';

// --- Syllabus Data Structure (Chinese) ---
const SYLLABUS = {
  compulsory: [
    { id: 'cA', title: '資訊處理', code: '單元 A', icon: BookOpen, desc: '數據控制、資訊處理循環及數據表示。' },
    { id: 'cB', title: '電腦系統基礎', code: '單元 B', icon: Cpu, desc: '硬件、軟件、操作系統及電腦組織。' },
    { id: 'cC', title: '互聯網及其應用', code: '單元 C', icon: Globe, desc: '網絡協議、威脅及網上協作。' },
    { id: 'cD', title: '基本程式編寫概念', code: '單元 D', icon: Code, desc: '演算法、流程圖及編程邏輯。' },
    { id: 'cE', title: '資訊及通訊科技對社會的影響', code: '單元 E', icon: ShieldAlert, desc: '道德、公平、法律問題及健康。' },
  ],
  electives: [
    { id: 'eA', title: '數據庫', code: '選修 A', icon: Database, desc: '實體關係圖 (ER Diagrams)、SQL 及正規化。' },
    { id: 'eB', title: '數據通訊及建網', code: '選修 B', icon: Server, desc: 'OSI 模型、網絡層及傳輸。' },
    { id: 'eC', title: '多媒體製作及網站開發', code: '選修 C', icon: Layout, desc: 'HTML/CSS、音訊/視訊編輯及設計。' },
    { id: 'eD', title: '軟件開發', code: '選修 D', icon: Code, desc: 'Java/Pascal、複雜演算法及測試。' },
  ]
};

// --- Mock Question Database (Chinese) ---
const MOCK_QUESTIONS = {
  cA: [
    {
      id: 1,
      question: "以下哪項**不是**資訊處理循環 (Information Processing Cycle) 的階段？",
      options: ["輸入 (Input)", "處理 (Processing)", "分發 (Distribution)", "儲存 (Storage)"],
      correct: 2,
      explanation: "標準的資訊處理循環包括輸入、處理、輸出和儲存。分發 (Distribution) 並不是核心階段之一。"
    },
    {
      id: 2,
      question: "二補碼 (Two's complement) 主要用於表示：",
      options: ["浮點數 (Floating point numbers)", "有符號整數 (Signed integers)", "ASCII 字元", "圖像數據"],
      correct: 1,
      explanation: "二補碼是用二進制表示有符號整數（正數和負數）的標準方法。"
    }
  ],
  cB: [
    {
      id: 1,
      question: "哪個組件負責解碼和執行指令？",
      options: ["隨機存取記憶體 (RAM)", "硬碟 (Hard Disk)", "中央處理器 (CPU)", "匯流排 (Bus)"],
      correct: 2,
      explanation: "中央處理器 (CPU) 負責提取、解碼和執行指令。"
    }
  ],
  cC: [
    {
      id: 1,
      question: "哪種協議用於電腦網絡上的安全通訊？",
      options: ["HTTP", "FTP", "HTTPS", "SMTP"],
      correct: 2,
      explanation: "HTTPS (超文本傳輸安全協定) 是 HTTP 的擴展，用於安全通訊。"
    }
  ],
  cD: [
    {
      id: 1,
      question: "以下偽代碼的輸出是什麼：`x = 5; IF x > 3 THEN PRINT 'A' ELSE PRINT 'B'`？",
      options: ["A", "B", "錯誤", "沒有輸出"],
      correct: 0,
      explanation: "由於 x (5) 大於 3，條件為真，因此會輸出 'A'。"
    }
  ],
  cE: [
    {
      id: 1,
      question: "以下哪項是指擁有科技的人與沒有科技的人之間的差距？",
      options: ["數碼隔膜 (Digital Divide)", "頻寬差距 (Bandwidth Gap)", "技術分裂 (Tech Split)", "網絡分離 (Cyber Separation)"],
      correct: 0,
      explanation: "數碼隔膜 (Digital Divide) 指的是在獲取、使用資訊及通訊科技或受其影響方面的經濟和社會不平等。"
    }
  ],
  // Fallback for electives
  default: [
    {
      id: 1,
      question: "此單元的範例題目 (內容即將推出)",
      options: ["選項 A", "選項 B", "選項 C", "選項 D"],
      correct: 0,
      explanation: "這是尚未載入具體模擬數據的單元的預留位置題目。"
    }
  ]
};

const Header = ({ setView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => setView('home')}
        >
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl">
            D
          </div>
          <span className="text-xl font-bold tracking-tight">DSE<span className="text-blue-400">ICT</span>Master</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <button onClick={() => setView('home')} className="hover:text-blue-400 transition">主頁</button>
          <button onClick={() => setView('syllabus')} className="hover:text-blue-400 transition">課程與練習</button>
          <button onClick={() => setView('stats')} className="hover:text-blue-400 transition">我的進度</button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 p-4 space-y-3 border-t border-slate-700">
          <button onClick={() => { setView('home'); setIsMenuOpen(false); }} className="block w-full text-left py-2">主頁</button>
          <button onClick={() => { setView('syllabus'); setIsMenuOpen(false); }} className="block w-full text-left py-2">課程與練習</button>
          <button onClick={() => { setView('stats'); setIsMenuOpen(false); }} className="block w-full text-left py-2">我的進度</button>
        </div>
      )}
    </header>
  );
};

const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
      <p className="text-xs text-slate-400 mt-2">{subtext}</p>
    </div>
    <div className={`p-3 rounded-lg ${color} text-white`}>
      <Icon size={24} />
    </div>
  </div>
);

const ModuleCard = ({ module, onSelect }) => (
  <div 
    onClick={() => onSelect(module)}
    className="bg-white rounded-xl border border-slate-200 p-5 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <module.icon size={24} />
      </div>
      <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded">{module.code}</span>
    </div>
    <h3 className="font-bold text-lg text-slate-800 mb-2">{module.title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{module.desc}</p>
    <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
      開始練習 <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

const QuizInterface = ({ module, onExit }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = MOCK_QUESTIONS[module.id] || MOCK_QUESTIONS.default;
  const question = questions[currentQ];

  const handleOptionClick = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === question.correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-600">
            <Trophy size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">測驗完成！</h2>
          <p className="text-slate-500 mb-8">你已完成 {module.title} 的練習。</p>
          
          <div className="flex justify-center items-center space-x-12 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">{score} / {questions.length}</div>
              <div className="text-sm text-slate-400 uppercase tracking-wide mt-1">分數</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">{Math.round((score/questions.length)*100)}%</div>
              <div className="text-sm text-slate-400 uppercase tracking-wide mt-1">準確率</div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button 
              onClick={onExit}
              className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition"
            >
              返回課題
            </button>
            <button 
              onClick={() => { setShowResult(false); setCurrentQ(0); setScore(0); setIsAnswered(false); setSelectedOption(null); }}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              重試測驗
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{module.title}</h2>
          <span className="text-sm text-slate-500">{module.code} • 第 {currentQ + 1} 題 (共 {questions.length} 題)</span>
        </div>
        <button onClick={onExit} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
          <X size={20} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((currentQ) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="p-6 md:p-8">
          <h3 className="text-lg md:text-xl font-medium text-slate-800 mb-6 leading-relaxed">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center ";
              
              if (isAnswered) {
                if (idx === question.correct) {
                  btnClass += "border-green-500 bg-green-50 text-green-700";
                } else if (idx === selectedOption) {
                  btnClass += "border-red-500 bg-red-50 text-red-700";
                } else {
                  btnClass += "border-slate-100 text-slate-400";
                }
              } else {
                btnClass += "border-slate-100 hover:border-blue-200 hover:bg-slate-50 text-slate-700";
              }

              return (
                <button 
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  className={btnClass}
                  disabled={isAnswered}
                >
                  <span className="font-medium">{opt}</span>
                  {isAnswered && idx === question.correct && <CheckCircle2 size={20} className="text-green-600" />}
                  {isAnswered && idx === selectedOption && idx !== question.correct && <XCircle size={20} className="text-red-500" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation Footer (Only shows after answering) */}
        {isAnswered && (
          <div className="bg-slate-50 p-6 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mt-1">
                <Lightbulb size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-1">解說</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{question.explanation}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={nextQuestion}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center"
              >
                {currentQ === questions.length - 1 ? '完成測驗' : '下一題'} <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard = ({ setView, onSelectModule }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white mb-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">精通 HKDSE ICT</h1>
          <p className="text-blue-100 text-lg max-w-2xl mb-8">
            全面的資訊及通訊科技考試練習。涵蓋必修部分 A-E 及所有選修單元。
          </p>
          <button 
            onClick={() => setView('syllabus')}
            className="bg-white text-blue-700 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg inline-flex items-center"
          >
            立即開始練習 <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard title="已嘗試題目" value="12" subtext="本週 +4" icon={BookOpen} color="bg-blue-500" />
        <StatCard title="平均分" value="78%" subtext="前 20% 用戶" icon={Trophy} color="bg-yellow-500" />
        <StatCard title="學習連續日數" value="3 天" subtext="繼續保持！" icon={Clock} color="bg-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
           <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-slate-800">最近單元</h2>
            <button onClick={() => setView('syllabus')} className="text-blue-600 font-medium text-sm hover:underline">查看全部</button>
          </div>
          <div className="space-y-4">
             <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Cpu size={20} /></div>
                  <div>
                    <h4 className="font-bold text-slate-800">單元 B: 電腦系統基礎</h4>
                    <p className="text-xs text-slate-500">2 小時前練習</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-green-600">85%</span>
                  <span className="text-xs text-slate-400">準確率</span>
                </div>
             </div>
             <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Code size={20} /></div>
                  <div>
                    <h4 className="font-bold text-slate-800">單元 D: 基本程式編寫概念</h4>
                    <p className="text-xs text-slate-500">昨天練習</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-orange-500">60%</span>
                  <span className="text-xs text-slate-400">準確率</span>
                </div>
             </div>
          </div>
        </div>

        {/* Quick Tips / Announcements */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
           <h3 className="font-bold text-slate-800 mb-4 flex items-center"><Lightbulb className="mr-2 text-yellow-500" size={20} /> 考試貼士</h3>
           <ul className="space-y-4">
             <li className="flex items-start text-sm text-slate-600">
               <span className="bg-blue-100 text-blue-600 font-bold px-2 py-0.5 rounded mr-2 text-xs">最新</span>
               請留意 2023 年起校本評核 (SBA) 的比重已有所更改。請查閱最新的評估指引。
             </li>
             <li className="flex items-start text-sm text-slate-600">
               <span className="bg-green-100 text-green-600 font-bold px-2 py-0.5 rounded mr-2 text-xs">技巧</span>
               在 SQL 題目中，使用聚合函數 (aggregate functions) 時，務必留意 "GROUP BY" 子句。
             </li>
              <li className="flex items-start text-sm text-slate-600">
               <span className="bg-green-100 text-green-600 font-bold px-2 py-0.5 rounded mr-2 text-xs">技巧</span>
               對於單元 A，請清楚熟記「數據」(Data) 與「資訊」(Information) 的分別。
             </li>
           </ul>
        </div>
      </div>
    </div>
  );
};

const SyllabusView = ({ onSelectModule }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800">選擇課題</h2>
        <p className="text-slate-500 mt-2">從必修或選修部分選擇一個單元開始練習。</p>
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-bold text-slate-700 mb-4 px-2 border-l-4 border-blue-500">必修部分</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SYLLABUS.compulsory.map(mod => (
            <ModuleCard key={mod.id} module={mod} onSelect={onSelectModule} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-700 mb-4 px-2 border-l-4 border-indigo-500">選修部分</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SYLLABUS.electives.map(mod => (
            <ModuleCard key={mod.id} module={mod} onSelect={onSelectModule} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [view, setView] = useState('home'); // home, syllabus, quiz, stats
  const [activeModule, setActiveModule] = useState(null);

  const startQuiz = (module) => {
    setActiveModule(module);
    setView('quiz');
  };

  const renderContent = () => {
    switch(view) {
      case 'home':
        return <Dashboard setView={setView} onSelectModule={startQuiz} />;
      case 'syllabus':
        return <SyllabusView onSelectModule={startQuiz} />;
      case 'quiz':
        return <QuizInterface module={activeModule} onExit={() => setView('syllabus')} />;
      case 'stats':
        return (
          <div className="container mx-auto px-4 py-12 text-center">
            <BarChart3 size={64} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-2xl font-bold text-slate-800">詳細統計即將推出</h2>
            <p className="text-slate-500">我們正在建立詳細圖表以追蹤您的 DSE ICT 進度。</p>
            <button onClick={() => setView('home')} className="mt-6 text-blue-600 hover:underline">返回主頁</button>
          </div>
        );
      default:
        return <Dashboard setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header setView={setView} />
      <main className="min-h-[calc(100vh-200px)]">
        {renderContent()}
      </main>
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p className="mb-2">專為 HKDSE ICT 學生設計</p>
          <p>© {new Date().getFullYear()} DSE ICT Master. 基於 2021 年課程及評估指引。</p>
        </div>
      </footer>
    </div>
  );
};

export default App;