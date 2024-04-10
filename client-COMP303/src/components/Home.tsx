import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Home = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl">Welcome to our Book Database</h1>
      <Link to="/book">
        <Button>Go to Book List</Button>
      </Link>
      <Link to="/member">
        <Button>Go to Member List</Button>
      </Link>
      <Link to="/publisher">
        <Button>Go to Publisher List</Button>
      </Link>
    </div>
  );
};

export default Home;
