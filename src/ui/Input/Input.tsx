import { ComponentProps } from "react";
type Props = {
    type? : string,
} & ComponentProps<'input'>;

export const Input = ({type = 'text', ...rep} : Props) => {
    return(
        <input 
            type={type} 
            className="px-2 py-1 rounded text-yellow-50 placeholder:text-yellow-50"
            {...rep}
        ></input>
    );
};
