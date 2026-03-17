import { useEffect } from "react";
import Navbar from "./Navbar";

function AuthLayout({ children, showBack = false }) {
  useEffect(() => {
    // Apply auth background
    document.body.classList.add("auth-body");

    return () => {
      document.body.classList.remove("auth-body");
    };
  }, []);

  return (
    <>
      {/* Navbar with logo only */}
      <Navbar showBack={showBack} showLogin={false} />
      {/* Page content */}
      <div className="auth-layout">
        {children}
      </div>
    </>
  );
}

export default AuthLayout;
