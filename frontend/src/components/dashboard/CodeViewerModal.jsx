import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import docco from 'react-syntax-highlighter/dist/styles/hybrid';
import { Clipboard as ClipboardIcon, CheckCircle2 } from 'lucide-react';



export default function CodeViewerModal({ isOpen, onClose, submission }) {
    const [isCopied, setIsCopied] = useState(false);

    // Reset copied state when modal is closed or submission? changes
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => setIsCopied(false), 300); // Reset after modal transition
        }
    }, [isOpen]);

    const handleCopy = async () => {
        if (!submission?.code) return;
        try {
            await navigator.clipboard.writeText(submission?.code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Show "Copied" for 2 seconds
        } catch (err) {
            console.error("Failed to copy code: ", err);
        }
    };

    if (!submission) return null;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 font-sans" onClose={onClose}>
                {/* The backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-[#1e1e1e] border border-gray-700 p-6 text-left align-middle shadow-2xl transition-all">
                                {/* Modal Header */}
                                <div className="flex items-start justify-between pb-4 border-b border-gray-800">
                                    <div>
                                        <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-white/90 font-chango">
                                            {submission?.problemId?.title || 'submission? Details'}
                                        </Dialog.Title>
                                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-400">
                                            <span>Language: <span className="font-semibold text-purple-400">{submission?.language}</span></span>
                                            <span className="text-gray-600">•</span>
                                            <span>Submitted: <span className="font-semibold text-gray-300">{new Date(submission?.createdAt).toLocaleDateString()}</span></span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-1 rounded-full text-gray-500 hover:text-white hover:bg-gray-700 transition-colors"
                                    >
                                        ❌
                                    </button>
                                </div>

                                {/* The Code Viewer */}
                                <div className="mt-4 relative group">
                                    <button
                                        onClick={handleCopy}
                                        className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-gray-900/80 text-white/80 px-3 py-1.5 rounded-md text-xs opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200"
                                    >
                                        {isCopied ? <CheckCircle2 size={14} className="text-green-400" /> : <ClipboardIcon size={14} />}
                                        {isCopied ? 'Copied!' : 'Copy Code'}
                                    </button>
                                    <SyntaxHighlighter
                                        language={submission?.language?.toLowerCase()}
                                        style={docco}
                                        showLineNumbers
                                        customStyle={{
                                            margin: 0,
                                            borderRadius: '0.5rem',
                                            maxHeight: '60vh',
                                            border: '1px solid #333',
                                            fontFamily: '"Fira Code", monospace',
                                            fontSize: '14px',
                                        }}
                                        codeTagProps={{
                                            style: { fontFamily: 'inherit', fontSize: 'inherit' }
                                        }}
                                    >
                                        {String(submission?.code || '')}
                                    </SyntaxHighlighter>

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};
