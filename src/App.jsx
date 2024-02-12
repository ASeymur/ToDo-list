import ListWrapper from "./components/ListWrapper/ListWrapper";
import Title from "./components/Title/Title";

function App() {
  return (
    <div className="App">
      <Title className="title">My ToDo list</Title>
      <ListWrapper />
    </div>
  );
}

export default App;
