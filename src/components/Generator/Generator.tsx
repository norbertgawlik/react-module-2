import { ChangeEvent, ReactNode, useState } from "react";
import { Button, Header, Text } from "../../ui";

type ComponentType = "Button" | "Header" | "Text";

const componentsMap : Record<ComponentType, ReactNode> = {
    Button : <Button className="bg-cyan-500" label="Click me" onClick={()=>{}}/>,
    Header : <Header className="">Szkoła Reacta 2.0</Header>,
    Text : <Text className="">Lorem ipsum</Text>
};

export const Generator = () => {
    const [selectedComponent,setSelectedComponent] = useState<ComponentType | null>(null);

    const handleChange = (e : ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value as ComponentType || null;
        val != null ? 
            setSelectedComponent(val) : 
            setSelectedComponent(null);
    };

    const handleCopy = () => {
        alert("Copied to clipboard");
    };

    return(
        <>
            <div>
                <select onChange={handleChange}>
                    <option value="">Select component</option>
                    {Object.keys(componentsMap).map((e,k) => (
                        <option key={k} value={e}>
                            {e}
                        </option>
                    ))}
                </select>
            </div>
            {selectedComponent ? 
                <div>
                    <Text>Selected Component</Text> 
                    <Text>{selectedComponent}</Text>
                    <Button onClick={handleCopy} label="Copy component code"></Button>
                </div> : 
                null
            }
        </>
    );
};