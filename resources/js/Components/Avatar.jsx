export default function Avatar({ user }) {
    return (
        <img
            className="mr-4 w-8 rounded-full"
            src={user.avatar ? `/storage/${user.avatar}` : '/storage/default-avatar.png'}
            alt={user.name}
        />
    );
}
