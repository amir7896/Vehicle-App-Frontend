import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-400 text-white py-4 fixed bottom-0">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Auto Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
