import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Toaster } from "react-hot-toast";
import FormComponent from "./components/From";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex justify-center items-center bg-slate-700 text-white">
        <FormComponent />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
