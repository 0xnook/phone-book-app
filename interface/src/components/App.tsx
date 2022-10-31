import PhoneBook from './PhoneBook';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <PhoneBook/>
      </QueryClientProvider>
    </div>
  );
}

export default App;

