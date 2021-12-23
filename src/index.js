import React from "react";
import ReactDOM from "react-dom";

import Root from './routes/root';
import reportWebVitals from './reportWebVitals';
import SearchContextProvider from './context/searchContext';
import RoomContextProvider from './context/roomContext';
import RoomListProvider from './context/managerRoomContext';
import RentalContextProvider from './context/rentalContext';
import UserContextProvider from './context/userContext';
import HeaderContextProvider from './context/headerContext';
import NotificationProvider from "./context/notificationContext";
import FeedbackContextProvider from "./context/feedbackContext";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ScrollToTop from "./scrollToTop";
ReactDOM.render(
    <UserContextProvider>
      <NotificationProvider>
        <HeaderContextProvider>
            <RentalContextProvider>
              <FeedbackContextProvider>
                <RoomListProvider>
                    <RoomContextProvider>
                        <SearchContextProvider>
                          <Root />
                        </SearchContextProvider>
                    </RoomContextProvider>
                </RoomListProvider>
              </FeedbackContextProvider>
            </RentalContextProvider>
        </HeaderContextProvider>
      </NotificationProvider>
    </UserContextProvider>,
    document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
