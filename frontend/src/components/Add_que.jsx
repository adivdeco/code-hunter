// "use client";

// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import axiosClient from "../utils/axiosClint";
// import { useNavigate } from "react-router";
// import Navbar from "@/components/Navbar";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiPlus, FiTrash2, FiCode, FiFileText, FiCpu, FiEye, FiEyeOff } from "react-icons/fi";
// import { toast } from 'react-hot-toast';
// import { FaJava, FaPython, FaJs } from "react-icons/fa";
// import { FaGolang } from "react-icons/fa6";
// import { SiCplusplus } from "react-icons/si";
// // import CodeEditor from "@/components/CodeEditor"; // You'll need to implement or import this

// // Enhanced validation schema
// const problemSchema = z.object({
//   title: z.string().min(1, "Title is required").max(100),
//   description: z.string().min(1, "Description is required").max(5000),
//   difficulty: z.enum(["easy", "medium", "hard"]),
//   tags: z.enum(["array", "linkedList", "graph", "dp", "tree", "string", "math"]),
//   visibleTestCases: z.array(
//     z.object({
//       input: z.string().min(1, "Input is required"),
//       output: z.string().min(1, "Output is required"),
//       explanation: z.string().min(1, "Explanation is required"),
//     })
//   ).min(1, "At least one visible test case is required"),
//   hiddenTestCases: z.array(
//     z.object({
//       input: z.string().min(1, "Input is required"),
//       output: z.string().min(1, "Output is required"),
//     })
//   ).min(1, "At least one hidden test case is required"),
//   startCode: z.array(
//     z.object({
//       language: z.enum(["C++", "Java", "JavaScript", "Python", "Go"]),
//       initialCode: z.string().min(1, "Initial code is required"),
//     })
//   ).length(5),
//   referenceSolution: z.array(
//     z.object({
//       language: z.enum(["C++", "Java", "JavaScript", "Python", "Go"]),
//       completeCode: z.string().min(1, "Solution code is required"),
//     })
//   ).length(5),
// });

// const languageIcons = {
//   "C++": <SiCplusplus className="text-blue-400" />,
//   "Java": <FaJava className="text-red-400" />,
//   "JavaScript": <FaJs className="text-yellow-400" />,
//   "Python": <FaPython className="text-green-400" />,
//   "Go": <FaGolang className="text-cyan-400" />
// };

// function AdminPanel() {
//   const navigate = useNavigate();

//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(problemSchema),
//     defaultValues: {
//       startCode: ["C++", "Java", "JavaScript", "Python", "Go"].map((lang) => ({
//         language: lang,
//         initialCode: `// ${lang} starter code\n// Implement your solution here`,
//       })),
//       referenceSolution: ["C++", "Java", "JavaScript", "Python", "Go"].map((lang) => ({
//         language: lang,
//         completeCode: `// ${lang} solution\n// Complete implementation here`,
//       })),
//     },
//   });

//   const { fields: visibleFields, append: appendVisible, remove: removeVisible } = useFieldArray({
//     control,
//     name: "visibleTestCases",
//   });

//   const { fields: hiddenFields, append: appendHidden, remove: removeHidden } = useFieldArray({
//     control,
//     name: "hiddenTestCases",
//   });

//   const onSubmit = async (data) => {
//     try {
//       await axiosClient.post("/problem/create", data);
//       toast.success('Problem created successfully!', {
//         style: {
//           background: '#1f2937',
//           color: '#fff',
//           border: '1px solid #374151'
//         }
//       });
//       navigate("/admin/problems");
//     } catch (error) {
//       toast.error(`Error: ${error.response?.data?.message || error.message}`, {
//         style: {
//           background: '#1f2937',
//           color: '#fff',
//           border: '1px solid #374151'
//         }
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
//       <Navbar />

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="max-w-6xl mx-auto px-4 sm:px-6 py-12"
//       >
//         <motion.div
//           initial={{ scale: 0.95 }}
//           animate={{ scale: 1 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl md:text-5xl  mt-20 font-changa  mb-4">
//             🚀 Create New Coding Problem
//           </h1>
//           <p className="text-gray-400 max-w-2xl mx-auto">
//             Craft challenging problems with comprehensive test cases and starter code
//           </p>
//         </motion.div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//           {/* Basic Info Section */}
//           <motion.section
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//             className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50"
//           >
//             <div className="flex items-center gap-3 mb-6">
//               <FiFileText className="text-2xl text-purple-400" />
//               <h2 className="text-2xl font-semibold">Problem Information</h2>
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">Problem Title</label>
//                 <input
//                   {...register("title")}
//                   placeholder="Two Sum, Reverse Linked List, etc."
//                   className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//                 {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">Problem Description</label>
//                 <textarea
//                   {...register("description")}
//                   placeholder="Detailed description of the problem..."
//                   rows={6}
//                   className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//                 {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">Difficulty</label>
//                   <select
//                     {...register("difficulty")}
//                     className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   >
//                     <option value="easy" className="text-green-400">Easy</option>
//                     <option value="medium" className="text-yellow-400">Medium</option>
//                     <option value="hard" className="text-red-400">Hard</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
//                   <select
//                     {...register("tags")}
//                     className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   >
//                     <option value="array">Array</option>
//                     <option value="linkedList">Linked List</option>
//                     <option value="graph">Graph</option>
//                     <option value="dp">Dynamic Programming</option>
//                     <option value="tree">Tree</option>
//                     <option value="string">String</option>
//                     <option value="math">Math</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </motion.section>

