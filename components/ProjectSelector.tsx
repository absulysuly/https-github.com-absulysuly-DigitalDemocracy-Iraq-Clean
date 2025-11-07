import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { ChevronDownIcon } from './IconComponents';
import { Project } from '../types';

const ProjectSelector: React.FC = () => {
  const { projects, currentProject, setCurrentProject } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);
  
  const handleSelect = (project: Project) => {
    setCurrentProject(project);
    setIsOpen(false);
  };

  if (!currentProject) {
    return null;
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full hover:bg-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        {currentProject.icon}
        <span className="font-semibold text-white">{currentProject.name}</span>
        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-72 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-2">
            {projects.map(project => (
              <button
                key={project.id}
                onClick={() => handleSelect(project)}
                className="w-full text-left flex items-center space-x-3 p-3 rounded-md hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex-shrink-0">{project.icon}</div>
                <div>
                  <p className="font-semibold text-white">{project.name}</p>
                  <p className="text-xs text-gray-400">{project.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;
