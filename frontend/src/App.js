import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/ProductsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SendEmailScreen from './screens/SendEmailScreen';
import PersonalZone from './screens/PersonalZone';
import Contact from './screens/Contact';
import ProductsScreen from './screens/ProductsScreen';
import ProductsLst from './components/ProductScreen/ProductsLst';
import UserListScreen from './screens/UserListScreen';
import UpdatesProducts from './screens/UpdatesProducts';
import TrackingScreen from './screens/TrackingScreen';
import AboutUsScreen from './screens/AboutUsScreen'; // Import the AboutUsScreen component
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/authHook';
import CamersTypeScreen from './screens/CamersTypeScreen';
import RecordingTypeScreen from './screens/RecordingTypeScreen';
import Accessibility from './components/Accessibility';

const App = () => {
  const { token, login, logout, userId, userName, isAdmin, email, role } =
    useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userName: userName,
        isAdmin: isAdmin,
        email: email,
        role: role,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/search/:keyword" element={<ProductsScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/sendsmailscreen" element={<SendEmailScreen />} />
              <Route path="/personalZone" element={<PersonalZone />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/ProductsScreen" element={<ProductsScreen />} />
              <Route path="/CamersTypeScreen" element={<CamersTypeScreen />} />
              <Route
                path="/RecordingTypeScreen"
                element={<RecordingTypeScreen />}
              />

              <Route
                path="/CamerasScreen"
                element={<ProductsLst name="Camera" myProp="camera" />}
              />
              <Route
                path="/RecordingScreen"
                element={<ProductsLst name="Recording" myProp="recording" />}
              />
              <Route path="/admin/userslist" element={<UserListScreen />} />
              <Route path="/admin/tracking" element={<TrackingScreen />} />
              <Route
                path="/admin/UpdatesProducts"
                element={<UpdatesProducts />}
              />
              <Route path="/about" element={<AboutUsScreen />} /> 
            </Routes>
          </Container>
        </main>
        <Accessibility />
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
