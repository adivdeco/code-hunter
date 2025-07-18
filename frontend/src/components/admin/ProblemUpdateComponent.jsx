import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, NavLink } from 'react-router';
import axiosClient from '@/utils/axiosClint';
import { toast } from 'react-hot-toast';
import { FiEdit, FiSave, FiX, FiTrash2, FiPlus, FiXCircle } from 'react-icons/fi';
// import NavProfile from './NavProfile';
import { useSelector } from 'react-redux';
import AdminNavbar from '@/components/admin/AdminNav';


const ProblemUpdateComponent = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Form state matching your schema
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        difficulty: 'easy',
        tags: 'array',
        companies: [],
        visibleTestCases: [],
        hiddenTestCases: [],
        startCode: [],
        referenceSolution: [],
        problemCreator: ''
    });



    // Options for dropdowns based on your schema enums
    const difficultyOptions = ['easy', 'medium', 'hard'];
    const tagOptions = ['array', 'string', 'linkedlist', 'tree', 'graph', 'dynamic programming', 'greedy', 'backtracking'];
    const companyOptions = ['Google', 'Netflix', 'TCS', 'Amazon', 'Microsoft', 'Facebook', 'Apple', 'Goldman Sachs', 'Flipkart'];

    // New item states
    const [newCompany, setNewCompany] = useState('');
    const [newVisibleTestCase, setNewVisibleTestCase] = useState({
        input: '',
        output: '',
        explanation: ''
    });
    const [newHiddenTestCase, setNewHiddenTestCase] = useState({
        input: '',
        output: ''
    });
    const [newStartCode, setNewStartCode] = useState({
        language: '',
        initialCode: ''
    });
    const [newReferenceSolution, setNewReferenceSolution] = useState({
        language: '',
        completeCode: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch all problems
    const fetchProblems = async () => {
        try {
            setLoading(true);
            const { data } = await axiosClient.get('/problem/allProblems');
            setProblems(data.allproblem);

            // If there's an ID in URL params, select that problem
            if (id) {
                const problemToEdit = data.allproblem.find(p => p._id === id);
                if (problemToEdit) {
                    handleProblemSelect(problemToEdit);
                }
            }
        } catch (err) {
            setError('Failed to fetch problems');
            console.error(err);
            showErrorToast('Failed to load problems');
        } finally {
            setLoading(false);
        }
    };

    const showErrorToast = (message) => {
        toast.error(message, {
            icon: <FiXCircle className="language-icon text-red-500" />,
            style: {
                background: '#1f2937',
                color: '#fff',
                border: '1px solid #374151'
            }
        });
    };

    const showSuccessToast = (message) => {
        toast.success(message, {
            style: {
                background: '#1f2937',
                color: '#fff',
                border: '1px solid #374151'
            }
        });
    };

    useEffect(() => {
        fetchProblems();
    }, [id]);

    // Handle problem selection
    const handleProblemSelect = (problem) => {
        setSelectedProblem(problem);
        setIsEditing(false);
        setFormData({
            title: problem.title,
            description: problem.description,
            difficulty: problem.difficulty,
            tags: problem.tags,
            companies: [...problem.companies],
            visibleTestCases: [...problem.visibleTestCases],
            hiddenTestCases: [...problem.hiddenTestCases],
            startCode: [...problem.startCode],
            referenceSolution: [...problem.referenceSolution],
            problemCreator: problem.problemCreator
        });
        navigate(`/admin/update/${problem._id}`);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle select changes
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Add a company
    const handleAddCompany = () => {
        if (newCompany && !formData.companies.includes(newCompany)) {
            setFormData(prev => ({
                ...prev,
                companies: [...prev.companies, newCompany]
            }));
            setNewCompany('');
        }
    };

    // Remove a company
    const handleRemoveCompany = (companyToRemove) => {
        setFormData(prev => ({
            ...prev,
            companies: prev.companies.filter(company => company !== companyToRemove)
        }));
    };

    // Add visible test case
    const handleAddVisibleTestCase = () => {
        if (newVisibleTestCase.input.trim() && newVisibleTestCase.output.trim()) {
            setFormData(prev => ({
                ...prev,
                visibleTestCases: [...prev.visibleTestCases, {
                    input: newVisibleTestCase.input,
                    output: newVisibleTestCase.output,
                    explanation: newVisibleTestCase.explanation || 'No explanation provided'
                }]
            }));
            setNewVisibleTestCase({ input: '', output: '', explanation: '' });
        }
    };

    // Remove visible test case
    const handleRemoveVisibleTestCase = (index) => {
        setFormData(prev => ({
            ...prev,
            visibleTestCases: prev.visibleTestCases.filter((_, i) => i !== index)
        }));
    };

    // Add hidden test case
    const handleAddHiddenTestCase = () => {
        if (newHiddenTestCase.input.trim() && newHiddenTestCase.output.trim()) {
            setFormData(prev => ({
                ...prev,
                hiddenTestCases: [...prev.hiddenTestCases, {
                    input: newHiddenTestCase.input,
                    output: newHiddenTestCase.output
                }]
            }));
            setNewHiddenTestCase({ input: '', output: '' });
        }
    };

    // Remove hidden test case
    const handleRemoveHiddenTestCase = (index) => {
        setFormData(prev => ({
            ...prev,
            hiddenTestCases: prev.hiddenTestCases.filter((_, i) => i !== index)
        }));
    };

    // Add start code
    const handleAddStartCode = () => {
        if (newStartCode.language && newStartCode.initialCode.trim()) {
            setFormData(prev => ({
                ...prev,
                startCode: [...prev.startCode, {
                    language: newStartCode.language,
                    initialCode: newStartCode.initialCode
                }]
            }));
            setNewStartCode({ language: '', initialCode: '' });
        }
    };

    // Remove start code
    const handleRemoveStartCode = (index) => {
        setFormData(prev => ({
            ...prev,
            startCode: prev.startCode.filter((_, i) => i !== index)
        }));
    };

    // Add reference solution
    const handleAddReferenceSolution = () => {
        if (newReferenceSolution.language && newReferenceSolution.completeCode.trim()) {
            setFormData(prev => ({
                ...prev,
                referenceSolution: [...prev.referenceSolution, {
                    language: newReferenceSolution.language,
                    completeCode: newReferenceSolution.completeCode
                }]
            }));
            setNewReferenceSolution({ language: '', completeCode: '' });
        }
    };

    // Remove reference solution
    const handleRemoveReferenceSolution = (index) => {
        setFormData(prev => ({
            ...prev,
            referenceSolution: prev.referenceSolution.filter((_, i) => i !== index)
        }));
    };

    // Submit the updated problem
    const handleSubmit = async () => {
        try {
            setLoading(true);
            await axiosClient.put(`/problem/update/${selectedProblem._id}`, formData);
            showSuccessToast('Problem updated successfully');
            fetchProblems(); // Refresh the list
            setIsEditing(false);
        } catch (err) {
            setError('Failed to update problem');
            console.error(err);
            showErrorToast('Failed to update problem');
        } finally {
            setLoading(false);
        }
    };
    const { user } = useSelector((state) => state.auth);


    return (

        <div className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
            <nav>
                <AdminNavbar user={user} />
            </nav>

            <div className="container mx-auto px-4 py-8 ">



                <h1 className="text-3xl font-bold text-white dark:text-white mb-8">Update Problems</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Problem List Sidebar */}
                    <div className="lg:col-span-1">
                        <h2 className="text-xl font-semibold mb-4 text-white dark:text-gray-300">Select a Problem</h2>
                        <div className="space-y-4">
                            {loading && !problems.length ? (
                                <div className="animate-pulse space-y-2">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    ))}
                                </div>
                            ) : error ? (
                                <div className="text-red-500">{error}</div>
                            ) : (
                                problems.map(problem => (
                                    <div
                                        key={problem._id}
                                        onClick={() => handleProblemSelect(problem)}
                                        className={`p-4 rounded-lg cursor-pointer transition-all ${selectedProblem?._id === problem._id
                                            ? 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500'
                                            : 'bg-gray-400 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            } shadow-sm`}
                                    >
                                        <h3 className="font-medium text-gray-800 dark:text-gray-200">{problem.title}</h3>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            <span className={`px-2 py-1 text-xs rounded-full ${problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                                problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {problem.difficulty}
                                            </span>
                                            <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200">
                                                {problem.tags}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Problem Details and Edit Form */}
                    <div className="lg:col-span-2">
                        {selectedProblem ? (
                            <div className="bg-gray-300 dark:bg-gray-800 rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                        {selectedProblem.title}
                                    </h2>
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <FiEdit /> Edit
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                            >
                                                <FiX /> Cancel
                                            </button>
                                            <button
                                                onClick={handleSubmit}
                                                disabled={loading}
                                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                            >
                                                {loading ? 'Saving...' : (
                                                    <>
                                                        <FiSave /> Save Changes
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {isEditing ? (
                                    <div className="space-y-6">
                                        {/* Basic Information */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Basic Information</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        value={formData.title}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Difficulty
                                                    </label>
                                                    <select
                                                        name="difficulty"
                                                        value={formData.difficulty}
                                                        onChange={handleSelectChange}
                                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                    >
                                                        {difficultyOptions.map(option => (
                                                            <option key={option} value={option}>
                                                                {option.charAt(0).toUpperCase() + option.slice(1)}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Tags
                                                </label>
                                                <select
                                                    name="tags"
                                                    value={formData.tags}
                                                    onChange={handleSelectChange}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                >
                                                    {tagOptions.map(option => (
                                                        <option key={option} value={option}>
                                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Companies
                                                </label>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {formData.companies.map(company => (
                                                        <span
                                                            key={company}
                                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                        >
                                                            {company}
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveCompany(company)}
                                                                className="ml-1.5 inline-flex text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 focus:outline-none"
                                                            >
                                                                <FiX className="h-3 w-3" />
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex gap-2">
                                                    <select
                                                        value={newCompany}
                                                        onChange={(e) => setNewCompany(e.target.value)}
                                                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                    >
                                                        <option value="">Select a company</option>
                                                        {companyOptions.map(company => (
                                                            <option key={company} value={company}>{company}</option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        type="button"
                                                        onClick={handleAddCompany}
                                                        className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                                                    >
                                                        <FiPlus />
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Description
                                                </label>
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    rows={6}
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                />
                                            </div>
                                        </div>

                                        {/* Visible Test Cases */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Visible Test Cases</h3>
                                            {formData.visibleTestCases.map((testCase, index) => (
                                                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                            Test Case #{index + 1}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveVisibleTestCase(index)}
                                                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                                Input
                                                            </label>
                                                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">
                                                                {testCase.input}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                                Output
                                                            </label>
                                                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">
                                                                {testCase.output}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                            Explanation
                                                        </label>
                                                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                                                            {testCase.explanation}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Add New Visible Test Case</h4>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                            Input
                                                        </label>
                                                        <textarea
                                                            value={newVisibleTestCase.input}
                                                            onChange={(e) => setNewVisibleTestCase({ ...newVisibleTestCase, input: e.target.value })}
                                                            rows={2}
                                                            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                            Output
                                                        </label>
                                                        <textarea
                                                            value={newVisibleTestCase.output}
                                                            onChange={(e) => setNewVisibleTestCase({ ...newVisibleTestCase, output: e.target.value })}
                                                            rows={2}
                                                            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                            Explanation
                                                        </label>
                                                        <textarea
                                                            value={newVisibleTestCase.explanation}
                                                            onChange={(e) => setNewVisibleTestCase({ ...newVisibleTestCase, explanation: e.target.value })}
                                                            rows={2}
                                                            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={handleAddVisibleTestCase}
                                                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                                                    >
                                                        <FiPlus size={14} /> Add Test Case
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hidden Test Cases */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Hidden Test Cases</h3>
                                            {formData.hiddenTestCases.map((testCase, index) => (
                                                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                            Test Case #{index + 1}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveHiddenTestCase(index)}
                                                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                                Input
                                                            </label>
                                                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">
                                                                {testCase.input}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                                Output
                                                            </label>
                                                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">
                                                                {testCase.output}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Add New Hidden Test Case</h4>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                            Input
                                                        </label>
                                                        <textarea
                                                            value={newHiddenTestCase.input}
                                                            onChange={(e) => setNewHiddenTestCase({ ...newHiddenTestCase, input: e.target.value })}
                                                            rows={2}
                                                            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                            Output
                                                        </label>
                                                        <textarea
                                                            value={newHiddenTestCase.output}
                                                            onChange={(e) => setNewHiddenTestCase({ ...newHiddenTestCase, output: e.target.value })}
                                                            rows={2}
                                                            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={handleAddHiddenTestCase}
                                                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                                                    >
                                                        <FiPlus size={14} /> Add Test Case
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Starter Code */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Starter Code</h3>
                                            {formData.startCode.map((code, index) => (
                                                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            {code.language}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveStartCode(index)}
                                                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    </div>
                                                    <pre className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono overflow-x-auto">
                                                        {code.initialCode}
                                                    </pre>
                                                </div>
                                            ))}
                                            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Add New Starter Code</h4>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                            Language
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={newStartCode.language}
                                                            onChange={(e) => setNewStartCode({ ...newStartCode, language: e.target.value })}
                                                            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                            Initial Code
                                                        </label>
                                                        <textarea
                                                            value={newStartCode.initialCode}
                                                            onChange={(e) => setNewStartCode({ ...newStartCode, initialCode: e.target.value })}
                                                            rows={6}
                                                            className="w-full px-2 py-1 text-sm font-mono border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={handleAddStartCode}
                                                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                                                    >
                                                        <FiPlus size={14} /> Add Starter Code
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reference Solution */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Reference Solution</h3>
                                            {formData.referenceSolution.map((solution, index) => (
                                                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            {solution.language}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveReferenceSolution(index)}
                                                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    </div>
                                                    <pre className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono overflow-x-auto">
                                                        {solution.completeCode}
                                                    </pre>
                                                </div>
                                            ))}
                                            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Add New Reference Solution</h4>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                            Language
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={newReferenceSolution.language}
                                                            onChange={(e) => setNewReferenceSolution({ ...newReferenceSolution, language: e.target.value })}
                                                            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                            Complete Code
                                                        </label>
                                                        <textarea
                                                            value={newReferenceSolution.completeCode}
                                                            onChange={(e) => setNewReferenceSolution({ ...newReferenceSolution, completeCode: e.target.value })}
                                                            rows={6}
                                                            className="w-full px-2 py-1 text-sm font-mono border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={handleAddReferenceSolution}
                                                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                                                    >
                                                        <FiPlus size={14} /> Add Solution
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {/* View Mode */}
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-2">
                                                <span className={`px-2 py-1 text-sm rounded-full ${selectedProblem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                                    selectedProblem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {selectedProblem.difficulty}
                                                </span>
                                                <span className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200">
                                                    {selectedProblem.tags}
                                                </span>
                                                {selectedProblem.companies.map((company, i) => (
                                                    <span key={i} className="px-2 py-1 text-sm bg-blue-100 dark:bg-blue-900 rounded-full text-blue-800 dark:text-blue-200">
                                                        {company}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="prose dark:prose-invert max-w-none">
                                                <div dangerouslySetInnerHTML={{ __html: selectedProblem.description }} />
                                            </div>
                                        </div>

                                        {/* Visible Test Cases */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Visible Test Cases</h3>
                                            {selectedProblem.visibleTestCases.map((testCase, index) => (
                                                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Test Case #{index + 1}</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                                Input
                                                            </label>
                                                            <pre className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono overflow-x-auto">
                                                                {testCase.input}
                                                            </pre>
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                                Output
                                                            </label>
                                                            <pre className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono overflow-x-auto">
                                                                {testCase.output}
                                                            </pre>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                            Explanation
                                                        </label>
                                                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                                                            {testCase.explanation}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Starter Code */}
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Starter Code</h3>
                                            {selectedProblem.startCode.map((code, index) => (
                                                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{code.language}</h4>
                                                    <pre className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono overflow-x-auto">
                                                        {code.initialCode}
                                                    </pre>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
                                <p className="text-gray-600 dark:text-gray-400">Select a problem from the list to view or edit</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemUpdateComponent;