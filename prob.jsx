
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router';
import axiosClient from "../utils/axiosClint"
import SubmissionHistory from "../components/SubmissionHistory"

const langMap = {
    cpp: 'C++',
    java: 'Java',
    javascript: 'JavaScript'
};

const ProblemPage = () => {
    const [problem, setProblem] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [runResult, setRunResult] = useState(null);
    const [submitResult, setSubmitResult] = useState(null);
    const [activeLeftTab, setActiveLeftTab] = useState('description');
    const [activeRightTab, setActiveRightTab] = useState('code');
    const editorRef = useRef(null);
    let { problemId } = useParams();

    const { handleSubmit } = useForm();



    useEffect(() => {
        const fetchProblem = async () => {
        };

        fetchProblem();
    }, [problemId]);


    // Update code when language changes
    useEffect(() => {
        if (problem) {
            const initialCode = problem.startCode.find(sc => sc.language === langMap[selectedLanguage])?.initialCode;
            setCode(initialCode);
        }
    }, [selectedLanguage, problem]);


    const handleEditorChange = (value) => {
        setCode(value || '');
    };

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    const handleRun = async () => {
        setLoading(true);
        setRunResult(null);


        try {
            const response = await axiosClient.post(`/submit/run/${problemId}`, {
                code: code,
                language: selectedLanguage
            });

            console.log(response.data);
            setRunResult(response.data);
            setLoading(false);
            setActiveRightTab('testcase');

        } catch (error) {
            console.error('Error running code:', error);
            setRunResult({
                success: false,
                error: 'Internal server error'
            });
            setLoading(false);
            setActiveRightTab('testcase');
        }
    };

    const handleSubmitCode = async () => {
        setLoading(true);
        setSubmitResult(null);

        try {
            const response = await axiosClient.post(`/submit/submit/${problemId}`, {
                code: code,
                language: selectedLanguage
            });
            console.log(response.data);

            setSubmitResult(response.data); //all data pass by backend by res.json
            setLoading(false);
            setActiveRightTab('result');   //default me code hai eska value 

        } catch (error) {
            console.error('Error submitting code:', error);
            setSubmitResult(null);
            setLoading(false);
            setActiveRightTab('result');
        }
    };
    // language selector for monaco
    const getLanguageForMonaco = (lang) => {
        switch (lang) {
            case 'javascript': return 'javascript';
            case 'java': return 'java';
            case 'cpp': return 'cpp';
            default: return 'javascript';
        }
    };
    // color of tags..
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'text-green-500';
            case 'medium': return 'text-yellow-500';
            case 'hard': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    if (loading && !problem) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="h-screen flex bg-base-100">
            {/* Left Panel */}


            {/* Right Panel */}
            <div className="w-1/2 flex flex-col ">
                {/* Right Tabs */}
                <div className="tabs tabs-bordered bg-base-200 px-4">
                    <button
                        className={`tab ${activeRightTab === 'code' ? 'tab-active' : ''}`}
                        onClick={() => setActiveRightTab('code')}
                    >
                        Code
                    </button>
                    <button
                        className={`tab ${activeRightTab === 'testcase' ? 'tab-active' : ''}`}
                        onClick={() => setActiveRightTab('testcase')}
                    >
                        Testcase
                    </button>
                    <button
                        className={`tab ${activeRightTab === 'result' ? 'tab-active' : ''}`}
                        onClick={() => setActiveRightTab('result')}
                    >
                        Result
                    </button>
                </div>

                {/* Right Content */}
                <div className="flex-1 flex flex-col ">
                    {activeRightTab === 'code' && (
                        <div className="flex-1 flex flex-col">
                            {/* Language Selector */}
                            <div className="flex justify-between items-center p-4 border-b border-base-300">
                                <div className="flex gap-2">
                                    {['javascript', 'java', 'cpp'].map((lang) => (
                                        <button
                                            key={lang}
                                            className={`btn btn-sm ${selectedLanguage === lang ? 'btn-primary' : 'btn-ghost'}`}
                                            onClick={() => handleLanguageChange(lang)}
                                        >
                                            {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Monaco Editor */}
                            <div className="flex-1">
                                <Editor
                                    height="80%"
                                    language={getLanguageForMonaco(selectedLanguage)}
                                    value={code}
                                    onChange={handleEditorChange}
                                    onMount={handleEditorDidMount}
                                    theme="vs-dark"
                                    options={{
                                        fontSize: 14,
                                        minimap: { enabled: false },
                                        scrollBeyondLastLine: true,
                                        automaticLayout: true,
                                        tabSize: 2,
                                        insertSpaces: true,
                                        wordWrap: 'on',
                                        lineNumbers: 'on',
                                        glyphMargin: false,
                                        folding: true,
                                        lineDecorationsWidth: 10,
                                        lineNumbersMinChars: 3,
                                        renderLineHighlight: 'line',
                                        selectOnLineNumbers: true,
                                        roundedSelection: false,
                                        readOnly: false,
                                        cursorStyle: 'line',
                                        mouseWheelZoom: true,
                                    }}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="p-4 border-t border-base-300 flex justify-between">
                                <div className="flex gap-2">
                                    <button
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => setActiveRightTab('testcase')}
                                    >
                                        Console
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        className={`btn btn-outline btn-sm ${loading ? 'loading' : ''}`}
                                        onClick={handleRun}
                                        disabled={loading}
                                    >
                                        Run
                                    </button>
                                    <button
                                        className={`btn btn-primary btn-sm ${loading ? 'loading' : ''}`}
                                        onClick={handleSubmitCode}
                                        disabled={loading}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeRightTab === 'testcase' && (
                        <div className="flex-1 p-4 overflow-y-auto">
                            <h3 className="font-semibold mb-4">Test Results</h3>
                            {runResult ? (
                                <div className={`alert ${runResult.success ? 'alert-success' : 'alert-error'} mb-4`}>
                                    <div>
                                        {runResult.success ? (
                                            <div>
                                                <h4 className="font-bold">✅ All test cases passed!</h4>
                                                <p className="text-sm mt-2">Runtime: {runResult.runtime + " sec"}</p>
                                                <p className="text-sm">Memory: {runResult.memory + " KB"}</p>

                                                <div className="mt-4 space-y-2">
                                                    {runResult.testCases.map((tc, i) => (
                                                        <div key={i} className="bg-base-100 p-3 rounded text-xs">
                                                            <div className="font-mono">
                                                                <div><strong>Input:</strong> {tc.stdin}</div>
                                                                <div><strong>Expected:</strong> {tc.expected_output}</div>
                                                                <div><strong>Output:</strong> {tc.stdout}</div>
                                                                <div className={'text-green-600'}>
                                                                    {'✓ Passed'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <h4 className="font-bold">❌ Error</h4>
                                                <div className="mt-4 space-y-2">
                                                    {runResult.testCases.map((tc, i) => (
                                                        <div key={i} className="bg-base-100 p-3 rounded text-xs">
                                                            <div className="font-mono">
                                                                <div><strong>Input:</strong> {tc.stdin}</div>
                                                                <div><strong>Expected:</strong> {tc.expected_output}</div>
                                                                <div><strong>Output:</strong> {tc.stdout}</div>
                                                                <div className={tc.status_id == 3 ? 'text-green-600' : 'text-red-600'}>
                                                                    {tc.status_id == 3 ? '✓ Passed' : '✗ Failed'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-500">
                                    Click "Run" to test your code with the example test cases.
                                </div>
                            )}
                        </div>
                    )}

                    {activeRightTab === 'result' && (
                        <div className="flex-1 p-4 overflow-y-auto">
                            <h3 className="font-semibold mb-4">Submission Result</h3>
                            {submitResult ? (
                                <div className={`alert ${submitResult.status === "accepted" ? 'alert-success' : 'alert-error'}`}>
                                    <div>
                                        {submitResult.status === "accepted" ? (
                                            <div>
                                                <h4 className="font-bold text-lg">🎉 Accepted</h4>
                                                <div className="mt-4 space-y-2">
                                                    <p>Test Cases Passed: {submitResult.testCasesPassed}/{submitResult.testCasesTotal}</p>
                                                    <p>Runtime: {submitResult.runtime + " sec"}</p>
                                                    <p>Memory: {submitResult.memory + "KB"} </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <h4 className="font-bold text-lg">❌ {submitResult.status}</h4>
                                                <div className="mt-4 space-y-2">
                                                    <p>Test Cases Passed: {submitResult.testCasesPassed}/{submitResult.testCasesTotal}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-500">
                                    Click "Submit" to submit your solution for evaluation.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProblemPage;


//          `
You are an expert DSA tutor helping users solve coding problems, strictly limited to DSA - related guidance.

## PROBLEM CONTEXT:
- Title: ${ title }
- Description: ${ description }
- Starter Code: ${ startCode }

## CAPABILITIES:
1. Provide step - by - step hints
2. Review and debug user code
3. Offer optimal solutions with explanations
4. Analyze time and space complexity
5. Suggest algorithmic approaches
6. Help generate edge test cases

## INTERACTION RULES:
- For hints: guide with questions and intuition, no full answers
    - For code: identify issues, explain fixes, suggest improvements
        - For solutions: give clear, commented code and complexity analysis
            - For approaches: explain and compare multiple strategies

## RESPONSE FORMAT:
- Use clear explanations, code blocks, and examples
    - Break down complex concepts
        - Stay relevant to the current problem
            - Respond in user’s preferred language

## LIMITATIONS:
- Only assist with the current DSA problem
    - Do not help with non - DSA or unrelated topics

## PHILOSOPHY:
- Focus on understanding over memorization
    - Encourage problem - solving and intuition
        - Emphasize best practices and "why" behind choices
            `