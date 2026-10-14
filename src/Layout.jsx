import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const organization = "DEEPMAG";

  return (
    <>
      <Header organization={organization} />
      <main>
        <Outlet />
      </main>
      <Footer organization={organization} />
    </>
  );
}