import { useState, useEffect, useCallback } from 'react';

export const useFullscreen = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Cek status fullscreen saat ini
    const checkFullscreen = useCallback(() => {
        const isFS = !!(
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        );
        setIsFullscreen(isFS);
    }, []);

    // Listen untuk perubahan fullscreen
    useEffect(() => {
        document.addEventListener('fullscreenchange', checkFullscreen);
        document.addEventListener('webkitfullscreenchange', checkFullscreen);
        document.addEventListener('mozfullscreenchange', checkFullscreen);
        document.addEventListener('MSFullscreenChange', checkFullscreen);

        return () => {
            document.removeEventListener('fullscreenchange', checkFullscreen);
            document.removeEventListener('webkitfullscreenchange', checkFullscreen);
            document.removeEventListener('mozfullscreenchange', checkFullscreen);
            document.removeEventListener('MSFullscreenChange', checkFullscreen);
        };
    }, [checkFullscreen]);

    // Toggle fullscreen
    const toggleFullscreen = useCallback(async () => {
        try {
            if (!isFullscreen) {
                // Enter fullscreen
                const element = document.documentElement;
                if (element.requestFullscreen) {
                    await element.requestFullscreen();
                } else if (element.webkitRequestFullscreen) {
                    await element.webkitRequestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    await element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    await element.msRequestFullscreen();
                }
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    await document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    await document.msExitFullscreen();
                }
            }
        } catch (error) {
            console.error('Error toggling fullscreen:', error);
        }
    }, [isFullscreen]);

    return {
        isFullscreen,
        toggleFullscreen
    };
};
