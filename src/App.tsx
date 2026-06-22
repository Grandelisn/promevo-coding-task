import LableTable from './components/table'
import { LabelContextProvider } from './contexts/label-context'
function App() {
  return (
    <LabelContextProvider>
      <section className='flex justify-center items-center my-auto h-screen'>
        <div>
          <LableTable />
        </div>
      </section>
    </LabelContextProvider>
  )
}

export default App
