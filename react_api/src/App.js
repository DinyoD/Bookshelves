import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

function App() {
  return (
    <div className="container">
        <Header />
        <Body pageName='Bookshelves'/>
        <br/>
        <Footer />
    </div>
  );
}

export default App;
