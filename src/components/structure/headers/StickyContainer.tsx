import * as React from "react";
import { Placeholder } from "../../../containers/Placeholder";
import { PlaceholderProps } from "../../Placeholder";
import Rendering from "../../../types/macaw/Rendering";


interface IStickyProps extends Rendering {
    placeholders: PlaceholderProps[];
}

const StickyContainer: React.SFC<IStickyProps> = (props) => {
    return (
        <div className="o-header-sticky">
            <Placeholder
                children={props.children}
                placeholders={props.placeholders}
                placeholderIndex={0}
            />
        </div>
    );
};

export default StickyContainer;
