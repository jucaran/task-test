import "../styles/globals.css";
import { TaskProvider, TasksProvider } from "./providers/TasksProvider";

function MyApp({ Component, pageProps }) {
  return (
    <TaskProvider>
      <Component {...pageProps} />
    </TaskProvider>
  );
}

export default MyApp;
