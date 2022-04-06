import { Suspense } from "react";
import stores from "./store/stores";
import Navbar from "./components/Navbar";
import MainApp from "./sections/MainApp";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

const renderLoader = () => <p></p>;

const App = () => {
  const queryClient = new QueryClient();
  return (
    <Suspense fallback={renderLoader()}>
      <ReduxProvider store={stores}>
        <QueryClientProvider client={queryClient}>
          <>
            <div className="main_cover">
              <div className="container">
                <Navbar />
                <MainApp />
              </div>
            </div>
          </>
        </QueryClientProvider>
      </ReduxProvider>
    </Suspense>
  );
};

export default App;
