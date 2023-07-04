import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './RootLayout.css';

function RootLayout() {
  return (
    <div id="rootLayout">
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <h1>Where's Waldo</h1>
          <NavLink to="leaderboard">Leaderboard</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
