import Search from "./Search";
import Logo from "./Logo";
import NumofResults from "./Numofresults";

function Navbar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumofResults />
    </nav>
  );
}

export default Navbar;
