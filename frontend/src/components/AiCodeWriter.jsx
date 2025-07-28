
// import React from "react";
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import docco from 'react-syntax-highlighter/dist/styles/hybrid';



// const copyToClipboard = async (text) => {
//     try {
//         await navigator.clipboard.writeText(text);
//         alert("Code copied!");
//     } catch (err) {
//         console.error("Failed to copy: ", err);
//     }
// };



// const ChatMessage = ({ content }) => {
//     const regex = /```(\w+)?[\r\n]+([\s\S]*?)```/g;

//     const blocks = [];
//     let lastIndex = 0;
//     let match;

//     while ((match = regex.exec(content)) !== null) {
//         if (match.index > lastIndex) {
//             const text = content.slice(lastIndex, match.index).trim();
//             if (text) blocks.push({ type: "text", content: text });
//         }

//         blocks.push({
//             type: "code",
//             language: match[1] || "javascript",
//             content: match[2].trim(),
//         });

//         lastIndex = regex.lastIndex;
//     }

//     const remaining = content.slice(lastIndex).trim();
//     if (remaining) {
//         blocks.push({ type: "text", content: remaining });
//     }


//     return (
//         <div className="space-y-2 text-white/70 font-changa">
//             {blocks
//                 .filter((b) => b.type === "code" || b.content) // remove empty paragraphs
//                 .map((block, i) =>
//                     block.type === "code" ? (
//                         <div key={i} className="relative group">
//                             <button
//                                 className="absolute top-2 right-2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
//                                 onClick={() => copyToClipboard(block.content)}
//                             >
//                                 Copy
//                             </button>

//                             <SyntaxHighlighter
//                                 language={block.language}
//                                 style={docco}
//                                 customStyle={{ borderRadius: "10px", padding: "1rem" }}
//                             >
//                                 {block.content}
//                             </SyntaxHighlighter>
//                         </div>

//                     ) : (
//                         <p key={i} className="text-base leading-relaxed">
//                             {block.content}
//                         </p>
//                     )
//                 )}
//         </div>
//     );

// };

// export default ChatMessage;



// src/components/ChatMessage.jsx

import React, { useState } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
// ✨ Switched to a professional-looking dark theme
// import { atomOneDark } from 'react-syntax-highlighter/dist/styles/hljs';
import docco from 'react-syntax-highlighter/dist/styles/hybrid';
import { Copy, Check } from "lucide-react"; // ✨ Import icons for the copy button

const ChatMessage = ({ content }) => {
    // This regex logic is solid, no need to change it.
    const regex = /```(\w+)?[\r\n]+([\s\S]*?)```/g;
    const blocks = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
        if (match.index > lastIndex) {
            blocks.push({ type: "text", content: content.slice(lastIndex, match.index).trim() });
        }
        blocks.push({
            type: "code",
            language: match[1] || "javascript",
            content: match[2].trim(),
        });
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < content.length) {
        blocks.push({ type: "text", content: content.slice(lastIndex).trim() });
    }

    const CodeCopyButton = ({ textToCopy }) => {
        const [copied, setCopied] = useState(false);
        const handleCopy = async () => {
            try {
                await navigator.clipboard.writeText(textToCopy);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy: ", err);
            }
        };

        return (
            <button
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/50 text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-200 opacity-50 group-hover:opacity-100"
                onClick={handleCopy}
                aria-label={copied ? "Copied" : "Copy code"}
            >
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
        )
    }

    return (
        <div className="space-y-4 font-sans">
            {blocks.filter(b => b.content.trim()).map((block, i) =>
                block.type === "code" ? (
                    <div key={i} className="relative group bg-[#0d1117] rounded-lg">
                        <CodeCopyButton textToCopy={block.content} />
                        <SyntaxHighlighter
                            language={block.language}
                            style={docco} // ✨ Using the imported dark style
                            customStyle={{
                                background: 'transparent',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.9rem',
                            }}
                            codeTagProps={{
                                style: {
                                    fontFamily: '"Fira Code", monospace',
                                }
                            }}
                            wrapLines={true}
                        // showLineNumbers={true} // ✨ A nice touch for code blocks
                        >
                            {block.content}
                        </SyntaxHighlighter>
                    </div>
                ) : (
                    // ✨ Using a more readable prose style for text
                    <p key={i} className="text-base leading-relaxed whitespace-pre-wrap text-white/90">
                        {block.content}
                    </p>
                )
            )}
        </div>
    );
};

export default ChatMessage;