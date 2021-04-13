import { useState } from 'react';

function useLoading() {
    const [isLoading, setIsLoading] = useState(true);
    
    return {
        isLoading, setIsLoading
    }
}

export default useLoading
