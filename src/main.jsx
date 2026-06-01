import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ProjectsProvider } from "./context/ProjectsContext";
import { SkillsProvider } from "./context/SkillsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProjectsProvider>
      <SkillsProvider>
        <App />
      </SkillsProvider>
    </ProjectsProvider>
  </React.StrictMode>
);
