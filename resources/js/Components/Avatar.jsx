export default function Avatar({ user, className = 'mr-4 w-8' }) {
    return (
        <img
            className={`rounded-full ${className}`}
            src={user.avatar ? `/storage/${user.avatar}` : '/storage/default-avatar.png'}
            alt={user.name}
        />
    );
}
