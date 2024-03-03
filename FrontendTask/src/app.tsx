import * as React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePage from "./pages/profile";
import ListingPage from "./pages";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListingPage />} />
        <Route path="/profile/:email" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};
