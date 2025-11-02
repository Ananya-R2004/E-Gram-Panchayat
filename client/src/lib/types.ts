// Interface for the data coming back from the /api/announcements endpoint
export interface Announcement {
    _id: string;
    title: string;
    content: string;
    date: string; // Stored as a string from the server (ISO date)
    postedBy: string; // The ID of the admin user who posted it
    createdAt: string;
    updatedAt: string;
}

// Interface for basic User data (used in context/state)
export interface User {
    _id: string;
    name: string;
    village: string;
    role: 'villager' | 'admin';
    email: string;
}

// Interface for User Profile (used in Dashboard, more detailed)
export interface UserProfile {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    village: string;
    role: 'villager' | 'admin';
}

// Interface for Village Data (used in VillagerDashboard)
export interface VillageData {
    villageName: string;
    population: number;
    contactPerson: string;
    projects: { 
        name: string;
        status: string;
        startDate: string;
    }[]; // Assuming projects are objects, not just strings
    // Add other fields as needed
}

// Example type for API error responses
export interface ApiError {
    message: string;
}