//           {/* Visible Test Cases Section */}
//           <motion.section
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.3 }}
//             className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50"
//           >
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-3">
//                 <FiEye className="text-2xl text-blue-400" />
//                 <h2 className="text-2xl font-semibold">Visible Test Cases</h2>
//               </div>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="button"
//                 onClick={() => appendVisible({ input: "", output: "", explanation: "" })}
//                 className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
//               >
//                 <FiPlus /> Add Case
//               </motion.button>
//             </div>

//             <AnimatePresence>
//               {visibleFields.map((field, index) => (
//                 <motion.div
//                   key={field.id}
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="mb-6 overflow-hidden"
//                 >
//                   <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/50 space-y-4">
//                     <div className="flex justify-between items-center">
//                       <h3 className="font-medium text-gray-300">Test Case #{index + 1}</h3>
//                       <button
//                         onClick={() => removeVisible(index)}
//                         type="button"
//                         className="text-red-400 hover:text-red-300 transition-colors"
//                       >
//                         <FiTrash2 />
//                       </button>
//                     </div>

//                     <div>
//                       <label className="block text-sm text-gray-400 mb-1">Input</label>
//                       <textarea
//                         {...register(`visibleTestCases.${index}.input`)}
//                         placeholder="e.g., [2,7,11,15], 9"
//                         className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
//                         rows={2}
//                       />
//                       {errors.visibleTestCases?.[index]?.input && (
//                         <p className="mt-1 text-sm text-red-400">{errors.visibleTestCases[index].input.message}</p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm text-gray-400 mb-1">Output</label>
//                       <textarea
//                         {...register(`visibleTestCases.${index}.output`)}
//                         placeholder="e.g., [0,1]"
//                         className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
//                         rows={2}
//                       />
//                       {errors.visibleTestCases?.[index]?.output && (
//                         <p className="mt-1 text-sm text-red-400">{errors.visibleTestCases[index].output.message}</p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm text-gray-400 mb-1">Explanation</label>
//                       <textarea
//                         {...register(`visibleTestCases.${index}.explanation`)}
//                         placeholder="Explain why this input produces this output"
//                         className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                         rows={3}
//                       />
//                       {errors.visibleTestCases?.[index]?.explanation && (
//                         <p className="mt-1 text-sm text-red-400">{errors.visibleTestCases[index].explanation.message}</p>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {errors.visibleTestCases && (
//               <p className="mt-2 text-sm text-red-400">{errors.visibleTestCases.message}</p>
//             )}
//           </motion.section>

//           {/* Hidden Test Cases Section */}
//           <motion.section
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.4 }}
//             className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50"
//           >
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-3">
//                 <FiEyeOff className="text-2xl text-purple-400" />
//                 <h2 className="text-2xl font-semibold">Hidden Test Cases</h2>
//               </div>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="button"
//                 onClick={() => appendHidden({ input: "", output: "" })}
//                 className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
//               >
//                 <FiPlus /> Add Case
//               </motion.button>
//             </div>

//             <AnimatePresence>
//               {hiddenFields.map((field, index) => (
//                 <motion.div
//                   key={field.id}
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="mb-6 overflow-hidden"
//                 >
//                   <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/50 space-y-4">
//                     <div className="flex justify-between items-center">
//                       <h3 className="font-medium text-gray-300">Hidden Case #{index + 1}</h3>
//                       <button
//                         onClick={() => removeHidden(index)}
//                         type="button"
//                         className="text-red-400 hover:text-red-300 transition-colors"
//                       >
//                         <FiTrash2 />
//                       </button>
//                     </div>

