import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LandingPageSuspense from './LandingPage/LandingPageSuspense';
import { BrowserRouter, Link, createBrowserRouter } from 'react-router-dom';
import "@fontsource/source-sans-pro";
import "@fontsource/source-sans-pro/300.css";
import "@fontsource/source-sans-pro/400.css";
import "@fontsource/source-sans-pro/700.css";
import "@fontsource/source-sans-pro/400-italic.css";
import MyProvider from './AppContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const LazyLoadApp = React.lazy(() => import('./App'));


root.render(
  <MyProvider>
    <BrowserRouter>
      <Suspense fallback={<LandingPageSuspense />}>
        <LazyLoadApp />
      </Suspense>
    </BrowserRouter>
  </MyProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
