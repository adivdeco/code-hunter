import React, { useState } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import { FiX, FiUpload, FiLoader, FiTrash2, FiPlayCircle, FiAlertCircle } from 'react-icons/fi';
import axiosClient from '@/utils/axiosClint';

Modal.setAppElement('#root'); // Ensure this matches your root element ID

// Reusable File Input Component
const FileInput = ({ label, name, file, onChange, accept }) => (
    <div>
        <label className="mb-1 block text-sm font-medium text-gray-300">{label}</label>
        <label className="flex h-12 w-full cursor-pointer items-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-700/50 px-3 transition-colors hover:border-blue-500 hover:bg-gray-700">
            <FiUpload className="mr-3 text-gray-400" />
            <span className="truncate text-gray-300">{file ? file.name : 'Click to select a file'}</span>
            <input
                type="file"
                name={name}
                accept={accept}
                onChange={onChange}
                className="hidden"
            />        </label>
    </div>
);

// Main Modal Component
export const VideoManagementModal = ({ isOpen, onClose, problem, onUploadVideo, onDeleteVideo }) => {
    const [videoData, setVideoData] = useState({ title: '', description: '' });
    const [files, setFiles] = useState({ videoFile: null, thumbnailFile: null });
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 100 * 1024 * 1024) { // 100MB limit
            toast.error("File size must be less than 100MB");
            return;
        }
        setFiles(prev => ({ ...prev, [e.target.name]: file }));
    };

    const handleInputChange = (e) => {
        setVideoData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!files.videoFile) {
            toast.error("Please select a video file");
            return;
        }

        setIsUploading(true);
        const toastId = toast.loading("Uploading video...");

        try {
            const formData = new FormData();
            formData.append('video', files.videoFile);
            if (files.thumbnailFile) {
                formData.append('thumbnail', files.thumbnailFile);
            }
            formData.append('title', videoData.title);
            formData.append('description', videoData.description);

            const response = await axiosClient.post(
                `/video/upload/${problem._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        toast.loading(`Uploading... ${percentCompleted}%`, { id: toastId });
                    }
                }
            );

            toast.success("Upload successful!", { id: toastId });
            // Reset form
            setFiles({ videoFile: null, thumbnailFile: null });
            setVideoData({ title: '', description: '' });
        } catch (error) {
            console.error("Upload error:", error);
            toast.error(
                error.response?.data?.error ||
                error.message ||
                "Upload failed",
                { id: toastId }
            );
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteClick = async (videoId) => {
        if (window.confirm('Are you sure you want to permanently delete this video?')) {
            const toastId = toast.loading('Deleting video...');
            const { success } = await onDeleteVideo(problem._id, videoId);
            if (success) toast.success('Video deleted.', { id: toastId });
            else toast.error('Failed to delete video.', { id: toastId });
        }
    };
    // console.log(problem)

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="relative m-auto w-11/12 max-w-4xl rounded-xl bg-gray-800 p-6 shadow-2xl outline-none"
            overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
            <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 transition-colors hover:text-white"><FiX size={24} /></button>
            <h2 className="mb-1 text-2xl font-bold text-white">Manage Videos: <span className="text-blue-400">{problem.title}</span></h2>

            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* --- Left Side: Existing Videos List --- */}
                <div className="flex flex-col">
                    <h3 className="text-lg text-gray-400 font-semibold mb-3 border-b border-gray-700 pb-2">Existing Solutions</h3>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-2" style={{ maxHeight: '400px' }}>
                        {(problem.videoSolutions?.length ?? 0) > 0 ? (
                            problem.videoSolutions.map(video => (
                                <div key={video._id} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 hover:bg-gray-700/50 transition-colors">
                                    <a href={video.secureUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                                        <FiPlayCircle className="text-green-400 w-6 h-6 flex-shrink-0" />
                                        <p className="font-medium group-hover:text-blue-300 truncate" title={video.title}>{video.title}</p>
                                    </a>
                                    <button onClick={() => handleDeleteClick(video)} className="text-red-500 hover:text-red-400 p-1 rounded-full hover:bg-red-500/10"><FiTrash2 /></button>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 text-center py-10 flex flex-col items-center">
                                <FiAlertCircle className="w-10 h-10 mb-2" />
                                <span>No videos uploaded yet.</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- Right Side: Upload Form --- */}
                <div className="border-t pt-6 md:border-t-0 md:pt-0 md:border-l md:pl-8 border-gray-700">
                    <h3 className="text-lg text-gray-400 font-semibold mb-3">Add New Solution</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <textarea name="description" value={videoData.description} onChange={handleInputChange} placeholder="uper/part way to solve" rows="3" className="form-input"></textarea>
                        <input type="text" name="title" value={videoData.title} onChange={handleInputChange} placeholder="lowerpart/timecopllex*" required className="form-input" />
                        <FileInput label="Video File*" name="videoFile" file={files.videoFile} onChange={handleFileChange} accept="video/*" />
                        <FileInput label="Custom Thumbnail (Optional)" name="thumbnailFile" file={files.thumbnailFile} onChange={handleFileChange} accept="image/*" />

                        <div className="mt-4 flex justify-end">
                            <button type="submit" disabled={isUploading} className="btn-primary flex items-center gap-2 w-full justify-center md:w-auto">
                                {isUploading ? <FiLoader className="animate-spin" /> : <FiUpload />}
                                {isUploading ? 'Uploading...' : 'Upload Video'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};