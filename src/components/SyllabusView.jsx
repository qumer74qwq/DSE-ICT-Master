import React from 'react';
import ModuleCard from './ModuleCard';
import { SYLLABUS } from '../data/syllabus';

const SyllabusView = ({ onSelectModule }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">必修部分</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {SYLLABUS.compulsory.map(module => (
          <ModuleCard key={module.id} module={module} onSelect={onSelectModule} />
        ))}
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-6">選修部分</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SYLLABUS.electives.map(module => (
          <ModuleCard key={module.id} module={module} onSelect={onSelectModule} />
        ))}
      </div>
    </div>
  );
};

export default SyllabusView;