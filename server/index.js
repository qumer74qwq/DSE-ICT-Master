import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(express.json());

// --- MongoDB 连接 ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB 连接成功'))
  .catch(err => console.error('MongoDB 连接失败:', err));

// ==========================================
//               数据库模型定义
// ==========================================

// 1. 用户模型 (User)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// 2. 题目模型 (Question)
const questionSchema = new mongoose.Schema({
  moduleId: { type: String, required: true, index: true }, // 例如: 'cA', 'cB'
  question: { type: String, required: true },
  options: [{ type: String, required: true }], // 选项数组
  correct: { type: Number, required: true }, // 正确答案的索引 (0-3)
  explanation: { type: String }, // 答案解说
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  createdAt: { type: Date, default: Date.now }
});
const Question = mongoose.model('Question', questionSchema);

// 3. 用户设置模型 (UserSetting)
const userSettingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  theme: { type: String, default: 'light' }, // 'light' or 'dark'
  notificationsEnabled: { type: Boolean, default: true },
  targetGrade: { type: String, default: '5**' }, // 目标等级
  examYear: { type: Number, default: new Date().getFullYear() },
  updatedAt: { type: Date, default: Date.now }
});
const UserSetting = mongoose.model('UserSetting', userSettingSchema);

// 4. 用户行为/进度模型 (UserAction)
const userActionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  actionType: { type: String, required: true }, // 例如: 'QUIZ_COMPLETE', 'LOGIN', 'VIEW_MODULE'
  moduleId: { type: String }, // 相关单元 ID (可选)
  score: { type: Number }, // 如果是测验，记录分数
  totalQuestions: { type: Number }, // 总题数
  details: { type: mongoose.Schema.Types.Mixed }, // 其他详细数据 (JSON)
  timestamp: { type: Date, default: Date.now }
});
const UserAction = mongoose.model('UserAction', userActionSchema);

// --- 模拟课程数据 ---
const MOCK_DATA = {
  modules: [
    { id: 'cA', title: '资讯处理', code: '单元 A' },
    { id: 'cB', title: '电脑系统基础', code: '单元 B' }
  ]
};

// ==========================================
//                 API 路由
// ==========================================

app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running', dbState: mongoose.connection.readyState });
});

app.get('/api/modules', (req, res) => {
  res.json(MOCK_DATA.modules);
});

// --- 题目 API ---
// 获取特定单元的题目
app.get('/api/questions/:moduleId', async (req, res) => {
  try {
    const questions = await Question.find({ moduleId: req.params.moduleId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: '获取题目失败' });
  }
});

// --- 用户行为 API ---
// 记录用户行为 (例如完成测验)
app.post('/api/actions', async (req, res) => {
  const { userId, actionType, moduleId, score, totalQuestions, details } = req.body;
  try {
    const newAction = new UserAction({
      userId,
      actionType,
      moduleId,
      score,
      totalQuestions,
      details
    });
    await newAction.save();
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Action log error:', error);
    res.status(500).json({ message: '记录行为失败' });
  }
});

// 获取用户最近的活动
app.get('/api/actions/:userId', async (req, res) => {
  try {
    const actions = await UserAction.find({ userId: req.params.userId })
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(actions);
  } catch (error) {
    res.status(500).json({ message: '获取记录失败' });
  }
});

// --- 用户设置 API ---
// 获取或创建用户设置
app.get('/api/settings/:userId', async (req, res) => {
  try {
    let settings = await UserSetting.findOne({ userId: req.params.userId });
    if (!settings) {
      settings = new UserSetting({ userId: req.params.userId });
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: '获取设置失败' });
  }
});

// 更新用户设置
app.put('/api/settings/:userId', async (req, res) => {
  try {
    const settings = await UserSetting.findOneAndUpdate(
      { userId: req.params.userId },
      { ...req.body, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: '更新设置失败' });
  }
});

// --- 认证 API ---

app.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;
  
  if (!username || !password || !email) {
    return res.status(400).json({ message: '請填寫所有必填欄位' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    
    if (existingUser) {
      if (existingUser.username === username) return res.status(400).json({ message: '用戶名已存在' });
      if (existingUser.email === email) return res.status(400).json({ message: '該郵箱已被註冊' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    
    // 初始化用户设置
    await new UserSetting({ userId: newUser._id }).save();
    
    console.log('新用户注册:', username);
    res.status(201).json({ success: true, user: { id: newUser._id, username: newUser.username, email: newUser.email } });

  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: '用户名或密码错误' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: '用户名或密码错误' });

    // 记录登录行为
    await new UserAction({ userId: user._id, actionType: 'LOGIN' }).save();

    res.json({ success: true, user: { id: user._id, username: user.username, email: user.email } });

  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

app.listen(PORT, () => {
  console.log(`后端服务器运行在 http://localhost:${PORT}`);
});