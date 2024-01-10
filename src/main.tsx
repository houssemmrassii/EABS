import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const Index = () => {
  if (import.meta.env.DEV) {
    return <App />;
  } else {
    return (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Index />);
