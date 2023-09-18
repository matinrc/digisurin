"use client";
const { SessionProvider } = require("next-auth/react");
const React = require("react");

function Providers({ children }) {
  return React.createElement(SessionProvider, null, children);
}

module.exports = Providers;
