import React, { useState, useEffect, useCallback } from 'react';
import { AICampaignPlan, GeneratedAsset, VisualSuggestion } from '../types';
import { generateCampaignWithThinking, generatePremiumImage, editImage, generateVideo } from '../services/geminiService';
import { SparklesIcon, CloseIcon, BrainCircuitIcon, ImageIcon, VideoIcon, WandIcon } from './IconComponents';

interface AICreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (content: { text: string, imageUrl?: string, videoUrl?: string }) => void;
}

type Step = 'idea' | 'plan' | 'visuals' | 'edit'| 'error';

const AICreatorModal: React.FC<AICreatorModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState<Step>('idea');
  const [prompt, setPrompt] = useState('');
  const [campaignPlan, setCampaignPlan] = useState<AICampaignPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([]);
  const [editingAsset, setEditingAsset] = useState<GeneratedAsset | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [isApiKeyReady, setIsApiKeyReady] = useState(false);

  // Veo API Key Check
  const ensureApiKey = useCallback(async () => {
    if (await window.aistudio.hasSelectedApiKey()) {
      setIsApiKeyReady(true);
      return true;
    }
    await window.aistudio.openSelectKey();
    // Assume success after prompt, but re-check on next attempt if it fails.
    setIsApiKeyReady(true); 
    return true; // Optimistically return true
  }, []);

  useEffect(() => {
    if (isOpen) {
        // Reset state when modal opens
        setStep('idea');
        setPrompt('');
        setCampaignPlan(null);
        setIsLoading(false);
        setErrorMessage('');
        setGeneratedAssets([]);
        setEditingAsset(null);
        setEditPrompt('');
        ensureApiKey(); // Check for key on open
    }
  }, [isOpen, ensureApiKey]);

  const handleGeneratePlan = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setLoadingMessage('Thinking...');
    setErrorMessage('');
    try {
      const plan = await generateCampaignWithThinking(prompt);
      setCampaignPlan(plan);
      setStep('plan');
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred.");
      setStep('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateVisual = async (visual: VisualSuggestion, aspectRatio: '16:9' | '9:16' | '1:1') => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        if (visual.type === 'image') {
            setLoadingMessage('Generating high-quality image...');
            const imageUrl = await generatePremiumImage(visual.description, aspectRatio);
            setGeneratedAssets(prev => [...prev, { type: 'image', url: imageUrl, prompt: visual.description }]);
        } else if (visual.type === 'video') {
            if (!await ensureApiKey()) return;
            setLoadingMessage('Directing your video... this can take a few minutes.');
            const videoUrl = await generateVideo(visual.description, aspectRatio as '16:9' | '9:16');
            setGeneratedAssets(prev => [...prev, { type: 'video', url: videoUrl, prompt: visual.description }]);
        }
      } catch (error: any) {
        console.error(error);
        const errorMsg = error instanceof Error ? error.message : "An unknown error occurred.";
        setErrorMessage(errorMsg);
        // If Veo key is bad, prompt user to select a new one
        if (errorMsg.includes("API key is not valid for Veo")) {
          setIsApiKeyReady(false);
        }
      } finally {
          setIsLoading(false);
      }
  };

  const handleEditImage = async () => {
    if (!editPrompt.trim() || !editingAsset || editingAsset.type !== 'image') return;
    setIsLoading(true);
    setLoadingMessage('Applying edits...');
    setErrorMessage('');
    try {
        const newImageUrl = await editImage(editingAsset.url, editPrompt);
        // Replace the old asset with the new one
        setGeneratedAssets(prev => prev.map(asset => asset.url === editingAsset.url ? { ...asset, url: newImageUrl } : asset));
        setEditingAsset(null);
        setEditPrompt('');
    } catch (error) {
        console.error(error);
        setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
        setIsLoading(false);
    }
  }

  const handleSelectAsset = (asset: GeneratedAsset) => {
    if (!campaignPlan) return;
    onComplete({
        text: `${campaignPlan.postText}\n\n${campaignPlan.hashtags.join(' ')}`,
        imageUrl: asset.type === 'image' ? asset.url : undefined,
        videoUrl: asset.type === 'video' ? asset.url : undefined,
    });
  };

  if (!isOpen) return null;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <SparklesIcon className="w-16 h-16 text-teal-400 animate-pulse" />
          <p className="mt-4 text-xl text-white">{loadingMessage}</p>
          <p className="mt-2 text-gray-400">Please wait, AI is at work.</p>
        </div>
      );
    }

    if (step === 'error') {
        return (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <h3 className="text-2xl font-bold text-red-500">Generation Failed</h3>
                <p className="mt-2 text-gray-300 max-w-md">{errorMessage}</p>
                {errorMessage.includes("API key is not valid for Veo") && (
                    <button onClick={ensureApiKey} className="mt-6 px-6 py-2 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-colors">
                        Select New API Key
                    </button>
                )}
                <button onClick={() => setStep('idea')} className="mt-4 text-sm text-teal-400 hover:underline">
                    Start Over
                </button>
            </div>
        );
    }

    if (editingAsset) {
        return (
            <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Edit Image</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-400 mb-2">ORIGINAL</p>
                        <img src={editingAsset.url} alt="Original" className="rounded-lg w-full" />
                    </div>
                     <div>
                        <p className="text-sm font-semibold text-gray-400 mb-2">PROMPT</p>
                         <p className="text-gray-300 italic mb-4">"{editingAsset.prompt}"</p>
                        <div className="relative">
                            <textarea
                                value={editPrompt}
                                onChange={e => setEditPrompt(e.target.value)}
                                placeholder="Describe your edits... e.g., 'Add a retro filter', 'remove the person in the background'"
                                className="w-full h-24 p-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            />
                        </div>
                         <div className="flex justify-end space-x-2 mt-4">
                            <button onClick={() => setEditingAsset(null)} className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-full hover:bg-slate-700 transition-colors">Cancel</button>
                            <button onClick={handleEditImage} disabled={!editPrompt.trim()} className="px-4 py-2 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 disabled:bg-slate-500 transition-colors">Apply Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    switch (step) {
      case 'idea':
        return (
          <div className="p-8 flex flex-col h-full">
            <div className="text-center">
              <BrainCircuitIcon className="w-12 h-12 mx-auto text-teal-400"/>
              <h3 className="text-3xl font-bold text-white mt-4">AI Creative Studio</h3>
              <p className="text-gray-400 mt-2 max-w-xl mx-auto">Start with an idea, a goal, or a complex topic. The AI will act as your campaign strategist to build a post from the ground up.</p>
            </div>
            <div className="flex-grow flex items-center justify-center">
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="e.g., 'Develop a campaign about improving public transit, focusing on environmental benefits and reduced traffic.'"
                className="w-full max-w-2xl h-32 p-4 text-lg bg-slate-800 border-2 border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
              />
            </div>
            <div className="text-center">
              <button onClick={handleGeneratePlan} disabled={!prompt.trim()} className="px-8 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 disabled:bg-slate-500 transition-colors text-lg">
                Generate Plan
              </button>
            </div>
          </div>
        );
      case 'plan':
      case 'visuals':
        return (
          <div className="p-8 h-full flex flex-col">
            <h3 className="text-2xl font-bold text-white flex-shrink-0">Campaign Plan</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4 flex-grow overflow-y-auto">
              {/* Left: Text Content */}
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="font-bold text-teal-400 mb-2">Generated Text:</h4>
                <p className="whitespace-pre-wrap text-gray-200">{campaignPlan?.postText}</p>
                <h4 className="font-bold text-teal-400 mt-4 mb-2">Hashtags:</h4>
                <p className="text-gray-300 italic">{campaignPlan?.hashtags.join(' ')}</p>
              </div>

              {/* Right: Visuals */}
              <div className="bg-slate-800/50 p-4 rounded-lg flex flex-col">
                <h4 className="font-bold text-teal-400 mb-2">Visual Suggestions:</h4>
                {/* Visual Generation Prompts */}
                <div className="space-y-4 mb-4">
                  {campaignPlan?.visuals.map((vis, index) => (
                    <div key={index} className="bg-slate-700 p-3 rounded-md">
                      <p className="text-sm text-gray-300 italic">"{vis.description}"</p>
                       <div className="flex items-center justify-end space-x-2 mt-2">
                          <button onClick={() => handleGenerateVisual(vis, vis.type === 'video' ? '16:9' : '1:1')} className="flex items-center space-x-1.5 text-xs px-2 py-1 bg-slate-600 rounded-md hover:bg-teal-600 transition-colors">
                              {vis.type === 'image' ? <ImageIcon className="w-3 h-3"/> : <VideoIcon className="w-3 h-3"/>}
                              <span>{vis.type === 'image' ? '1:1' : '16:9'}</span>
                          </button>
                           <button onClick={() => handleGenerateVisual(vis, vis.type === 'video' ? '9:16' : '16:9')} className="flex items-center space-x-1.5 text-xs px-2 py-1 bg-slate-600 rounded-md hover:bg-teal-600 transition-colors">
                               {vis.type === 'image' ? <ImageIcon className="w-3 h-3"/> : <VideoIcon className="w-3 h-3"/>}
                               <span>{vis.type === 'image' ? '16:9' : '9:16'}</span>
                          </button>
                       </div>
                    </div>
                  ))}
                </div>
                {/* Generated Assets Area */}
                <div className="flex-grow overflow-y-auto border-t border-slate-600 pt-4">
                  <h4 className="font-bold text-teal-400 mb-2">Generated Assets:</h4>
                  {generatedAssets.length === 0 && <p className="text-sm text-gray-500 text-center py-8">Your generated images and videos will appear here.</p>}
                  <div className="grid grid-cols-2 gap-2">
                    {generatedAssets.map((asset, index) => (
                      <div key={index} className="relative group rounded-lg overflow-hidden border-2 border-transparent hover:border-teal-500">
                        {asset.type === 'image' ? (
                          <img src={asset.url} alt="generated" className="w-full h-full object-cover"/>
                        ) : (
                          <video src={asset.url} className="w-full h-full object-cover bg-black" />
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 space-y-2">
                           {asset.type === 'image' && (
                            <button onClick={() => setEditingAsset(asset)} className="w-full py-1.5 bg-slate-700/80 text-white text-xs font-semibold rounded hover:bg-teal-600/80 flex items-center justify-center space-x-1">
                                <WandIcon className="w-3 h-3"/>
                                <span>Edit</span>
                            </button>
                           )}
                           <button onClick={() => handleSelectAsset(asset)} className="w-full py-1.5 bg-teal-600 text-white text-xs font-bold rounded hover:bg-teal-700">Select</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full h-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl relative flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-full z-10">
          <CloseIcon className="w-6 h-6" />
        </button>
        <div className="flex-grow overflow-y-auto">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AICreatorModal;
