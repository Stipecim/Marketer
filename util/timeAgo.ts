export default function timeAgo(timestamp: any) {

    const now:any = new Date();
    const time:any = new Date(timestamp);
    const secondsAgo = Math.floor((now - time) / 1000);
    
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);

    if (secondsAgo < 60) {
        return `${secondsAgo}s ago`;
    } else if (minutesAgo < 60) {
        return `${minutesAgo}m ago`;
    } else if (hoursAgo < 24) {
        return `${hoursAgo}h ago`;
    } else {
        const remainingHours = hoursAgo % 24;
        return `${daysAgo}d ${remainingHours}h ago`;
    }
};