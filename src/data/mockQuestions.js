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

export default MOCK_QUESTIONS;