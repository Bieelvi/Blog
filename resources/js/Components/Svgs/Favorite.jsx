export default function Favorite({ text = 'Unfavorite' }) {
    return (
        <svg width="25px" height="25px" fill="rgb(79 70 229)" viewBox="-5.5 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>{text}</title>
            <path d="m0 2.089v21.912l6.546-6.26 6.545 6.26v-21.912c-.012-1.156-.952-2.089-2.109-2.089-.026 0-.051 0-.077.001h.004-8.726c-.022-.001-.047-.001-.073-.001-1.158 0-2.098.933-2.109 2.088v.001z" />
        </svg>
    );
}