import { Heading } from '@chakra-ui/react';
import './App.css';
import { Layout } from './components/Layout';
import { PackagesTable } from './components/Table/PackagesTable';

function App() {
  return (
    <Layout>
      <Heading>Furgonetka infinite scroll demo</Heading>
      <PackagesTable />
    </Layout>
  );
}

export default App;
