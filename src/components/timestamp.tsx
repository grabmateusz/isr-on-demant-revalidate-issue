export async function Timestamp() {
    const timestamp = await fetchTimestamp();

    return (
        <div>
            <p>Current API timestamp: {new Date(timestamp * 1000).toLocaleString()}</p>
            <p>Current server timestamp: {new Date().toLocaleString()}</p>
        </div>
    );
}

export type Timestamp = {
    timestamp: number;
}

async function fetchTimestamp(): Promise<number> {
    const response = await fetch('https://aisenseapi.com/services/v1/timestamp', {
        next: {
            tags: ['data-cache']
        }
    });
    
    if (!response.ok) {
        throw new Error(`Failed to fetch timestamp: ${response.statusText}`);
    }
    
    const data = await response.json() as Timestamp;
    return data.timestamp;
}