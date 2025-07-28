
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router';
import axiosClient from "../utils/axiosClint"
import SubmissionHistory from "../components/SubmissionHistory"
import ChatAi from '../components/Chat-Ai';
import ThreeRingLoader from "@/components/ThreeRingLoader";
import Split from 'react-split';
import { Bookmark, RotateCcw, ChevronUp, ChevronDown, Maximize2, Minimize2, Minimize, CheckSquare, Volleyball, CloudUpload, BrainCircuit, Trash2, SettingsIcon, Timer, Layers } from 'lucide-react';
import { Code, Bot, StickyNote, FileText, Edit3, CheckCircle, Palette, Pause, Play, ChevronLeft, MessageSquareText } from "lucide-react";
import { Maximize } from 'lucide-react';
import { triggerSideCannonsConfetti } from "@/lib/confettiTrigger";
import NavProfile from "@/components/NavProfile"
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import TimerBar from '@/components/TimeBar';
import Discussion from '@/components/Discussion'

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
  const [activeRightTab, setActiveRightTab] = useState("testcase");
  const editorRef = useRef(null);
  let { problemId } = useParams();
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const [noteContent, setNoteContent] = useState('');
  const [noteLoading, setNoteLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [initialCode, setInitialCode] = useState('');
  const [editorTheme, setEditorTheme] = useState('vs-dark'); // default theme
  const [fontSize, setFontSize] = useState(12); // Default font size
  const [isEditorMaximized, setIsEditorMaximized] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [showMinmap, setShowMinmap] = useState(true);
  const [isWordWrapEnabled, setIsWordWrapEnabled] = useState(true);
  const [tabSize, setTabSize] = useState(2); // Or your default





  const { handleSubmit } = useForm();

  // console.log(user);


  useEffect(() => {

    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/find/${problemId}`);
        // console.log("Fetched problem:", response.data.findproblem);

        const matchedStartCode = response.data.findproblem.startCode.find(
          sc => sc.language === langMap[selectedLanguage] // or use langMap[selectedLanguage] if needed
        );

        if (!matchedStartCode) {
          console.warn("No matching start code found for language:", selectedLanguage);
        }

        const initialcode = matchedStartCode?.initialCode || '';


        setProblem(response.data.findproblem);
        setLoading(false);

        setInitialCode(initialcode); // ✅ store starter code
        setCode(initialcode);

      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  useEffect(() => {
    if (submitResult?.status === "accepted") {
      triggerSideCannonsConfetti(); // or whatever the exported function is
    }
  }, [submitResult]);

  useEffect(() => {
    const fetchNote = async () => {
      setNoteLoading(true);
      try {
        const res = await axiosClient.get(`/note/getnote/${problemId}`);
        const content = res.data.allnote[0]?.content || '';
        setNoteContent(content);
      } catch (err) {
        console.error('Error fetching note:', err);
        setNoteContent('');
      } finally {
        setNoteLoading(false);
      }
    };

    if (problemId) fetchNote();
  }, [problemId]);


  const handleNoteSave = async () => {
    try {
      await axiosClient.post(`/note/createnote/${problemId}`, {
        content: noteContent.trim()
      });

      alert("Note saved!");
    } catch (err) {
      console.error('Failed to save note:', err);
      alert("Error saving note.");
    }
  };


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

      // console.log(response.data);
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

  // for screen height....
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };




  return (
    <div className="h-screen overflow-hidden px-2 flex flex-col bg-black text-white">

      <nav className="h-12 w-full bg-black px-3 flex items-center justify-between text-white shadow-sm">

        {/* left */}
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold font-changa text-white flex items-center">
            Code
            <span className="ml-1 bg-yellow-400 text-black px-0.5 rounded-sm">Hunter</span>
          </span>
          <span className="text-sm text-gray-400 font-changa hidden sm:inline">Practice. Learn. Repeat.</span>
        </div>

        {/* center */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <NavLink to={"/problems"}>
            <button className="hover:text-yellow-400 transition">Practice</button>
          </NavLink>


          <NavLink to={"/leaderbord"}>
            <button className="hover:text-yellow-400 transition">Leaderboard</button>

          </NavLink>

          {/* Timer Button */}
          <div className="w-full flex justify-center my-4">
            <TimerBar />
          </div>


          <NavLink to={"/duscission"}>
            <button className="hover:text-yellow-400 transition">Discuss</button>
          </NavLink>

          <NavLink to={"/contest"}>
            <button className="hover:text-yellow-400 transition">Contests</button>
          </NavLink>

        </div>

        {/* right */}
        <div className="flex items-center gap-4">
          <h1 className="font-aladin text-xl relative inline-block mt-2" > Upgrade to
            <span className="font-aladin bg-gradient-to-r from-yellow-500 to-orange-600 text-transparent bg-clip-text text-xl font-extrabold">Pro</span>
          </h1>
          <NavProfile user={user} />
        </div>
      </nav>

      <div className="flex-1 overflow-hidden">
        <Split
          className="flex w-full h-full"
          sizes={[50, 50]}
          minSize={[200, 300]}
          gutterSize={7}
          gutterClassName="gutter-horizontal"
          direction="horizontal"
        >
          {/* LEFT PANEL */}
          <div className={` w-full h-full flex flex-col  rounded-md overflow-hidden border border-gray-600 ${isEditorMaximized ? 'text-black bg-black -z-30' : ""}`}>

            <div className="w-full flex bg-[rgb(55,55,55)]  px-2 border-b font-changa border-gray-700 h-10 text-sm font-medium">
              {[
                { key: 'description', label: 'Description', icon: <FileText size={16} /> },
                { key: 'editorial', label: 'Editorial', icon: <Edit3 size={16} /> },
                user?.role === 'admin' ? { key: 'solutions', label: 'Solutions', icon: <CheckCircle size={16} /> } : null,
                { key: 'submissions', label: 'Submissions', icon: <Layers size={16} /> },
                { key: 'discussion', label: 'Discussion', icon: <MessageSquareText size={18} /> },
                { key: 'note', label: 'Note', icon: <StickyNote size={16} /> },
                { key: 'chatAi', label: 'ChatAI', icon: <Bot size={22} /> },
              ].filter(Boolean)
                .map(({ key, label, icon }) => (
                  <button
                    key={key}
                    className={`flex items-center gap-2 py-2 px-3 h-9 hover:bg-slate-700 rounded-lg transition-colors duration-200 hover:text-yellow-100 ${activeLeftTab === key
                      ? 'text-yellow-500 border-b-2 border-primary font-semibold'
                      : 'text-gray-500'
                      }`}
                    onClick={() => setActiveLeftTab(key)}
                  >
                    {icon}
                    <span>{label}</span>
                  </button>
                ))}

            </div>

            <div className="flex-1 overflow-y-auto px-4 py-1 bg-[rgb(38,38,38)] w-full h-full">
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
                        )) || <p className="text-gray-500">Fetching Data</p>}
                      </div>
                    </div>
                  )}

                  {activeLeftTab === 'discussion' && (
                    <div>
                      {/* <h2 className="text-xl font-bold mb-4">Question Based Discussion.</h2> */}
                      <div className="text-gray-500">
                        <Discussion problemId={problemId} />
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


                  {activeLeftTab === 'note' && (
                    <div className="w-full text-white flex flex-col h-full">
                      <h2 className="text-2xl mt-8 mb-4 font-changa">Notes</h2>

                      {noteLoading ? (
                        <div className="text-sm text-gray-400">Loading...</div>
                      ) : (
                        <>
                          <textarea
                            className="w-full bg-gray-800/40 border border-gray-700 rounded-md text-sm text-white p-4 h-96  outline-none"
                            placeholder="Write your thoughts here..."
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                            maxLength={700}
                          />

                          <div className="flex justify-end mt-4">
                            <button
                              onClick={handleNoteSave}
                              className=" px-4 py-1 flex items-center text-sm font-changa rounded-md bg-green-500/15 text-green-400 border border-green-400 shadow-md backdrop-blur-sm"
                            >
                              Save Note
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}



                  {activeLeftTab === 'chatAi' && (
                    <div>
                      <div className="flex justify-between items-center px-3 py-2 bg-black rounded-md">
                        <div className='flex-shrink-0  border-b border-purple-500/20 bg-black/20 font-chango flex items-center space-x-2'>
                          <BrainCircuit className="text-pink-400" />
                          <h2 className="text-lg font-bold text-white">AI Code Assistant</h2>
                        </div>


                        <button
                          onClick={() => {
                            localStorage.removeItem(`chat-${problem._id}`);
                            setResetTrigger((prev) => prev + 1);
                          }}
                          className="inline-flex items-center gap-1 text-sm text-red-400 hover:text-red-600 border border-red-400 hover:border-red-600 px-3 py-1 rounded-md transition-colors"
                        >
                          <Trash2 size={20} className="mt-[-1px]" /> {/* Fine-tuned vertical alignment */}
                          Clear Chat
                        </button>

                      </div>

                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        <ChatAi key={resetTrigger} problem={problem} />
                      </div>
                    </div>
                  )}


                </>
              )}
            </div>
          </div>






          {/* RIGHT PANEL */}
          <div className="flex flex-col h-full overflow-hidden rounded-lg">
            <Split
              className="flex-1 flex flex-col w-full h-full"
              sizes={[65, 35]}
              minSize={[300, 100]}
              gutterSize={7}
              gutterClassName="gutter-vertical"
              direction="vertical"
            >
              <div
                className={`transition-all duration-300 ${isEditorMaximized
                  ? 'fixed top-0 left-0 w-screen h-screen z-[9999] bg-black   flex flex-col'
                  : 'flex-1 flex flex-col bg-[rgba(30,30,30,0.8)] rounded-md'
                  }`}
              >

                <div className="tabs tabs-bordered bg-[rgb(55,55,55)]">
                  <div className='flex justify-between items-center'>
                    <p className='px-4 py-1 font-changa text-lg'>
                      <span className='text-green-500 text-xl'>&lt;/&gt;</span>
                      Code
                    </p>

                    <span className='flex mr-4 gap-3'>
                      <button onClick={toggleFullscreen} className="hover:text-yellow-400">
                        {isFullscreen ? <Minimize /> : <Maximize />}
                      </button>
                    </span>

                  </div>
                  <div className="flex justify-between items-center bg-[rgb(38,38,38)] border-b border-gray-700">
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

                    <div className='flex items-center mr-5 gap-4 text-xs'>

                      {/* hlo */}
                      <div className="relative font-changa flex items-center">
                        <button onClick={() => setShowSettingsPopup(prev => !prev)} title="Settings">
                          <SettingsIcon size={20} />
                        </button>

                        {showSettingsPopup && (
                          <div className="absolute top-10 right-0 z-50 w-64 bg-[rgb(40,40,40)] border border-gray-600 shadow-lg rounded-md p-4 text-sm space-y-3 font-changa">
                            <h3 className="text-lg font-bold text-gray-300 mb-2">Editor Settings</h3>

                            {/* Line Numbers Toggle */}
                            <label className="flex items-center gap-2 text-gray-300">
                              <input
                                type="checkbox"
                                checked={showLineNumbers}
                                onChange={() => setShowLineNumbers(prev => !prev)}
                              />
                              Show Line Numbers
                            </label>

                            {/* enable min map */}
                            <label className="flex items-center gap-2 text-gray-300">
                              <input
                                type="checkbox"
                                checked={showMinmap}
                                onChange={() => setShowMinmap(prev => !prev)}
                              />
                              Show Min-map
                            </label>

                            {/* Word Wrap Toggle */}
                            <label className="flex items-center gap-2 text-gray-300">
                              <input
                                type="checkbox"
                                checked={isWordWrapEnabled}
                                onChange={() => setIsWordWrapEnabled(prev => !prev)}
                              />
                              Enable Word Wrap
                            </label>

                            {/* Tab Size */}
                            <div className="flex items-center gap-2 text-gray-300">
                              <label htmlFor="tabSize">Tab Size:</label>
                              <select
                                id="tabSize"
                                value={tabSize}
                                onChange={(e) => setTabSize(Number(e.target.value))}
                                className="bg-black border border-gray-600 text-white rounded px-2 py-1"
                              >
                                {[2, 4, 8].map(size => (
                                  <option key={size} value={size}>{size}</option>
                                ))}
                              </select>
                            </div>

                            {/* Theme Selector */}
                            <div className="flex items-center gap-2 text-white">
                              <label htmlFor="editorTheme">Theme:</label>
                              <select
                                id="editorTheme"
                                value={editorTheme}
                                onChange={(e) => setEditorTheme(e.target.value)}
                                className="bg-black border border-gray-600 text-white rounded px-2 py-1"
                              >
                                <option value="vs-dark">Dark</option>
                                <option value="light">Light</option>
                                <option value="hc-black">High Contrast</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </div>



                      <button
                        onClick={() => setEditorTheme(prev => prev === 'vs-dark' ? 'light' : 'vs-dark')}
                        title={`Switch to ${editorTheme === 'vs-dark' ? 'Light' : 'Dark'} Mode`}
                      >
                        <Palette size={20} />
                      </button>

                      <div className="flex items-center font-changa text-sm text-white">
                        <label htmlFor="fontSize">Font Size:</label>
                        <select
                          id="fontSize"
                          value={fontSize}
                          onChange={(e) => setFontSize(Number(e.target.value))}
                          className=" bg-transparent text-white rounded px-2 py-1"
                        >
                          {[12, 14, 16, 18, 20, 22, 24].map((size) => (
                            <option key={size} value={size}>{size}px</option>
                          ))}
                        </select>
                      </div>



                      <button
                        onClick={() => setCode(initialCode)}
                        className="hover:text-yellow-400"
                        title="Reset code"
                      >
                        <RotateCcw size={18} />
                      </button>


                      <button
                        onClick={() => setIsEditorMaximized(prev => !prev)}
                        title={isEditorMaximized ? "Minimize Editor" : "Maximize Editor"}
                      >
                        {isEditorMaximized ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                      </button>



                      <Bookmark size={20} />
                    </div>

                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <Editor
                    language={getLanguageForMonaco(selectedLanguage)}
                    value={code}
                    onMount={handleEditorDidMount}
                    onChange={(newCode) => setCode(newCode)}
                    theme={editorTheme}
                    className="flex-1"
                    options={{
                      fontSize,
                      minimap: { enabled: showMinmap },
                      scrollBeyondLastLine: true,
                      automaticLayout: true,
                      tabSize,
                      insertSpaces: true,
                      wordWrap: isWordWrapEnabled ? 'on' : 'off',
                      lineNumbers: showLineNumbers ? 'on' : 'off',
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
              </div>





              <div className="flex flex-col overflow-y-auto bg-[rgba(38,38,38)] border border-gray-600 rounded-md z-10">

                <div className="px-4 py-0.5 border-b border-gray-700 flex justify-between">

                  <div className="flex gap-2">
                    <button className={`flex items-center gap-1 text-green-500 font-semibold tab ${activeRightTab === 'testcase' ? 'tab-active' : ''}`} onClick={() => setActiveRightTab('testcase')}><CheckSquare size={16} />
                      Testcase</button>|
                    <button className={`tab flex items-center gap-1 ${activeRightTab === 'result' ? 'tab-active' : ''}`} onClick={() => setActiveRightTab('result')}><Volleyball size={18} />Result</button>
                  </div>

                  <div className="flex gap-2">
                    <button className={`px-3  flex gap-1 items-center text-sm font-changa rounded-md bg-yellow-500/15 text-yellow-400 border border-yellow-400 shadow-md backdrop-blur-sm ${loading ? 'loading' : ''}`} onClick={handleRun} disabled={loading}><Play size={16} />Run</button>
                    <button className={`px-3  flex gap-1 items-center text-sm font-changa rounded-md bg-green-500/15 text-green-400 border border-green-400 shadow-md backdrop-blur-sm ${loading ? 'loading' : ''}`} onClick={handleSubmitCode} disabled={loading}><CloudUpload size={20} />Submit</button>
                  </div>

                </div>

                {/* introduce tabs hear */}
                {activeRightTab === 'testcase' && (
                  <div className="flex-1 overflow-y-auto p-3 bg-[rgb(32,32,32)] rounded-md text-sm font-mono text-white">
                    {runResult ? (
                      <div className="space-y-4">

                        {/* Tab buttons */}
                        <div className="flex gap-3 px-2 font-changa text-xs bg-[rgb(32,32,32)] font-semibold">
                          {runResult.testCases.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setActiveCaseIndex(i)}
                              className={`px-3 py-1 rounded-full transition-all duration-200 ${i === activeCaseIndex
                                ? 'bg-[rgb(65,65,65)] text-white'
                                : 'text-gray-400 hover:text-white'
                                }`}
                            >
                              Case {i + 1}
                            </button>
                          ))}
                          <button className="text-gray-500 text-xl">+</button>
                        </div>

                        {/* Show selected input/output only */}
                        {runResult.testCases[activeCaseIndex] && (
                          <div
                            className={`bg-[rgb(32,32,32)] p-4 rounded-md border ${runResult.testCases[activeCaseIndex].status_id === 3
                              ? 'border-green-600'
                              : 'border-red-600'
                              }`}
                          >
                            <div className="mb-3 font-changa">
                              <label className="block text-gray-400 mb-1">nums =</label>
                              <input
                                type="text"
                                value={runResult.testCases[activeCaseIndex].stdin}
                                readOnly
                                className="w-full bg-[rgb(50,50,50)] px-3 py-2 rounded-md text-white outline-none"
                              />
                            </div>
                            <div className="font-changa">
                              <label className="block text-gray-400 mb-1">target =</label>
                              <input
                                type="text"
                                value={
                                  runResult.testCases[activeCaseIndex].expected_output || 'not added'
                                }
                                readOnly
                                className="w-full bg-[rgb(50,50,50)] px-3 py-2 rounded-md text-white outline-none"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-500 text-lg ">
                        Click <span className="text-yellow-400 font-semibold">  "Run" </span> to test your code.</div>
                    )}
                  </div>
                )}



                {/* submit */}
                {activeRightTab === 'result' && (
                  <div className="flex-1 px-4 py-2 overflow-y-auto bg-[rgb(32,32,32)] rounded-md border border-gray-700 shadow-md">
                    <div className="flex items-center justify-between mb-4 border-b border-gray-600 pb-2">
                      <h3 className=" text-xl font-changa text-white">Submission Result</h3>
                      {submitResult && (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm
                       ${submitResult.status === "accepted"
                            ? "bg-green-600/20 text-green-400 border border-green-500"
                            : "bg-red-600/20 text-red-400 border border-red-500"
                          }`}>
                          {submitResult.status === "accepted" ? "✓ Accepted" : "✗ Failed"}
                        </span>
                      )}
                    </div>

                    {submitResult ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm font-mono">

                          <div className="bg-gray-800 rounded p-3 border border-gray-700">
                            <p className="text-gray-400 mb-1">Test Cases Passed</p>
                            <p className="text-white font-semibold">{submitResult.testCasesPassed}/{submitResult.testCasesTotal}</p>
                          </div>

                          <div className="bg-gray-800 rounded p-3 border border-gray-700 overflow-x-auto">
                            <p className="text-gray-400 mb-1">Runtime</p>
                            <p className="text-white font-semibold">{submitResult.runtime} sec</p>
                          </div>

                          <div className="bg-gray-800 rounded p-3 border border-gray-700">
                            <p className="text-gray-400 mb-1">Memory</p>
                            <p className="text-white font-semibold">{submitResult.memory} KB</p>
                          </div>

                        </div>
                        {submitResult.status === "accepted" ? (

                          <div className=" text-sm text-green-400 border font-changa border-green-500 bg-green-500/10 rounded-md p-4">
                            <h4 className="font-bold text-green-300 text-base mb-2">🎉 Well Done!</h4>
                            <p>You've successfully solved the problem. Analyze your approach and hunt another challenge!</p>
                          </div>
                        ) : (
                          <div className=" text-sm text-red-400 border border-red-500 bg-red-500/10 rounded-md p-4">
                            <h4 className="font-bold text-red-300 text-base mb-2">❌ Reason for failure:</h4>
                            <p>{submitResult.message || "One or more test cases failed."}</p>
                          </div>
                        )}

                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm ">
                        Click <span className="text-yellow-400 font-semibold">"Submit"</span> to evaluate your solution.
                      </div>
                    )}
                  </div>
                )}


              </div>


            </Split>
          </div>


        </Split>
      </div >


      {/* Conditional Outputs */}




    </div >
  );
};

export default ProblemPage;