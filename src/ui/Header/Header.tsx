import { cn } from "../../utils/cn";
type Props = {
    children : string;
    className? : string;
}
export const Header = ({children,className} : Props) => {
    return(
        <h1 className={cn(className)}>{children}</h1>
    );
};