import React from "react";

function Layout({ children }) {
  return (
    <div className="main-content">
      <div className="content-wrapper">{children}</div>
    </div>
  );
}

export default Layout;
