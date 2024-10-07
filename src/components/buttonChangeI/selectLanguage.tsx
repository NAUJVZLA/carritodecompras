import Cookies from "js-cookie";
import { useRouter } from "next/navigation"
export default function SelectLanguages() {
    const router = useRouter();
    const handleLanguage = (language: string) => {
        Cookies.set("locale", language);
        router.refresh()
    };

    return (
        <>
            <button onClick={() => handleLanguage("es")}>
                Español
            </button>
            <button onClick={() => handleLanguage("en")}>
                English
            </button>

        </>
    );
}
