import { useFieldArray, useForm , type SubmitHandler, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input } from "../../ui";
import { reactHookFormSchema, type ReactHookFormData } from "./types";

export const DynamicForm = () => {

    const { register, control, handleSubmit, formState: { errors }} = useForm<ReactHookFormData>({
        resolver : zodResolver(reactHookFormSchema)
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name : 'hobby'
    })

    const handleFormSubmit : SubmitHandler<ReactHookFormData> = (data) => {
        console.log(data);
    };

    return(
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Input 
                label="Firstname"
                {...register("firstname",{required : true})}
            />
            {errors.firstname && <p className="text-red-500">{errors.firstname.message}</p>}
            <Input 
                label="Surname"
                {...register("surname")}
            />
            {errors.surname && <p className="text-red-500">{errors.surname.message}</p>}

            <div>
                <label>Hobbies</label>
                {fields.map((field,index)=>(
                    <div key={field.id}>
                        <input
                            {...register(`hobby.${index}.name` as const)}
                            defaultValue={field.name}
                        />
                        <Button type="button" onClick={()=>remove(index)} label="X"/>
                    </div>
                ))}
                <Button type="button" onClick={()=>append({name:''})} label="add new hobby"/>
            </div>

            <Button label="Send" type="submit"/>
        </form>
    )
};