
import { ReactNode, useState } from "react";
import Clocks from "./components/Clocks";
import Input from "./components/common/Input";
import InputResult from "./model/InputResult";
import A from "./components/A";

const components: Map <string, ReactNode> = new Map (
  [
    ['clocks', <Clocks></Clocks>],
    ['a', <A></A>],
  ]
)
const App: React.FC = () => {
const [componentName, setComponentName] = useState<string>('');

function submitFn (component: string): InputResult {
const res: InputResult = {status: "error", message: `${component} does not exist`}
if (components.has(component)) {
  res.status = 'success';
  res.message = '';
  setComponentName(component);
}
return res;
}

  return <div > 
      <Input submitFn={submitFn} placeholder="enter component name"></Input>
      {componentName && components.get(componentName)}
      </div>
    
}


export default App;