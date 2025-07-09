
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router';
import axiosClient from "../utils/axiosClint"
import SubmissionHistory from "../components/SubmissionHistory"
import ChatAi from '../components/Chat-Ai';
import ThreeRingLoader from "@/components/ThreeRingLoader";
import Split from 'react-split';
import { Bookmark, RotateCcw, ChevronUp, ChevronDown, Maximize2, Minimize2, Minimize } from 'lucide-react';
import { Maximize } from 'lucide-react';
// import BookmarkButton from '@/components/BookmarkButton';



const langMap = {
  javascript: 'javascript',
  java: 'java',
  cpp: 'c++',
  go: 'go',
  python: 'python'
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
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/find/${problemId}`);
        console.log("Fetched problem:", response.data.findproblem);

        const matchedStartCode = response.data.findproblem.startCode.find(
          sc => sc.language === langMap[selectedLanguage] // or use langMap[selectedLanguage] if needed
        );

        if (!matchedStartCode) {
          console.warn("No matching start code found for language:", selectedLanguage);
        }

        const initialcode = matchedStartCode?.initialCode || '';


        setProblem(response.data.findproblem);
        setCode(initialcode);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);


  // Update code when language changes
  useEffect(() => {
    if (problem && problem.startCode) {
      const matched = problem.startCode.find(
        sc => sc.language === langMap[selectedLanguage]);
      // const initialCode = problem.startCode.find(sc => sc.language === langMap[selectedLanguage])?.initialCode;
      setCode(matched?.initialCode || '');
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
      case 'go': return 'go';
      case 'python': return 'python';
      default: return 'javascript';
    }
  };
  // color of tags..
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'px-3 py-1 text-sm  rounded-full bg-green-500/10 text-green-400 border border-green-400 shadow-md backdrop-blur-sm';
      case 'medium':
        return 'px-3 py-1 text-sm  rounded-full bg-yellow-200/10 text-yellow-300 border border-yellow-400 shadow-md backdrop-blur-sm';
      case 'hard':
        return 'px-3 py-1 text-sm  rounded-full bg-red-500/10 text-red-400 border border-red-500 shadow-md backdrop-blur-sm';
      default:
        return 'px-3 py-1 text-sm  rounded-full bg-gray-600/10 text-gray-300 border border-gray-500 shadow-md backdrop-blur-sm';
    }
  };

  if (loading && !problem) {
    return (

      <ThreeRingLoader />

    );
  }

  return (
    <div className="h-screen overflow-hidden  px-2 flex flex-col bg-black text-white ">

      <nav className="h-12 w-full bg-black  px-3 flex items-center justify-between text-white shadow-sm">
        {/* Left Logo or Title */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold font-changa text-white flex items-center">
            Code
            <span className="ml-1 bg-yellow-400 text-black px-0.5 rounded-sm">
              Hunter
            </span>
          </span>
          <span className="text-sm text-gray-400 hidden sm:inline">Practice. Learn. Repeat.</span>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <button className="hover:text-yellow-400 transition">Problems</button>
          <button className="hover:text-yellow-400 transition">Leaderboard</button>
          <button className="hover:text-yellow-400 transition">Discuss</button>
          <button className="hover:text-yellow-400 transition">Contests</button>
        </div>

        {/* Right User/Theme section */}
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-yellow-400 transition text-sm">Login</button>
          <button className="px-3 py-1 text-sm rounded-md bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Left Panel */}
      <div className="flex-1 overflow-hidden">
        <Split
          className="flex w-full h-full"
          sizes={[50, 50]}
          minSize={300}
          gutterSize={7}
          gutterClassName="gutter"
          direction="horizontal"
        >
          <div className=" w-full h-full flex flex-col rounded-md overflow-hidden border border-gray-600">
            {/* Left Tabs */}
            <div className=" w-full flex bg-[rgb(55,55,55)] px-2 border-b font-changa border-gray-700  h-10  text-sm font-medium">
              {[
                { key: 'description', label: 'Description' },
                { key: 'editorial', label: 'Editorial' },
                { key: 'solutions', label: 'Solutions' },
                { key: 'submissions', label: 'Submissions' },
                { key: 'chatAi', label: 'ChatAI' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`relative py-2 px-3 h-9 hover:bg-slate-700 rounded-lg transition-colors duration-200 hover:text-yellow-100 ${activeLeftTab === key
                    ? 'text-yellow-500 border-b-2 border-primary font-semibold'
                    : 'text-gray-500'
                    }`}
                  onClick={() => setActiveLeftTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>


            {/* Left Content */}
            <div className="flex-1 overflow-y-auto px-4 py-3 bg-[rgb(38,38,38)] w-full h-full">
              {problem && (
                <>
                  {activeLeftTab === 'description' && (
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-2xl font-bold text-gray-200 font-changa">{problem.title}</h1>
                        <div className={`badge badge-outline ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </div>
                        <div className="px-3  text-sm  rounded-full bg-green-500/20 text-green-400 border border-green-400 shadow-md backdrop-blur-sm">{problem.tags.charAt(0).toUpperCase() + problem.tags.slice(1)}</div>
                      </div>

                      <div className="text-sm leading-relaxed  font-medium space-y-2">
                        <pre className="whitespace-pre-wrap  p-1 rounded-md  text-gray-300 font-sans">
                          {problem.description}
                        </pre>
                      </div>


                      {/* exampal part */}
                      <div className="mt-14">
                        {/* <h3 className="text-lg font-semibold mb-3">Examples:</h3> */}
                        <div className="mb-16 text-gray-400">
                          {problem.visibleTestCases.map((example, index) => (

                            <div key={index} className="bg-base-200 p-4 rounded-lg mb-2">
                              <h4 className="font-changa mb-2">Example {index + 1}:</h4>
                              <div className="space-y-2 text-sm font-mono ">
                                <div><strong>Input:</strong> {example.input}</div>
                                <div><strong>Output:</strong> {example.output}</div>
                                <div><strong>Explanation:</strong> {example.explanation}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                      </div>
                    </div>
                  )}


                  {activeLeftTab === 'editorial' && (
                    <div className="w-full text-white flex flex-col h-full">
                      <h2 className="text-xl font-bold mb-4">Editorial</h2>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed bg-gray-800/40 p-4 rounded-md border border-gray-700">
                        {'Editorial is here for the problem'}
                      </div>
                    </div>
                  )}



                  {activeLeftTab === 'solutions' && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Solutions</h2>
                      <div className="space-y-6">
                        {problem.referenceSolution?.map((solution, index) => (
                          <div key={index} className="border border-base-300 rounded-lg">
                            <div className="bg-base-200 px-4 py-2 rounded-t-lg">
                              <h3 className="font-semibold">{problem?.title} - {solution?.language}</h3>
                            </div>
                            <div className="p-4">
                              <pre className="bg-base-300 p-4 rounded text-sm overflow-x-auto">
                                <code>{solution?.completeCode}</code>
                              </pre>
                            </div>
                          </div>
                        )) || <p className="text-gray-500">Solutions will be available after you solve the problem.</p>}
                      </div>
                    </div>
                  )}


                  {activeLeftTab === 'submissions' && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">My Submissions</h2>
                      <div className="text-gray-500">
                        <SubmissionHistory problemId={problemId} />
                      </div>
                    </div>
                  )}

                  {activeLeftTab === 'chatAi' && (
                    <div className="prose max-w-none">
                      <h2 className="text-xl font-bold mb-4">CHAT-AI</h2>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {/* {'chat with AI , that helps to solve qurrey related question...'} */}
                        <ChatAi problem={problem} />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>


          {/* Right Panel */}
          <div className="flex flex-col overflow-hidden rounded-lg">
            {/* Right Tabs */}
            <div className="tabs tabs-bordered bg-[rgb(55,55,55)] ">

              {/* code */}
              <p className=' px-4 py-1 font-changa text-lg'>
                <span className='text-green-500 text-xl'>&lt;/&gt;</span>
                Code
              </p>

              {/* Language Selector */}
              <div className="flex justify-between items-center bg-[rgb(38,38,38)]  border-b border-gray-700">
                <div className="flex items-center">
                  <select
                    id="language-select"
                    value={selectedLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="px-3 py-1 text-sm bg-transparent text-gray-300 border border-transparent rounded-md hover:border-gray-600 focus:outline-none focus:border-transparent transition duration-200"
                  >
                    {['javascript', 'java', 'cpp', 'go', 'python'].map((lang) => (
                      <option key={lang} value={lang}>
                        {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex mr-2 gap-2 text-xs'>
                  <RotateCcw />
                  <Bookmark />
                  {/* <BookmarkButton problemId={problem._id} user={user} onBookmarkChange={handleBookmarkChange} /> */}
                  <Maximize />
                  <Maximize2 />
                  <ChevronUp />
                  <ChevronDown />
                </div>

              </div>

              {/* test cas */}

              {/* <button
                className={`tab ${activeRightTab === 'testcase' ? 'tab-active' : ''}`}
                onClick={() => setActiveRightTab('testcase')}
              >
                Testcase
              </button> */}

              {/* rslt */}

              {/* <button
                className={`tab ${activeRightTab === 'result' ? 'tab-active' : ''}`}
                onClick={() => setActiveRightTab('result')}
              >
                Result
              </button> */}

            </div>

            {/* Right Content */}
            <div className="flex-1 flex flex-col bg-pink-800">
              {/* {activeRightTab === 'code' && ( */}
              <div className="flex-1 flex flex-col bg-[rgba(30,30,30,0.8)]">


                {/* Monaco Editor */}
                <div className="flex-1">
                  <Editor
                    height="70%"
                    language={getLanguageForMonaco(selectedLanguage)}
                    value={code}
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                    theme="vs-dark"
                    options={{
                      fontSize: 12,
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
              {/* )} */}

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
        </Split>
      </div >
    </div >
  );
};

export default ProblemPage;