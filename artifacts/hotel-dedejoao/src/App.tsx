import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Reserva from "@/pages/Reserva";
import Dashboard from "@/pages/Dashboard";
import Gerenciar from "@/pages/Gerenciar";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard/gerenciar" component={Gerenciar} />
        <Route path="/dashboard" component={Dashboard} />
        <Route>
          <Navbar />
          <main>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/reserva" component={Reserva} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </Route>
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
