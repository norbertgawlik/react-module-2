import { cn } from "../../utils/cn";

type Props = {
    children : string;
    className? : string;
};

export const Text = ({children, className} : Props) => {
    return(
        <p className={cn(className)}>{children}</p>
    );
};