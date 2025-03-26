import React from "react";
import Sidebar from "../../UI/Sidebar/Sidebar"; // Import Sidebar component

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar onCompose={() => alert("Compose email clicked!")} />
      
      {/* Main Content */}
      <div style={{ 
        marginLeft: "250px", 
        paddingTop: "60px",  // Adjust for navbar height
        width: "100%", 
        minHeight: "100vh" 
      }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;