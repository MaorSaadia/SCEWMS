import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = () => {
  const auth = useContext(AuthContext);

  const now = new Date();
  const currentHour = now.getHours();
  let greeting;

  if (currentHour > 5 && currentHour <= 12) {
    greeting = 'בוקר טוב';
  } else if (currentHour > 12 && currentHour <= 16) {
    greeting = 'צהריים טובים';
  } else if (currentHour > 16 && currentHour <= 20) {
    greeting = 'ערב טוב';
  } else {
    greeting = 'לילה טוב';
  }

  return (
    // <h1 className="ml">ברוך הבא</h1>
    <>
      {auth.isLoggedIn ? (
        <h1 className="ml">
          {greeting} {auth.userName.split(' ')[0]}
        </h1>
      ) : (
        <h1 className="ml">ברוך הבא</h1>
      )}
    </>
  );
};

export default HomeScreen;
