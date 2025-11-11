import { useState, useEffect } from "react";

export default function useFile() {

    const [image_file, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [uploaded, setUploaded] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];

            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));

    }; 



    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    return {
        image_file,
        previewUrl,
        uploaded,
        loading,
        setLoading,
        setUploaded,
        handleFileChange,
        
    };
}
