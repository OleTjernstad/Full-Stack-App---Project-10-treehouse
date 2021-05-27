import { server } from './api/server';
function App() {
    const test = async () => {
        console.log(await server.get());
    };
    test();

    return <div className="App"></div>;
}

export default App;
