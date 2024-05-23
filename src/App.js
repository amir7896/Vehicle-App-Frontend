import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";

import Routing from "./routing/Routing";
import { ProvideAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ProvideAuth>
          <Routing />
        </ProvideAuth>
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
};

export default App;
