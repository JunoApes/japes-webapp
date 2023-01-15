import { ColorModeScript } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";

import "@fontsource/kanit";
import "@fontsource/sigmar-one";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <ColorModeScript initialColorMode={"system"} />
    <App />
  </>
);
