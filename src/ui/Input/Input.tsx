import { ComponentPropsWithRef, forwardRef, type Ref} from "react";
type Props = {
    type? : string,
    label : string
} & ComponentPropsWithRef<'input'>;

export const Input = forwardRef(
    ({type = 'text', label, name, ...rep} : Props, ref : Ref<HTMLInputElement>) => {
    return(
        <>
        <div className="my-3">
            <label 
                className="text-xs text-gray-500 text-left block mb-1 cursor-pointer" 
                htmlFor={name}>
                {label}:
            </label>
            <input 
                id={name}
                type={type}
                ref={ref}
                className="px-2 py-1 block rounded text-yellow-50 placeholder:text-yellow-50"
                {...rep}
            ></input>
        </div>
        </>
    );
});
