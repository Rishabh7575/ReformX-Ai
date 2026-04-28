import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-premium-100 text-premium-700 hover:bg-premium-200 transition-colors font-medium text-sm"
    >
      <Globe className="w-4 h-4" />
      {i18n.language === 'en' ? 'العربية' : 'English'}
    </button>
  );
}
