




import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClint';

const SubmissionHistory = ({ problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/problem/allsubmission/${problemId}`);
        setSubmissions(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch submission history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'badge-success';
      case 'wrong':
        return 'badge-error';
      case 'error':
        return 'badge-warning';
      case 'pending':
        return 'badge-info';
      default:
        return 'badge-neutral';
    }
  };

  const formatMemory = (memory) => {
    if (memory < 1024) return `${memory} kB`;
    return `${(memory / 1024).toFixed(2)} MB`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-yellow-500"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg my-4">
        <div>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[rgb(58,58,58)] dark:bg-[#1a1a1a] rounded-lg shadow-md ">
      <h2 className="text-2xl font-changa font-semibold text-white dark:text-white mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
        📝 Submission History
      </h2>

      {submissions.length === 0 ? (
        <div className="alert alert-info shadow-md">
          <div>
            <span>No submissions found for this problem</span>
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm">
              <thead className=" dark:bg-gray-800">
                <tr className="text-gray-300 dark:text-gray-300">
                  <th>#</th>
                  <th>Language</th>
                  <th>Status</th>
                  <th>Runtime</th>
                  <th>Memory</th>
                  <th>Test Cases</th>
                  <th>Submitted</th>
                  <th>Code</th>
                </tr>
              </thead>
              <tbody className="text-gray-200 dark:text-gray-100">
                {submissions.map((sub, index) => (
                  <tr key={sub._id} className="hover:bg-gray-600 dark:hover:bg-gray-700 transition duration-150">
                    <td>{index + 1}</td>
                    <td className="font-mono">{sub.language}</td>
                    <td>
                      <span className={`badge ${getStatusColor(sub.status)} capitalize`}>
                        {sub.status}
                      </span>
                    </td>
                    <td>{sub.runtime}s</td>
                    <td>{formatMemory(sub.memory)}</td>
                    <td>{sub.testCasesPassed}/{sub.testCasesTotal}</td>
                    <td>{formatDate(sub.createdAt)}</td>
                    <td>
                      <button
                        onClick={() => setSelectedSubmission(sub)}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Showing {submissions.length} submission{submissions.length > 1 && 's'}
          </p>
        </>
      )}

      {/* Code Modal */}
      {selectedSubmission && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-5xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg mb-4">
              Code - {selectedSubmission.language}
            </h3>

            <div className="mb-4 space-y-2">
              <div className="flex flex-wrap gap-2 text-sm">
                <span className={`badge ${getStatusColor(selectedSubmission.status)} capitalize`}>
                  {selectedSubmission.status}
                </span>
                <span className="badge badge-outline">
                  Runtime: {selectedSubmission.runtime}s
                </span>
                <span className="badge badge-outline">
                  Memory: {formatMemory(selectedSubmission.memory)}
                </span>
                <span className="badge badge-outline">
                  Test Cases: {selectedSubmission.testCasesPassed}/{selectedSubmission.testCasesTotal}
                </span>
              </div>

              {selectedSubmission.errorMessage && (
                <div className="alert alert-error mt-2 text-xs">
                  <div>
                    <span>{selectedSubmission.errorMessage}</span>
                  </div>
                </div>
              )}
            </div>

            <pre className="p-4 bg-gray-900 text-gray-100 rounded overflow-x-auto text-sm leading-relaxed">
              <code>{selectedSubmission.code}</code>
            </pre>

            <div className="modal-action mt-4">
              <button onClick={() => setSelectedSubmission(null)} className="btn btn-sm btn-secondary">
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default SubmissionHistory;
