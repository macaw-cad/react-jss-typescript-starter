import * as React from 'react';
import { Teaser } from '../../types/macaw/features/FeatureTypes';
import PictureComponent from '../../containers/Picture/PictureComponent';
import { CustomStyleParametersProps } from '../../types/CustomStyle';
import { joinClasses } from '../../utils/Filters';
import CustomStyle from '../../containers/CustomStyle';
import Heading from '../../containers/Heading';

interface TeaserProps extends Teaser {
    parameters: any;
    fields: any;
}
class ImageTeaser extends React.Component<TeaserProps> {
    render() {
        const {parameters, image, link, title} = this.props.fields;
        const picture = (image ? <PictureComponent {...image} /> : (null));

        const imageTeaserClassName = joinClasses(
            "m-image-teaser",
            parameters && parameters.className ? parameters.className : undefined,
        );

        const processedParameters = { ...parameters } as CustomStyleParametersProps;
        processedParameters.className = imageTeaserClassName;

        console.log('ImageTeaser', this.props);

        return (
            <CustomStyle {...processedParameters}>
                <Heading
                    level={parameters && parameters.heading ? parameters.heading : undefined}
                >
                    {link ?
                        <a
                            href={link && link.value ? link.value.href : undefined}
                            title={link && link.value ? link.value.text : undefined}
                        >
                            {picture}
                        </a>
                        : picture
                    }
                </Heading>
            </CustomStyle>
        )
    }
}

export default ImageTeaser;