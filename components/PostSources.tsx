import React from 'react';
import { Source } from '../types';
import { LinkIcon } from './IconComponents';

interface PostSourcesProps {
  sources: Source[];
}

const PostSources: React.FC<PostSourcesProps> = ({ sources }) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
      <h4 className="text-sm font-semibold text-gray-300 mb-2">Sources:</h4>
      <ul className="space-y-1">
        {sources.map((source, index) => (
          <li key={index} className="flex items-start">
            <LinkIcon className="w-4 h-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
            <a
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-teal-400 hover:underline break-all"
              title={source.uri}
            >
              {source.title || 'Untitled Source'}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostSources;