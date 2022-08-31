import { Footer, Loader, Navbar, Services, Transactions, Welcome } from './components';

const App = () => (
  <div class='min-h-screen'>
    <div className='gradient-bg-welcome'>
      <Navbar />
      <Welcome />
    </div>
    <Services />
    <Transactions />
    <Footer />
  </div>
);

export default App;