//                     <div>
//                       <label className="block text-sm text-gray-400 mb-1">Input</label>
//                       <textarea
//                         {...register(`hiddenTestCases.${index}.input`)}
//                         placeholder="Hidden input that will test edge cases"
//                         className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
//                         rows={2}
//                       />
//                       {errors.hiddenTestCases?.[index]?.input && (
//                         <p className="mt-1 text-sm text-red-400">{errors.hiddenTestCases[index].input.message}</p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm text-gray-400 mb-1">Output</label>
//                       <textarea
//                         {...register(`hiddenTestCases.${index}.output`)}
//                         placeholder="Expected output for this hidden case"
//                         className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
//                         rows={2}
//                       />
//                       {errors.hiddenTestCases?.[index]?.output && (
//                         <p className="mt-1 text-sm text-red-400">{errors.hiddenTestCases[index].output.message}</p>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//             {errors.hiddenTestCases && (
//               <p className="mt-2 text-sm text-red-400">{errors.hiddenTestCases.message}</p>
//             )}
//           </motion.section>

//           {/* Code Templates Section */}
//           <motion.section
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.5 }}
//             className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50"
//           >
//             <div className="flex items-center gap-3 mb-6">
//               <FiCode className="text-2xl text-green-400" />
//               <h2 className="text-2xl font-semibold">Code Templates & Solutions</h2>
//             </div>

//             <div className="space-y-8">
//               {["C++", "Java", "JavaScript", "Python", "Go"].map((lang, i) => (
//                 <div key={lang} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/50">
//                   <div className="flex items-center gap-3 mb-4">
//                     {languageIcons[lang]}
//                     <h3 className="font-bold text-lg">{lang}</h3>
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-sm text-gray-400 mb-2">Starter Code</label>
//                     <textarea
//                       {...register(`startCode.${i}.initialCode`)}
//                       className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
//                       rows={6}
//                     />
//                     {errors.startCode?.[i]?.initialCode && (
//                       <p className="mt-1 text-sm text-red-400">{errors.startCode[i].initialCode.message}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm text-gray-400 mb-2">Reference Solution</label>
//                     <textarea
//                       {...register(`referenceSolution.${i}.completeCode`)}
//                       className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
//                       rows={6}
//                     />
//                     {errors.referenceSolution?.[i]?.completeCode && (
//                       <p className="mt-1 text-sm text-red-400">{errors.referenceSolution[i].completeCode.message}</p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.section>

//           {/* Submit Button */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className="pt-6"
//           >
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${isSubmitting
//                 ? 'bg-purple-700 cursor-not-allowed'
//                 : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg'}`}
//             >
//               {isSubmitting ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Processing...
//                 </div>
//               ) : (
//                 '🚀 Publish Problem'
//               )}
//             </motion.button>
//           </motion.div>
//         </form>
//       </motion.div>
//     </div>
//   );
// }

// export default AdminPanel;

"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "../utils/axiosClint";
import { useNavigate } from "react-router";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiTrash2, FiCode, FiFileText, FiCpu, FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from 'react-hot-toast';
import { FaJava, FaPython, FaJs } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { SiCplusplus } from "react-icons/si";
import { useState } from "react";

// Enhanced validation schema matching your MongoDB schema
const problemSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required").max(5000),
  difficulty: z.enum(["easy", "medium", "hard"]),
  tags: z.enum(["array", "string", "linkedlist", "tree", "graph", "dynamic programming", "greedy", "backtracking"]),
  companies: z.array(
    z.enum(["Google", "Netflix", "TCS", "Amazon", "Microsoft", "Facebook", "Apple", "Goldman Sachs", "Flipkart"])
  ).min(1, "At least one company is required"),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().min(1, "Explanation is required"),
    })
  ).min(1, "At least one visible test case is required"),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
    })
  ).min(1, "At least one hidden test case is required"),
  startCode: z.array(
    z.object({
      language: z.enum(["C++", "Java", "JavaScript", "Python", "Go"]),
      initialCode: z.string().min(1, "Initial code is required"),
    })
  ).min(1, "At least one language starter code is required"),
  referenceSolution: z.array(
    z.object({
      language: z.enum(["C++", "Java", "JavaScript", "Python", "Go"]),
      completeCode: z.string().min(1, "Solution code is required"),
    })
  ).min(1, "At least one reference solution is required"),
});

