import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
console.log("API URL:", import.meta.env.VITE_API_URL); // ✅ check here

createRoot(document.getElementById("root")!).render(<App />);
