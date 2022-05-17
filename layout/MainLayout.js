import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import AppFooter from "./AppFooter";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-80vh">
        <ToastContainer />
        {children}
      </main>
      <AppFooter />
    </>
  );
}
