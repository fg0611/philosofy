import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Header from "./Header.jsx";
import Home from "./Home.jsx";
import Gpt from "./Gpt.jsx";
import Quotes from "./Quotes.jsx";
// import PrinterList from "./Printers.jsx";
import Scanner from "./Scanner.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="gpt" element={<Gpt />} />
      <Route path="quotes" element={<Quotes />} />
      {/* <Route path="printers" element={<PrinterList />} /> */}
      <Route path="scanner" element={<Scanner />} />
    </Route>
  )
);

function App({ routes }) {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
