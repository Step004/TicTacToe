import { lazy, Suspense } from "react";
import Layout from "../Layout/Layout";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import GamePage from "../../pages/GamePage/GamePage";
import RestrictedRout from "../RestrictedRout/RestrictedRout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import GamePageWithFriend from "../../pages/GamePageWithFriend/GamePageWithFriend";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const ContactsPage = lazy(() =>
  import("../../pages/ContactsPage/ContactsPage")
);


const firstTime = Date.now();

function App() {
  return (
    <Layout firstTime={firstTime}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRout
                component={<RegisterPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRout
                component={<LoginPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
            }
          />

          {/* <Route path="/contacts" element={<ContactsPage />} /> */}
          {/* <Route path="/game" element={<GamePage />} /> */}
          <Route
            path="/game"
            element={
              <PrivateRoute component={<GamePage />} redirectTo="/login" />
            }
          />
          <Route
            path="/gameFriend"
            element={
              <PrivateRoute
                component={<GamePageWithFriend />}
                redirectTo="/login"
              />
            }
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
