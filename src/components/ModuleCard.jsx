import React from 'react';
import { ArrowRight } from 'lucide-react';

const ModuleCard = ({ module, onSelect }) => (
  <div 
    onClick={() => onSelect(module)}
    className="bg-white rounded-xl border border-slate-200 p-5 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {/* Added safety check for module.icon */}
        {module.icon && <module.icon size={24} />}
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

export default ModuleCard;