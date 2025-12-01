// filepath: /dse-ict-master/src/components/QuizInterface.jsx
import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb, X } from 'lucide-react';
import MOCK_QUESTIONS from '../data/mockQuestions';

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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{module.title}</h2>
          <span className="text-sm text-slate-500">{module.code} • 第 {currentQ + 1} 題 (共 {questions.length} 題)</span>
        </div>
        <button onClick={onExit} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
          <X size={20} />
        </button>
      </div>

      <div className="h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((currentQ) / questions.length) * 100}%` }}
        ></div>
      </div>

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

export default QuizInterface;