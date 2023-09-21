import Navbar from "../components/Navbar";
import Description from "../layout/dragAndDrop/Description";
import Draggable from "../layout/dragAndDrop/Draggable";

function Home() {
  return (
    <>
      <Navbar />
      <section>
        <Description />
        <Draggable />
      </section>
    </>
  );
}

export default Home;
