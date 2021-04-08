import Workbook from './modules/Workbook';
import WorkPlaces from './modules/WorkPlaces';
import Login from './modules/Login';

import Layout from './components/Layout';
import { useLoginAuth } from './contexts/LoginAuth';

import './App.css';

function App() {
  const [useDetails] = useLoginAuth();
 

  // if (!useDetails.role) {
  //   return <Login />;
  // }

  // return (
  //   <Layout title="Work places">
  //     <WorkPlaces />
  //   </Layout>
  // );
  return (
    <Layout title="New Workbook Entry">
      <Workbook />
    </Layout>
  );
}

export default App;
