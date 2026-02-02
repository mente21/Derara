export const cloud_name = 'dhdkyidvp';
export const upload_preset = 'Derara';

export const uploadToCloudinary = async (file) => {
    if (!file) return null;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', upload_preset);
    formData.append('cloud_name', cloud_name);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Image upload failed');
        }

        const data = await response.json();
        // Return URL with auto-optimization applied immediately
        // This ensures all new uploads stored in DB are optimized by default
        const optimizedUrl = data.secure_url.replace('/upload/', '/upload/f_auto,q_auto/');
        return optimizedUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};
