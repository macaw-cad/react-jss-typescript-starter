import * as React from 'react';

import LazyLoad from 'react-lazy-load';
import CustomStyle from '../CustomStyle';
import Image from '../../types/Image';

const PictureComponent: React.SFC<Image> = (props) => {
    const { sizes, alt, cssDisplay = "inline-block", isDraggable, default: src, aspectRatio = "" } = props;

    // (min-width: 465px)
    const breakpoints = {
        XL: '(min-width: 1366px)',
        L: '(min-width: 960px)',
        M: '(min-width: 768px)',
        S: '(min-width: 576px)',
        XS: '(max-width: 575px)',
    };

    const getMediaMapping = (value: string) => {
        return (sizes && sizes[value]) ? breakpoints[value] : null;
    };

    const Picture = () => (
        <CustomStyle {...props.parameters}>
            <picture>
                {
                    sizes ?
                        Object.keys(breakpoints).map((key, index) => {
                            const media = getMediaMapping(key);
                            return (
                                (media) ? <source key={index} media={media} srcSet={sizes[key]} /> : null
                            );
                        },
                        )
                        : null
                }
                <img
                    className={aspectRatio === '' ? '' : 'a-picture__image'}
                    src={src}
                    alt={alt}
                    draggable={isDraggable}
                />
            </picture>
        </CustomStyle>
    );

    if (aspectRatio === '') {
        return (
            <div style={{ display: cssDisplay }}>
                <Picture />
            </div>);
    } else {
        return (
            <div className="a-picture" style={{ display: cssDisplay }}>
                <div className="a-picture__ratio" style={{ paddingTop: aspectRatio }} />
                <LazyLoad offset={1000}>
                    <Picture />
                </LazyLoad>
            </div>
        );
    }
};

export default PictureComponent;
