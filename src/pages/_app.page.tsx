import type { AppProps } from "next/app";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/hoc/AuthGuard";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Layout from "@/components/Layout";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/utils/theme";
import "@/styles/globals.styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AuthGuard>
        <FavoritesProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </FavoritesProvider>
      </AuthGuard>
    </AuthProvider>
  );
}