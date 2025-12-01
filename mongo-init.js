// 切换到目标数据库
db = db.getSiblingDB('dse-ict-master');

// --- 1. Users 集合 ---
db.createCollection('users');
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "email": 1 }, { unique: true });
print("Users collection initialized.");

// --- 2. Modules 集合 ---
db.createCollection('modules');
db.modules.deleteMany({});
db.modules.insertMany([
  // --- 必修部分 ---
  { id: 'cA', title: '資訊處理', code: '單元 A', category: 'compulsory', desc: '數據控制、資訊處理循環及數據表示。' },
  { id: 'cB', title: '電腦系統基礎', code: '單元 B', category: 'compulsory', desc: '硬件、軟件、操作系統及電腦組織。' },
  { id: 'cC', title: '互聯網及其應用', code: '單元 C', category: 'compulsory', desc: '網絡協議、威脅及網上協作。' },
  { id: 'cD', title: '基本程式編寫概念', code: '單元 D', category: 'compulsory', desc: '演算法、流程圖及編程邏輯。' },
  { id: 'cE', title: '資訊及通訊科技對社會的影響', code: '單元 E', category: 'compulsory', desc: '道德、公平、法律問題及健康。' },
  // --- 选修部分 ---
  { id: 'eA', title: '數據庫', code: '選修 A', category: 'elective', desc: '實體關係圖 (ER Diagrams)、SQL 及正規化。' },
  { id: 'eB', title: '數據通訊及建網', code: '選修 B', category: 'elective', desc: 'OSI 模型、網絡層及傳輸。' },
  { id: 'eC', title: '多媒體製作及網站開發', code: '選修 C', category: 'elective', desc: 'HTML/CSS、音訊/視訊編輯及設計。' },
  { id: 'eD', title: '軟件開發', code: '選修 D', category: 'elective', desc: 'Java/Pascal、複雜演算法及測試。' }
]);
print("Modules initialized.");

// --- 3. Questions 集合 (新增) ---
db.createCollection('questions');
db.questions.createIndex({ "moduleId": 1 }); // 索引以加速查询
db.questions.deleteMany({});

const questions = [
  // cA: 資訊處理
  {
    moduleId: 'cA',
    question: "以下哪項**不是**資訊處理循環 (Information Processing Cycle) 的階段？",
    options: ["輸入 (Input)", "處理 (Processing)", "分發 (Distribution)", "儲存 (Storage)"],
    correct: 2,
    explanation: "標準的資訊處理循環包括輸入、處理、輸出和儲存。分發 (Distribution) 並不是核心階段之一。"
  },
  {
    moduleId: 'cA',
    question: "二補碼 (Two's complement) 主要用於表示：",
    options: ["浮點數 (Floating point numbers)", "有符號整數 (Signed integers)", "ASCII 字元", "圖像數據"],
    correct: 1,
    explanation: "二補碼是用二進制表示有符號整數（正數和負數）的標準方法。"
  },
  // cB: 電腦系統基礎
  {
    moduleId: 'cB',
    question: "哪個組件負責解碼和執行指令？",
    options: ["隨機存取記憶體 (RAM)", "硬碟 (Hard Disk)", "中央處理器 (CPU)", "匯流排 (Bus)"],
    correct: 2,
    explanation: "中央處理器 (CPU) 負責提取、解碼和執行指令。"
  },
  // cC: 互聯網及其應用
  {
    moduleId: 'cC',
    question: "哪種協議用於電腦網絡上的安全通訊？",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    correct: 2,
    explanation: "HTTPS (超文本傳輸安全協定) 是 HTTP 的擴展，用於安全通訊。"
  },
  // cD: 基本程式編寫概念
  {
    moduleId: 'cD',
    question: "以下偽代碼的輸出是什麼：`x = 5; IF x > 3 THEN PRINT 'A' ELSE PRINT 'B'`？",
    options: ["A", "B", "錯誤", "沒有輸出"],
    correct: 0,
    explanation: "由於 x (5) 大於 3，條件為真，因此會輸出 'A'。"
  },
  // cE: 資訊及通訊科技對社會的影響
  {
    moduleId: 'cE',
    question: "以下哪項是指擁有科技的人與沒有科技的人之間的差距？",
    options: ["數碼隔膜 (Digital Divide)", "頻寬差距 (Bandwidth Gap)", "技術分裂 (Tech Split)", "網絡分離 (Cyber Separation)"],
    correct: 0,
    explanation: "數碼隔膜 (Digital Divide) 指的是在獲取、使用資訊及通訊科技或受其影響方面的經濟和社會不平等。"
  }
];

db.questions.insertMany(questions);
print("Questions initialized.");

// --- 4. UserSettings & UserActions 集合 (新增) ---
db.createCollection('usersettings');
db.usersettings.createIndex({ "userId": 1 }, { unique: true });

db.createCollection('useractions');
db.useractions.createIndex({ "userId": 1 });
db.useractions.createIndex({ "actionType": 1 });
db.useractions.createIndex({ "timestamp": -1 });

print("All collections initialized successfully.");