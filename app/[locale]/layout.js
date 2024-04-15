import { Inter } from 'next/font/google'
import './globals.css';
import NavBar from '../components/nav-bar';
import Footer from '../components/footer';
import {Providers} from "./providers";
import initTranslations from '../i18n';
import TranslationsProvider from '../components/TranslationsProvider';

const inter = Inter({ subsets: ['latin'] })
const i18nNamespaces = ['Home', 'Common'];

export const metadata = {
  title: 'Camping nettside',
  description: 'Generated by create next app',
}

export default async function RootLayout ({ params:{locale}}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  
  
  return (
    <html>
      <body className={inter.className}>
        <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
        <NavBar />
        </TranslationsProvider>
        <Footer />
      </body>
    </html>
    
  );
}
