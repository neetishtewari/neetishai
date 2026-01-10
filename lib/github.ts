export type FeedItem = {
    id: string;
    type: string;
    title: string;
    date: string;
    description: string;
};

export async function fetchGitHubActivity(): Promise<FeedItem[]> {
    try {
        const response = await fetch('https://api.github.com/users/neetishtewari/events/public', {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            console.warn('Failed to fetch GitHub data');
            return [];
        }

        const events = await response.json();

        // Filter and map events
        const activities: FeedItem[] = events
            .slice(0, 5) // Last 5 events
            .map((event: any) => {
                let title = '';
                let description = '';
                let type = 'GitHub';

                if (event.type === 'PushEvent') {
                    title = `Pushed to ${event.repo.name}`;
                    description = event.payload.commits?.[0]?.message || 'Committed code';
                } else if (event.type === 'CreateEvent') {
                    title = `Created ${event.payload.ref_type} in ${event.repo.name}`;
                    description = 'Started something new';
                } else if (event.type === 'WatchEvent') {
                    title = `Starred ${event.repo.name}`;
                    description = 'Found an interesting project';
                } else {
                    title = `Activity on ${event.repo.name}`;
                    description = event.type.replace('Event', '');
                }

                return {
                    id: event.id,
                    type,
                    title,
                    date: new Date(event.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
                    description,
                };
            });

        return activities;
    } catch (error) {
        console.error('Error fetching GitHub activity:', error);
        return [];
    }
}
