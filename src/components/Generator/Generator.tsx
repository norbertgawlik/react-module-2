import ReactDOM from 'react-dom/server';
import { ChangeEvent, ReactNode, useState } from "react";
import { Button, Text, Header } from "../../ui";

type ComponentMap = {
    [key : string ] : ReactNode;
};

const componentsMap : ComponentMap = {
    Button : <Button className="text-cyan-200 bg-cyan-700 border-cyan-200 hover:border-cyan-200" label="Click me!"/>,
    Text : <Text className="text-sm">Lorem Ipsum</Text>,
    Header : <Header className="text-3xl">Szkoła Reacta 2.0</Header>
};

export const Generator = () => {
    const [selectedOption,setSelectedOption] = useState<string>('');
    const [selectedComponent,setSelectedComponent] = useState<ReactNode>(null);

    const handleCopy = async () : Promise<void> => {
        const code = ReactDOM.renderToString(selectedComponent);
        try{
            await navigator.clipboard.writeText(code);
            alert('Copied to clipboard!');
        }catch(e){
            console.log(e);
        };
    };

    const handleChange = (e : ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setSelectedOption(val);
        setSelectedComponent(componentsMap[val]);
    };

    return(
        <>
            <div>
                <select className="py-2 px-2 rounded" onChange={handleChange}>
                    <option value="">Select Component</option>
                    {Object.keys(componentsMap).map(e=>(
                        <option key={e} value={e}>{e}</option>
                    ))};
                </select>
            </div>
            {selectedOption ?
            <div className="border border-dashed my-3 p-2">
                <Text className="text-sm">Selected Component:</Text>
                <Text className="mb-2 font-semibold">{selectedOption}</Text>
                <div className="border border-dashed m-2 p-2">
                    <Text className="text-sm text-gray-500">Preview:</Text>
                    <div>{selectedComponent}</div>
                </div>
                <Button className="text-emerald-100 bg-emerald-600 border-emerald-500 hover:border-emerald-500" label="Copy code" onClick={handleCopy}></Button>
            </div> : null}
        </>
    );
};
