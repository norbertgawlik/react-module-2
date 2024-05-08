import ReactDOM from 'react-dom/server';
import { useState, cloneElement, type ReactNode, type ChangeEventHandler, type ReactElement} from "react";
import { Button, Text, Header, Input } from "../../ui";

type ComponentMap = {
    [key : string ] : ReactNode;
};

export const Generator = () => {
    const [selectedOption,setSelectedOption] = useState<string>('');
    const [selectedComponent,setSelectedComponent] = useState<ReactNode | null>(null);
    const [textValue,setTextValue] = useState<string>('Lorem ipsum');

    const componentsMap : ComponentMap = {
        Button : <Button className="text-cyan-200 bg-cyan-700 border-cyan-200 hover:border-cyan-200" label="Click me!"/>,
        Text : <Text className="text-sm text-red-200">{textValue}</Text>,
        Header : <Header className="text-3xl">Szkoła Reacta 2.0</Header>
    };

    const handleCopy = async () : Promise<void> => {
        let code = ReactDOM.renderToString(selectedComponent);
        if (selectedOption === 'Text') {
            code = code.replace(/>.*</, `>${textValue}<`);
        }
        try{
            await navigator.clipboard.writeText(code);
            alert('Copied to clipboard!');
        }catch(e){
            console.log(e);
        }
    };

    const handleSelectChange : ChangeEventHandler<HTMLSelectElement> = (e) => {
        const val = e.target.value;
        setSelectedOption(val);
        setSelectedComponent(componentsMap[val]);
    };

    const handleInputChange : ChangeEventHandler<HTMLInputElement> = (e) => {
        const val = e.target.value;
        setTextValue(val);

        const clonedTextComponent = cloneElement(selectedComponent as ReactElement, { children: val });
        setSelectedComponent(clonedTextComponent);
    };

    return(
        <>
            <div>
                <select className="py-2 px-2 rounded" onChange={handleSelectChange}>
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

                {selectedOption === "Text" ? 
                    <div>
                        <Input label="Change text" name="change" value={textValue} onChange={handleInputChange}/>
                    </div> : null
                }

                <Button className="text-emerald-100 bg-emerald-600 border-emerald-500 hover:border-emerald-500" label="Copy code" onClick={handleCopy}></Button>
            </div> : null}
        </>
    );
};
