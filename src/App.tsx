import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
import AppRoutes from "./routes/Route";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
