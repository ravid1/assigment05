const AVAILABLE_LANGUAGES = ['english', 'spanish','Gay Ori'];

export default function LanguageService() {
    return new Promise((resolve, reject) => {
        return resolve(AVAILABLE_LANGUAGES);
    });
}