import React, { useState } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import { FiX, FiUpload, FiLoader } from 'react-icons/fi';
import axiosClient from '@/utils/axiosClint';

Modal.setAppElement('#root'); // Important for accessibility

const FileInput = ({ label, name, file, onChange, accept }) => (
    <div>
        <label className="mb-1 block text-sm font-medium text-gray-300">{label}</label>
        <label className="flex h-12 w-full cursor-pointer items-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-700/50 px-3 transition-colors hover:border-blue-500 hover:bg-gray-700">
            <FiUpload className="mr-3 text-gray-400" />
            <span className="truncate text-gray-300">{file ? file.name : 'Click to select a file'}</span>
            <input type="file" name={name} accept={accept} onChange={onChange} className="hidden" />
        </label>
    </div>
);

export const VideoUploadModal = ({ isOpen, onClose, problem, onUploadSuccess, isUploading, setIsUploading }) => {
    const [videoData, setVideoData] = useState({
        title: problem.videoSolution?.title || `${problem.title} Solution`,
        description: problem.videoSolution?.description || `A complete walkthrough and explanation for the ${problem.title} problem.`,
        videoFile: null,
        thumbnailFile: null,
    });

    const handleFileChange = (e) => {
        setVideoData(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
    };

    const handleInputChange = (e) => {
        setVideoData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!videoData.videoFile && !problem.videoSolution) {
            toast.error('A video file is required to upload.');
            return;
        }

        setIsUploading(true);
        const toastId = toast.loading('Uploading video...');

        const formData = new FormData();
        formData.append('problemId', problem._id);
        formData.append('title', videoData.title);
        formData.append('description', videoData.description);
        if (videoData.videoFile) formData.append('video', videoData.videoFile);
        if (videoData.thumbnailFile) formData.append('thumbnail', videoData.thumbnailFile);

        try {
            // Note: Use your correct endpoint for adding/updating a video
            const response = await axiosClient.post('/problem/addVideoSolution', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            // Assuming the backend returns the updated problem or just the video part
            onUploadSuccess(problem._id, { videoSolution: response.data.video });
            toast.success('Video uploaded successfully!', { id: toastId });
            onClose();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Upload failed. Please try again.', { id: toastId });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="relative m-auto w-11/12 max-w-2xl rounded-xl bg-gray-800 p-6 shadow-2xl outline-none"
            overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
            <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 transition-colors hover:text-white">
                <FiX size={24} />
            </button>
            <h2 className="mb-1 text-2xl font-bold text-white">
                {problem.videoSolution ? 'Update Video' : 'Add Video Solution'}
            </h2>
            <p className="mb-6 text-blue-400">{problem.title}</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" name="title" value={videoData.title} onChange={handleInputChange} placeholder="Video Title" required className="form-input" />
                <textarea name="description" value={videoData.description} onChange={handleInputChange} placeholder="Video Description" rows="3" className="form-input"></textarea>

                <FileInput label="Video File (.mp4, .webm)" name="videoFile" file={videoData.videoFile} onChange={handleFileChange} accept="video/*" />
                <FileInput label="Thumbnail Image (Optional)" name="thumbnailFile" file={videoData.thumbnailFile} onChange={handleFileChange} accept="image/*" />

                <div className="mt-4 flex justify-end gap-3">
                    <button type="button" onClick={onClose} disabled={isUploading} className="btn-secondary">Cancel</button>
                    <button type="submit" disabled={isUploading} className="btn-primary flex items-center gap-2">
                        {isUploading ? <FiLoader className="animate-spin" /> : null}
                        {isUploading ? 'Uploading...' : 'Submit Video'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};