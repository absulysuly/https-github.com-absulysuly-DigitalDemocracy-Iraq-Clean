import { Candidate } from '../types';

const API_BASE_URL = 'https://hamlet-unified-complete-2027-production.up.railway.app/api';

// The backend report mentions pagination, so the data is likely nested.
// We'll assume a structure like { data: [...] } for robustness.
interface ApiCandidatesResponse {
    data: Candidate[];
    meta?: {
        total: number;
        page: number;
        limit: number;
    }
}

export const getCandidates = async (): Promise<Candidate[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/candidates`);
        if (!response.ok) {
            throw new Error(`Failed to fetch candidates: ${response.statusText}`);
        }
        
        const result: ApiCandidatesResponse = await response.json();
        
        // Return the nested data array, or an empty array if the structure is unexpected.
        return result.data || [];

    } catch (error) {
        console.error("Error fetching candidates from the election API:", error);
        // Re-throw the error to be handled by the component that calls this function.
        throw error;
    }
};
