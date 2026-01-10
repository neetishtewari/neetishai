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

        // Map to group events by Repo Name
        const repoMap = new Map<string, { latestEvent: any; count: number }>();

        for (const event of events) {
            const repoName = event.repo.name;
            if (!repoMap.has(repoName)) {
                repoMap.set(repoName, { latestEvent: event, count: 1 });
            } else {
                repoMap.get(repoName)!.count++;
            }
        }

        // Convert grouped data to FeedItems
        const activities: FeedItem[] = Array.from(repoMap.values())
            .slice(0, 5) // Take top 5 active repositories
            .map(({ latestEvent, count }) => {
                const event = latestEvent;
                let title = '';
                let description = '';
                let type = 'GitHub';

                // Clean up repo name (remove username if present for cleaner display, optional but nice)
                // actually let's keep full name or just repo name depending on preference.
                // kept full name in previous version: event.repo.name

                if (event.type === 'PushEvent') {
                    title = `Pushed to ${event.repo.name}`;
                    const lastCommitMsg = event.payload.commits?.[0]?.message || 'Committed code';
                    if (count > 1) {
                        description = `${lastCommitMsg} (+${count - 1} more updates)`;
                    } else {
                        description = lastCommitMsg;
                    }
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
