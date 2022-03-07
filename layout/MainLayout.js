import Navbar from "./Navbar";
import AppFooter from "./AppFooter";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-80vh">{children}</main>
      <AppFooter />
    </>
  );
}
