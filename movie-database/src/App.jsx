import { useState } from "react";
import Button from "./components/Button";

import "./index.css";
function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <Button />
      </div>
    </>
  );
}

export default App;
