import { Provider } from 'react-redux';

import Product from './Components/Product/product';
import store from './Redux/Store/Store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Product />
      </div>
    </Provider>
  );
}

export default App;
