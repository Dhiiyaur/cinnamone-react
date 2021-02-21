import './App.css';
import Navbar from "./component/Navbar";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import Home from "./component/Home";
import Product from "./component/Product";
import OrderSummary from "./component/OrderSummary";
import Checkout from "./component/Checkout";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"



function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product/:productName" exact component={Product} />
          <Route path="/order-summary/" exact component={OrderSummary} />
          <Route path="/checkout/" exact component={Checkout} />
          <Route path="/auth/signin" exact component={SignIn} />
          <Route path="/auth/signup" exact component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
