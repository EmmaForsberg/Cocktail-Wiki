import { Outlet } from "react-router-dom";
import { Header } from "./Header";

function App() {
  return (
    <>
      <Header />
      <Outlet /> {/* Här renderas sidan beroende på URL */}
    </>
  );
}

export default App;
