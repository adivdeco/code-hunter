// components/FloatingCodeBlocks.jsx
// export default function FloatingCodeBlocks() {
//     const snippets = [
//         "function() { return <div>Hello</div> }",
//         "const x = 5; console.log(x);",
//         "for(let i = 0; i < 5; i++) { count++ }",
//         "document.querySelector('#btn').addEventListener('click', () => alert('Clicked!'));",
//         "switch(day) { case 1: console.log('Monday'); break; default: console.log('Other day'); }",
//         "class Animal { constructor(name) { this.name = name; } speak() { console.log(this.name + ' makes a sound'); } }",
//         "const sum = (...args) => args.reduce((a, b) => a + b, 0);",
//         "`The result is: ${value * 2}`",
//         "const isEven = n => n % 2 === 0;",
//         "const greet = name => `Hello, ${name}!`;",
//         "const arr = [1, 2, 3]; arr.map(n => n * 2);",
//         "let user = { name: 'Adiv', age: 21 }; console.log(user.name);",
//         "if (score > 90) { grade = 'A'; } else { grade = 'B'; }",
//         "try { JSON.parse('{invalid}') } catch(e) { console.error('Invalid JSON') }",
//         "async function fetchData() { const res = await fetch('/api'); return res.json(); }",
//         "const [count, setCount] = useState(0);",
//         "document.querySelector('#btn').addEventListener('click', () => alert('Clicked!'));",
//         "switch(day) { case 1: console.log('Monday'); break; default: console.log('Other day'); }",
//         "class Animal { constructor(name) { this.name = name; } speak() { console.log(this.name + ' makes a sound'); } }",
//         "const sum = (...args) => args.reduce((a, b) => a + b, 0);",
//         "`The result is: ${value * 2}`",
//         "const isEven = n => n % 2 === 0;",
//         "[1, 2, 3].filter(n => n > 1);",
//         "localStorage.setItem('token', 'abc123');",
//         "Math.floor(Math.random() * 10);",
//         "window.addEventListener('resize', () => console.log('Resized'));"
//     ];


//     return (
//         <div className="absolute inset-0 overflow-hidden">
//             {snippets.map((code, i) => (
//                 <div
//                     key={i}
//                     className="absolute text-xs font-mono bg-white/5 backdrop-blur-sm p-2 rounded"
//                     style={{
//                         left: `${Math.random() * 100}%`,
//                         top: `${Math.random() * 100}%`,
//                         animation: `float ${Math.random() * 20 + 10}s linear infinite`,
//                         animationDelay: `${Math.random() * 5}s`,
//                         transform: `rotate(${Math.random() * 10 - 5}deg)`
//                     }}
//                 >
//                     {code}
//                 </div>
//             ))}
//         </div>
//     )
// }
// src/components/magicui/FloatingCodeBlocks.jsx

export default function FloatingCodeBlocks() {
    const snippets = [
        "const hunter = new Coder('You');", "if (isHacker) { access.grant(); }",
        "import { astar } from 'pathfinding';", "while (alive) { code(); }",
        "fetch('/api/v1/targets').then(res => res.json())", "[...Array(10)].map(() => 'hunt')",
        "const secret = process.env.SECRET_KEY;", "try { hack() } catch(e) { reboot() }",
        "useEffect(() => { const sub = db.on('data', setData); return () => sub.unsubscribe(); }, [])",
        "SELECT * FROM users WHERE role = 'admin';", "git commit -m 'Initial access'",
        "const [matrix, setMatrix] = useState(true);",
    ];

    // Duplicate snippets to fill the screen more
    const allSnippets = [...snippets, ...snippets, ...snippets];

    return (
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
            {allSnippets.map((code, i) => (
                <div
                    key={i}
                    className="absolute text-xs font-mono text-white/20 bg-white/5 backdrop-blur-sm p-2 rounded-md shadow-lg"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float ${Math.random() * 20 + 15}s linear infinite`,
                        animationDelay: `${Math.random() * 10}s`,
                        transform: `rotate(${Math.random() * 15 - 7.5}deg) scale(${Math.random() * 0.4 + 0.8})`
                    }}
                >
                    {code}
                </div>
            ))}
            <style jsx global>{`
                @keyframes float {
                    0% { transform: translateY(0px) rotate(var(--tw-rotate)); }
                    50% { transform: translateY(-30px) rotate(calc(var(--tw-rotate) + 5deg)); }
                    100% { transform: translateY(0px) rotate(var(--tw-rotate)); }
                }
            `}</style>
        </div>
    )
}