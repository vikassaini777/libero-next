import Nav from "./Nav";
import Navigation from "../Components/Navigation";

const Layout = (props) => (
  <div>
    <Navigation />
    <div> {props.children}</div>
  </div>
);

export default Layout;
