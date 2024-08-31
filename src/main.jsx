// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Ensure global styles are applied
import AgeContextProvider from './Context/Counter.jsx'; // Path to AgeContextProvider
import TokenContextProvider from './Context/Token.jsx'; // Path to TokenContextProvider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient,QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import CartContextProvider from './Context/CartContext.jsx';

// Render the application
let queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  < CartContextProvider>
    <QueryClientProvider client={queryClient}>
      <AgeContextProvider>
    <TokenContextProvider>
        <App />
    </TokenContextProvider>
      </AgeContextProvider>
   {/* <ReactQueryDevtools position='bottom-right' initialIsOpen={false}/> */}
      </QueryClientProvider>
      </CartContextProvider>
  // </StrictMode>
);
