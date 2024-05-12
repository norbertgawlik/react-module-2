import { ChangeEventHandler, useEffect, useState } from "react";
import { Input } from "../../ui";
import { FormRememberSchema, type FormRememberDataHistory } from "./types";
import { z } from "zod";


const autoFillInputSave = (key: keyof FormRememberDataHistory, value: FormRememberDataHistory) => {
    const date = new Date();
    const formatDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
    const save = {
        [key] : value[key],
        time : formatDate
    };
    localStorage.setItem(key, JSON.stringify(save));
};

const autoFillInputLoad = (key:string) => {
    if(localStorage.getItem(key) == null) return;
    return JSON.parse(localStorage.getItem(key) || '');
};

export const FormRemember = () => {
    const [inputVal,setInputValue] = useState<FormRememberDataHistory>({firstname:'',time:''});
    const [errorInput,setErrorInput] = useState<string | null>(null);
     
    const handleChange : ChangeEventHandler<HTMLInputElement> = (e) => {
        const val = e.target.value;
        const id = e.target.id
        setInputValue(prev =>{
            const newState = {...prev,[id]:val};
            try{
                FormRememberSchema.parse(newState);
                setErrorInput(null);
                autoFillInputSave(id as keyof FormRememberDataHistory,newState);
            }catch(error){
                if(error instanceof z.ZodError){
                    setErrorInput(error.errors[0].message);
                }
            }
            return newState;
        });
    };

    useEffect(()=>{
        const history = autoFillInputLoad('firstname');
        if(typeof history === "undefined") return;
        setInputValue(history);
    },[]);

    return(
        <>
            <form>
                <Input 
                    name="firstname" 
                    label="Firstname" 
                    onChange={handleChange}
                    value={inputVal.firstname}
                />
                <p>val: {inputVal.firstname} {errorInput && <span className="text-red-300">{errorInput}</span>}</p>
                <p>time: {inputVal.time}</p>
            </form>
        </>
    );
};