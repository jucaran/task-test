import "./styles/globals.css";
import { TaskProvider } from "./providers/TasksProvider";
import { AuthProvider } from "./providers/AuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <TaskProvider>
        <Component {...pageProps} />
      </TaskProvider>
    </AuthProvider>
  );
}

export default MyApp;
