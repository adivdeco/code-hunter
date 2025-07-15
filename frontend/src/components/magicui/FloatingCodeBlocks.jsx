// components/FloatingCodeBlocks.jsx
export default function FloatingCodeBlocks() {
    const snippets = [
        "function() { return <div>Hello</div> }",
        "const x = 5; console.log(x);",
        "for(let i=0;i<5;i++) { count++ }"
    ]

    return (
        <div className="absolute inset-0 overflow-hidden">
            {snippets.map((code, i) => (
                <div
                    key={i}
                    className="absolute text-xs font-mono bg-white/5 backdrop-blur-sm p-2 rounded"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float ${Math.random() * 20 + 10}s linear infinite`,
                        animationDelay: `${Math.random() * 5}s`,
                        transform: `rotate(${Math.random() * 10 - 5}deg)`
                    }}
                >
                    {code}
                </div>
            ))}
        </div>
    )
}