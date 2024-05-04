import { ComponentProps } from "react";
import { cn } from "../../utils/cn";

type Props = {
    label : string;
    className? : string;
} & ComponentProps<'button'>;

export const Button = ({label, className, ...ref} : Props) => {
    return(
        <button
            className={cn(
                "mt-2 mb-2 py-1.5 text-sm border transition ease-in hover:outline-none hover:opacity-85",
                className
            )}
            {...ref}>
                {label}
        </button>
    );
};