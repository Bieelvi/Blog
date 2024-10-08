import { useForm, usePage } from "@inertiajs/react";
import TextInput from "./TextInput";
import PrimaryButton from "./PrimaryButton";

export default function SearchInput({ className = '' }) {
    const { localeData } = usePage().props;
    const { translate } = localeData;

    const { data, setData, get, processing } = useForm({
        search: ''
    });

    const submit = (e) => {
        e.preventDefault();

        get(route('posts.search'));
    };

    return (
        <div className={className}>
            <form onSubmit={submit}>
                <div className="flex gap-1">
                    <TextInput
                        id="search"
                        type="text"
                        name="search"
                        value={data.search}
                        className="block w-full"
                        placeholder={translate["Search post"]}
                        required
                        onChange={(e) => setData('search', e.target.value)}
                    />

                    <div className="flex justify-center items-center">
                        <PrimaryButton disabled={processing}>
                            <svg width="17px" height="17px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <title>{translate["Search"]}</title>
                                <path 
                                    d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" 
                                    stroke="#000000" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" />
                            </svg>
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </div>
    );
}