import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams, Link } from 'react-router-dom'; // <--- 引入路由组件
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SyllabusView from './components/SyllabusView';
import QuizInterface from './components/QuizInterface';
import Login from './components/Login';
import { 
  BarChart3, 
  BookOpen, 
  Code, 
  Cpu, 
  Globe, 
  Database, 
  Layout, 
  Server, 
  ShieldAlert, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Home, 
  Menu,
  X,
  Lightbulb,
  Clock,
  LogOut, 
  User as UserIcon 
} from 'lucide-react';
import { getModuleById } from './data/syllabus'; // <--- Import the helper

// --- 简单的统计页面组件 ---
const StatsView = () => (
  <div className="container mx-auto px-4 py-12 text-center">
    <BarChart3 size={64} className="mx-auto text-slate-300 mb-4" />
    <h2 className="text-2xl font-bold text-slate-800">详细统计即将推出</h2>
    <p className="text-slate-500">我们正在建立详细图表以追蹤您的 DSE ICT 進度。</p>
    <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">返回主頁</Link>
  </div>
);

// --- Quiz Wrapper with Data Lookup ---
const QuizWrapper = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  
  // Find the actual module data
  const module = getModuleById(moduleId);

  // Handle invalid module ID
  if (!module) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-red-600">找不到該單元</h2>
        <button onClick={() => navigate('/syllabus')} className="text-blue-600 mt-4 hover:underline">
          返回課程列表
        </button>
      </div>
    );
  }

  return <QuizInterface module={module} onExit={() => navigate('/syllabus')} />;
};

// --- Main App Component ---
const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 检查本地存储
  useEffect(() => {
    const savedUser = localStorage.getItem('dse_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('dse_user', JSON.stringify(userData));
    navigate('/'); // 登录成功后跳转回首页
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('dse_user');
    navigate('/'); 
  };

  // 辅助函数：处理模块选择并跳转
  const handleSelectModule = (module) => {
    const moduleId = module.id || module; 
    navigate(`/quiz/${moduleId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="min-h-[calc(100vh-200px)]">
        <Routes>
          {/* 首页：任何人可见 */}
          <Route path="/" element={<Dashboard onSelectModule={handleSelectModule} />} />
          
          {/* 登录页：已登录则重定向到首页，未登录显示登录组件 */}
          <Route path="/login" element={
            user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
          } />

          {/* 课程列表：任何人可见 */}
          <Route path="/syllabus" element={<SyllabusView onSelectModule={handleSelectModule} />} />
          
          {/* 测验和统计：需要登录，否则重定向到登录页 */}
          <Route path="/quiz/:moduleId" element={
            user ? <QuizWrapper /> : <Navigate to="/login" replace />
          } />
          
          <Route path="/stats" element={
            user ? <StatsView /> : <Navigate to="/login" replace />
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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