const languageIcons = {
  "C++": <SiCplusplus className="language-icon text-blue-400 w-5 h-5" />,
  "Java": <FaJava className="language-icon text-red-400 w-7 h-7" />,
  "JavaScript": <FaJs className="language-icon text-yellow-400 w-5 h-5" />,
  "Python": <FaPython className="language-icon text-green-400 w-5 h-5" />,
  "Go": <FaGolang className="language-icon text-cyan-400 w-5 h-5" />
};

const companyColors = {
  "Google": "bg-red-500/10 border-red-500/30",
  "Netflix": "bg-red-700/10 border-red-700/30",
  "TCS": "bg-blue-500/10 border-blue-500/30",
  "Amazon": "bg-yellow-500/10 border-yellow-500/30",
  "Microsoft": "bg-green-500/10 border-green-500/30",
  "Facebook": "bg-blue-600/10 border-blue-600/30",
  "Apple": "bg-gray-500/10 border-gray-500/30",
  "Goldman Sachs": "bg-blue-400/10 border-blue-400/30",
  "Flipkart": "bg-yellow-600/10 border-yellow-600/30"
};

function AdminPanel() {
  const navigate = useNavigate();
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      companies: [],
      startCode: ["C++", "Java", "JavaScript", "Python", "Go"].map((lang) => ({
        language: lang,
        initialCode: `// ${lang} starter code\n// Implement your solution here`,
      })),
      referenceSolution: ["C++", "Java", "JavaScript", "Python", "Go"].map((lang) => ({
        language: lang,
        completeCode: `// ${lang} solution\n// Complete implementation here`,
      })),
    },
  });

  const { fields: visibleFields, append: appendVisible, remove: removeVisible } = useFieldArray({
    control,
    name: "visibleTestCases",
  });

  const { fields: hiddenFields, append: appendHidden, remove: removeHidden } = useFieldArray({
    control,
    name: "hiddenTestCases",
  });

  const { fields: startCodeFields } = useFieldArray({
    control,
    name: "startCode",
  });

  const { fields: referenceSolutionFields } = useFieldArray({
    control,
    name: "referenceSolution",
  });

  const toggleCompany = (company) => {
    const currentCompanies = watch("companies");
    const updatedCompanies = currentCompanies.includes(company)
      ? currentCompanies.filter(c => c !== company)
      : [...currentCompanies, company];

    setValue("companies", updatedCompanies);
  };

  const onSubmit = async (data) => {
    try {
      await axiosClient.post("/problem/create", data);
      toast.success('Problem created successfully!', {
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151'
        }
      });
      navigate("/admin/problems");
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`, {
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151'
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 py-12"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl mt-20 font-changa mb-4">
            🚀 Create New Coding Problem
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Craft challenging problems with comprehensive test cases and starter code
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Info Section */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <FiFileText className="text-2xl text-purple-400" />
              <h2 className="text-2xl font-semibold">Problem Information</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Problem Title</label>
                <input
                  {...register("title")}
                  placeholder="Two Sum, Reverse Linked List, etc."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Problem Description</label>
                <textarea
                  {...register("description")}
                  placeholder="Detailed description of the problem..."
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Difficulty</label>
                  <select
                    {...register("difficulty")}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="easy" className="text-green-400">Easy</option>
                    <option value="medium" className="text-yellow-400">Medium</option>
                    <option value="hard" className="text-red-400">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                  <select
                    {...register("tags")}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="array">Array</option>
                    <option value="string">String</option>
                    <option value="linkedlist">Linked List</option>
                    <option value="tree">Tree</option>
                    <option value="graph">Graph</option>
                    <option value="dynamic programming">Dynamic Programming</option>
                    <option value="greedy">Greedy</option>
                    <option value="backtracking">Backtracking</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Companies</label>
                <div className="flex flex-wrap gap-3">
                  {["Google", "Netflix", "TCS", "Amazon", "Microsoft", "Facebook", "Apple", "Goldman Sachs", "Flipkart"].map((company) => (
                    <motion.button
                      key={company}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleCompany(company)}
                      className={`px-3 py-1 rounded-full border text-sm flex items-center gap-1 transition-all ${watch("companies")?.includes(company)
                        ? `${companyColors[company]} text-white border-current`
                        : "bg-gray-700/50 border-gray-600 text-gray-300"
                        }`}
                    >
                      {company}
                    </motion.button>
                  ))}
                </div>
                {errors.companies && <p className="mt-1 text-sm text-red-400">{errors.companies.message}</p>}
              </div>
            </div>
          </motion.section>

          {/* Visible Test Cases Section */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FiEye className="text-2xl text-blue-400" />
                <h2 className="text-2xl font-semibold">Visible Test Cases</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => appendVisible({ input: "", output: "", explanation: "" })}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
              >
                <FiPlus /> Add Case
              </motion.button>
            </div>

            <AnimatePresence>
              {visibleFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/50 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-300">Test Case #{index + 1}</h3>
                      <button
                        onClick={() => removeVisible(index)}
                        type="button"
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Input</label>
                      <textarea
                        {...register(`visibleTestCases.${index}.input`)}
                        placeholder="e.g., [2,7,11,15], 9"
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                        rows={2}
                      />
                      {errors.visibleTestCases?.[index]?.input && (
                        <p className="mt-1 text-sm text-red-400">{errors.visibleTestCases[index].input.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Output</label>
                      <textarea
                        {...register(`visibleTestCases.${index}.output`)}
                        placeholder="e.g., [0,1]"
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                        rows={2}
                      />
                      {errors.visibleTestCases?.[index]?.output && (
                        <p className="mt-1 text-sm text-red-400">{errors.visibleTestCases[index].output.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Explanation</label>
                      <textarea
                        {...register(`visibleTestCases.${index}.explanation`)}
                        placeholder="Explain why this input produces this output"
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        rows={3}
                      />
                      {errors.visibleTestCases?.[index]?.explanation && (
                        <p className="mt-1 text-sm text-red-400">{errors.visibleTestCases[index].explanation.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {errors.visibleTestCases && (
              <p className="mt-2 text-sm text-red-400">{errors.visibleTestCases.message}</p>
            )}
          </motion.section>

          {/* Hidden Test Cases Section */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FiEyeOff className="text-2xl text-purple-400" />
                <h2 className="text-2xl font-semibold">Hidden Test Cases</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => appendHidden({ input: "", output: "" })}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
              >
                <FiPlus /> Add Case
              </motion.button>
            </div>

            <AnimatePresence>
              {hiddenFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/50 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-300">Hidden Case #{index + 1}</h3>
                      <button
                        onClick={() => removeHidden(index)}
                        type="button"
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Input</label>
                      <textarea
                        {...register(`hiddenTestCases.${index}.input`)}
                        placeholder="Hidden input that will test edge cases"
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                        rows={2}
                      />
                      {errors.hiddenTestCases?.[index]?.input && (
                        <p className="mt-1 text-sm text-red-400">{errors.hiddenTestCases[index].input.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Output</label>
                      <textarea
                        {...register(`hiddenTestCases.${index}.output`)}
                        placeholder="Expected output for this hidden case"
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                        rows={2}
                      />
                      {errors.hiddenTestCases?.[index]?.output && (
                        <p className="mt-1 text-sm text-red-400">{errors.hiddenTestCases[index].output.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {errors.hiddenTestCases && (
              <p className="mt-2 text-sm text-red-400">{errors.hiddenTestCases.message}</p>
            )}
          </motion.section>

          {/* Code Templates Section */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <FiCode className="text-2xl text-green-400" />
              <h2 className="text-2xl font-semibold">Code Templates & Solutions</h2>
            </div>

            <div className="space-y-8">
              {startCodeFields.map((field, index) => (
                <div key={field.id} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/50">
                  <div className="flex items-center gap-3 mb-4">
                    {languageIcons[field.language]}
                    <h3 className="font-bold text-lg">{field.language}</h3>
                  </div>


                  {/* startercode */}
                  <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">Starter Code</label>
                    <textarea
                      {...register(`startCode.${index}.initialCode`)}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                      rows={6}
                    />
                    {errors.startCode?.[index]?.initialCode && (
                      <p className="mt-1 text-sm text-red-400">{errors.startCode[index].initialCode.message}</p>
                    )}
                  </div>
                  {/* ref soln */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Reference Solution</label>
                    <textarea
                      {...register(`referenceSolution.${index}.completeCode`)}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                      rows={6}
                    />
                    {errors.referenceSolution?.[index]?.completeCode && (
                      <p className="mt-1 text-sm text-red-400">{errors.referenceSolution[index].completeCode.message}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${isSubmitting
                ? 'bg-purple-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg'}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-100" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                '🚀 Publish Problem'
              )}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}

export default AdminPanel;