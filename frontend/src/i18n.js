import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "product_details": "Product Details",
      "safety_advisor": "AI Safety Advisor",
      "ask_question": "Ask a safety or compatibility question...",
      "send": "Send",
      "compatible": "Compatible",
      "not_compatible": "Not Compatible",
      "unknown": "Unknown"
    }
  },
  ar: {
    translation: {
      "product_details": "تفاصيل المنتج",
      "safety_advisor": "مستشار السلامة بالذكاء الاصطناعي",
      "ask_question": "اطرح سؤالاً عن السلامة أو التوافق...",
      "send": "إرسال",
      "compatible": "متوافق",
      "not_compatible": "غير متوافق",
      "unknown": "غير معروف"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
