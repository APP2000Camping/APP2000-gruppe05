// Skrevet av Jesper fra i18Nexus

import {i18nRouter} from 'next-i18n-router';
import i18Config from './i18Config';

export function middleware(request) {
    return i18nRouter(request, i18Config);
}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)'
};