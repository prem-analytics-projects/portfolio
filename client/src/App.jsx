import AppRoutes from "./routes/AppRoutes";
import ThemeProvider from "./app/providers/ThemeProvider";
import AuthProvider from "./app/providers/AuthProvider";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}
