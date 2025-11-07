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


// --- MOCK DATA ---
// This is used as a fallback because the live API has a CORS (Cross-Origin Resource Sharing)
// issue. The backend server needs to be configured to send an 'Access-Control-Allow-Origin'
// header to allow requests from the frontend.
const mockCandidates: Candidate[] = [
  { id: 'c1', name: 'Elena Rodriguez', party: 'Progressive Alliance', avatarUrl: 'https://picsum.photos/id/1027/100/100', supporters: 12503, postCount: 42, governorate: 'Baghdad', gender: 'Female' },
  { id: 'c2', name: 'Marcus Thorne', party: 'Economic Freedom Party', avatarUrl: 'https://picsum.photos/id/1031/100/100', supporters: 9870, postCount: 35, governorate: 'Basra', gender: 'Male' },
  { id: 'c3', name: 'Anya Sharma', party: 'Green Future Coalition', avatarUrl: 'https://picsum.photos/id/1045/100/100', supporters: 11200, postCount: 51, governorate: 'Erbil', gender: 'Female' },
  { id: 'c4', name: 'Jamal Al-Farsi', party: 'National Unity Front', avatarUrl: 'https://picsum.photos/id/1050/100/100', supporters: 8500, postCount: 28, governorate: 'Nineveh', gender: 'Male' },
];


export const getCandidates = async (): Promise<Candidate[]> => {
    
    // --- TEMPORARY FIX: Return Mock Data ---
    // The line below simulates a network delay and returns mock data.
    // This makes the app functional until the backend CORS issue is resolved.
    console.warn("Using mock candidate data due to backend CORS policy. The backend needs to be updated to allow requests from this origin.");
    return new Promise(resolve => setTimeout(() => resolve(mockCandidates), 1000));
    
    /*
    // --- LIVE API CALL (Currently Blocked by CORS) ---
    // Once the backend is updated with the correct CORS headers,
    // you can delete the mock data implementation above and uncomment this block.
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
    */
};