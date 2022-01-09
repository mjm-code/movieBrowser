import React, {useState, createContext} from 'react';
import './App.css';
import Layout from './Layouts/Layout';
import Pages from './Pages/Pages'

export const RootContext = createContext()

function App() {
  const [clearPage, setClearPage] = useState(false)
  const [amendBackgroundHeight, setAmendBH] = useState(false)
  return (
    <RootContext.Provider value={{clearPage, setClearPage, amendBackgroundHeight, setAmendBH}}>
      <Layout>
        <Pages/>
      </Layout>
    </RootContext.Provider>
  );
}

export default App;
