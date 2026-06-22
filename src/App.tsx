import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LableTable from './components/table'
import { LabelContextProvider } from './contexts/label-context'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LabelContextProvider>
        <section className='flex justify-center items-center my-auto h-screen'>
          <div>
            <LableTable />
          </div>
        </section>
      </LabelContextProvider>
    </QueryClientProvider>
  )
}

export default App
