/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

import { useTranslation } from "react-i18next";

// import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { AuthProvider } from "../hooks/use-auth";
import { Suspense } from "react";
export function Layout() {
  const { i18n } = useTranslation();
  return (
    <AuthProvider>
      <Helmet
        titleTemplate="%s - Safiyo"
        defaultTitle="Safiyo"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Safiyo 2.0" />
      </Helmet>

      <Suspense fallback={"Loading..."}>
        <Outlet />
      </Suspense>
    </AuthProvider>
  );
}
