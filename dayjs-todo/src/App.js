import Calendar from "./components/Calendar";
import '../src/scss/style.scss';

function App() {
  return (
    <>
      <h1 style={{textAlign:"center","fontSize":"20px",paddingTop:"20px"}}>치맥녀의 투두리스트</h1>
      <Calendar/>
    </>
  );
}

export default App;
