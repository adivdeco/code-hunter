
import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import docco from 'react-syntax-highlighter/dist/styles/hybrid';



const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        alert("Code copied!");
    } catch (err) {
        console.error("Failed to copy: ", err);
    }
};



const ChatMessage = ({ content }) => {
    const regex = /```(\w+)?[\r\n]+([\s\S]*?)```/g;

    const blocks = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
        if (match.index > lastIndex) {
            const text = content.slice(lastIndex, match.index).trim();
            if (text) blocks.push({ type: "text", content: text });
        }

        blocks.push({
            type: "code",
            language: match[1] || "javascript",
            content: match[2].trim(),
        });

        lastIndex = regex.lastIndex;
    }

    const remaining = content.slice(lastIndex).trim();
    if (remaining) {
        blocks.push({ type: "text", content: remaining });
    }


    return (
        <div className="space-y-2 text-white/70 font-changa">
            {blocks
                .filter((b) => b.type === "code" || b.content) // remove empty paragraphs
                .map((block, i) =>
                    block.type === "code" ? (
                        <div key={i} className="relative group">
                            <button
                                className="absolute top-2 right-2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                onClick={() => copyToClipboard(block.content)}
                            >
                                Copy
                            </button>

                            <SyntaxHighlighter
                                language={block.language}
                                style={docco}
                                customStyle={{ borderRadius: "10px", padding: "1rem" }}
                            >
                                {block.content}
                            </SyntaxHighlighter>
                        </div>

                    ) : (
                        <p key={i} className="text-base leading-relaxed">
                            {block.content}
                        </p>
                    )
                )}
        </div>
    );

};

export default ChatMessage;
