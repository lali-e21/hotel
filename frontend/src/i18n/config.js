import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            nav: {
                home: "Home",
                rooms: "Rooms",
                gallery: "Gallery",
                services: "Services",
                contact: "Contact",
                book_now: "Book Now"
            },
            hero: {
                title: "Experience Luxury in the Heart of Addis Ababa",
                subtitle: "Sunrise Grand Hotel offers world-class hospitality with a touch of Ethiopian warmth.",
                cta: "Explore Rooms"
            },
            rooms: {
                title: "Our Luxurious Rooms",
                view_details: "View Details",
                price_per_night: "per night",
                amenities: "Amenities",
                size: "Size"
            }
        }
    },
    am: {
        translation: {
            nav: {
                home: "መነሻ",
                rooms: "ክፍሎች",
                gallery: "ጋለሪ",
                services: "አገልግሎቶች",
                contact: "እውቂያ",
                book_now: "አሁኑኑ ይያዙ"
            },
            hero: {
                title: "በአዲስ አበባ እምብርት የቅንጦት ልምድ",
                subtitle: "ሰንራይዝ ግራንድ ሆቴል በኢትዮጵያዊ ሙቀት ዓለም አቀፍ መስተንግዶን ያቀርባል።",
                cta: "ክፍሎችን ያስሱ"
            },
            rooms: {
                title: "የእኛ የቅንጦት ክፍሎች",
                view_details: "ዝርዝሮችን ይመልከቱ",
                price_per_night: "በአንድ ምሽት",
                amenities: "መገልገያዎች",
                size: "ስፋት"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
