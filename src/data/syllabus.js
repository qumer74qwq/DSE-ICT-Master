import { 
  BookOpen, 
  Cpu, 
  Globe, 
  Code, 
  ShieldAlert, 
  Database, 
  Server, 
  Layout 
} from 'lucide-react';

export const SYLLABUS = {
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

// Helper to find a module by ID
export const getModuleById = (id) => {
  const allModules = [...SYLLABUS.compulsory, ...SYLLABUS.electives];
  return allModules.find(m => m.id === id);
};