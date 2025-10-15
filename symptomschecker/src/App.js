import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Inputsum from "./components/Inputsum";
import History from "./components/History";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <Navbar onNavigate={setPage} />
      {page === "home" && <Inputsum />}
      {page === "history" && <History />}
    </>
  );
}

export default App;
