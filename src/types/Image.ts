import { CustomStyleParametersProps } from "./CustomStyle";

export default interface Image {
    alt: string | undefined;
    default: string;
    sizes?: {
        [key: string]: string;
    };
    type?: string;
    parameters?: CustomStyleParametersProps;
    cssDisplay?: string;
    isDraggable?: boolean;
    aspectRatio?: string;
}
