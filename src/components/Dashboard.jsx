import React from 'react';
import StatCard from './StatCard';
import ModuleCard from './ModuleCard';
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Clock, 
  ArrowRight // <--- Add this import
} from 'lucide-react';

// Dashboard component
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
            <ModuleCard module={{ title: '單元 B: 電腦系統基礎', code: 'B', desc: '2 小時前練習', score: '85%' }} onSelect={onSelectModule} />
            <ModuleCard module={{ title: '單元 D: 基本程式編寫概念', code: 'D', desc: '昨天練習', score: '60%' }} onSelect={onSelectModule} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;