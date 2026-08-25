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
    date_time: string;
}

async function fetchTimestamp(): Promise<number> {
    const response = await fetch('https://timeapi.io/api/v1/time/current/zone?timeZone=UTC', {
        next: {
            revalidate: 60,
            tags: ['data-cache']
        }
    });
    
    if (!response.ok) {
        throw new Error(`Failed to fetch timestamp: ${response.statusText}`);
    }
    
    const data = await response.json() as Timestamp;
    return new Date(data.date_time).getTime() / 1000;
}