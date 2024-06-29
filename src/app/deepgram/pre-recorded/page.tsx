"use client"
import React from 'react';
import { AppStateContext } from '@/components/contexts/contextProvider';

const TranscriptionApp = () => {
    const { activeMenu } = AppStateContext();
    const [file, setFile] = React.useState<any>(null);
    const [transcript, setTranscript] = React.useState<any>('');
    const [analysis, setAnalysis] = React.useState<any>('');
    const [error, setError] = React.useState<any>('');

    const handleFileChange = (event:any) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        if (!file) {
            setError('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/deepgram', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const result = await response.json();
            setTranscript(result.transcript);
            setAnalysis(result.analysis);
        } catch (error:any) {
            setError(`Transcription failed: ${error.message}`);
        }
    };

    return (
        <div className="p-8 dark:bg-main-dark-bg bg-main-bg min-h-screen transition-all duration-300">
            <h1 className="text-2xl font-bold mb-4 text-white">Transcription App</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="mb-2 p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Transcribe
                </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {transcript && (
                <div className="mb-4 max-w-full">
                    <h2 className="text-xl font-bold text-white">Transcript</h2>
                    <div className="p-4 bg-gray-100 rounded text-black whitespace-pre-wrap break-words">{transcript}</div>
                </div>
            )}
            {analysis && (
                <div className="max-w-full">
                    <h2 className="text-xl font-bold text-white">Analysis</h2>
                    <div className="p-4 bg-gray-100 text-black rounded whitespace-pre-wrap break-words">
                        {JSON.stringify(analysis, null, 2).split('\n').map((line, index) => (
                            <div key={index}>{line}</div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TranscriptionApp;
