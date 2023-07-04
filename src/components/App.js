import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// pages
import NotFound from './Pages/NotFound/NotFound';
import Home from './Pages/Home/Home';
import Leaderboard, {
  leaderboardLoader,
} from './Pages/Leaderboard/Leaderboard';
import Game from './Pages/Play/Game';

// layouts
import RootLayout from '../Layouts/RootLayout/RootLayout';

// actions
import { winFormAction } from './WinForm/WinForm';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<NotFound />}>
      <Route index element={<Home />} />
      <Route path="game" action={winFormAction}>
        <Route
          path=":id"
          element={<Game />}
          errorElement={<NotFound />}
        ></Route>
      </Route>
      <Route
        path="leaderboard"
        element={<Leaderboard />}
        loader={leaderboardLoader}
      />
      <Route path="/notfound" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
