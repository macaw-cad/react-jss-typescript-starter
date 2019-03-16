/* tslint:disable */

import * as React from 'react';

interface SFCPlaceholderProps {
    children?: React.ReactNode;
    placeholders?: PlaceholderProps[];
    name?: string;
    placeholderIndex?: number;
}

export interface PlaceholderProps {
    placeholderKey: string;
    placeholder: string;
    isDynamic: boolean;
    key?: any;
}

export class Placeholder extends React.Component<SFCPlaceholderProps, {}> {
    constructor(props: SFCPlaceholderProps) {
        super(props);
    }

    render() {
        if (this.props.placeholders) {
            return renderSitecorePlaceholders(this.props)
        } else if (this.props.children) {
            return renderReactPlaceholders(this.props)
        } else {
            return null
        }
    }
}

export class PrivatePlaceholder extends React.Component<any, {}> {
    displayName: string;

    constructor(props: any) {
        super(props);

        this.displayName = 'Placeholder';
    }

    render() {
        let self = this;
        console.log('RENDER');
        // If we have a props object called "placeholder" this is supplied by 
        // Sitecore so return the value in the placeholder key and ignore 
        // any of the static front end code in the file.

        if (this.props.hasOwnProperty('placeholder') && this.props.placeholder != null) {
            return this.renderSitecore();
        }
        
        return this.renderFED();
    }

    renderSitecore() {
        let self = this;
        return (
            <div className="placeholder__container" dangerouslySetInnerHTML={{ __html: this.props.placeholder}} />
        );
    }

    renderFED() {
        let self = this;

        console.log('RENDER FED');

        if (this.props.content) {
            // Todo: refactor for strict null checking
            let content: any = [];
            let fallbackToAll = true;

            if (typeof (this.props.content) === 'string') {
                return (<span>{this.props.content}</span>);
            }

            if (React.Children.count(this.props.content) > 0) {
                content = React.Children.map(this.props.content, (child, i) => {
                    let reactChild = child as React.ReactElement<any>;
                    if (reactChild.props.hasOwnProperty('placeholderKey')) {
                        if (reactChild.props.placeholderKey === self.props.placeholderKey) {
                            return child;
                        }
                    }
                });
            }

            if (content.length > 0) {
                return (
                    <div>{content}</div>
                );
            }

            return (<h2>No Content</h2>);
        }
        if (this.props.children) {
            let content: any = [];
            if (React.Children.count(this.props.children) > 0) {
                content = React.Children.map(this.props.children, (child, i) => {
                    let reactChild = child as React.ReactElement<any>;
                    if (reactChild.props.hasOwnProperty('placeholderKey')) {
                        if (reactChild.props.placeholderKey === self.props.placeholderKey) {
                            return child;
                        }
                    }
                });
            }

            if (content.length > 0) {
                return (
                    <div>{content}</div>
                );
            }

            return this.props.children;
        }

        return (
            <h2>No content</h2>
        )
    }
}
// Todo: refactor function for strict null check using type SFCPlaceholderProps
function renderSitecorePlaceholders({placeholders, children, name, placeholderIndex}: any) {
    const targetPlaceholder = placeholders.find((placeholder, index) => {
        if (name) {
            return placeholder.placeholderKey === name
        }
        if (typeof placeholderIndex !== 'undefined') {
            return index === placeholderIndex
        }
    })
        
    if (targetPlaceholder) {
        return ( <PrivatePlaceholder placeholderKey={targetPlaceholder.placeholderKey} isDynamic={targetPlaceholder.isDynamic} placeholder={targetPlaceholder.placeholder} /> )
    } else if (typeof name !== 'undefined' || typeof placeholderIndex !== 'undefined') {
        return null
    } else { 
        return placeholders.map((placeholder, index) => <PrivatePlaceholder placeholderKey={placeholder.placeholderKey} isDynamic={placeholder.isDynamic} placeholder={placeholder.placeholder} key={index} />)
    }
}

function renderReactPlaceholders({placeholders, children, name, placeholderIndex}: SFCPlaceholderProps) {
    if (!children) { return null };
    
    let returnOneChild = false;
    let returnChildren: React.ReactElement<any>[] = [];

    React.Children.forEach(children, (child, index) => {
        let reactChild = child as React.ReactElement<any>;
        let clonedChild = React.cloneElement(reactChild, {
            renderedbyplaceholder: 'true',
            key: index
        });

        // if a name or index is requested, only return this result
        if ((reactChild && reactChild.props && reactChild.props.name && name) && reactChild.props.name === name
                || typeof placeholderIndex !== 'undefined' && index === placeholderIndex) {
            returnOneChild = true;
            returnChildren = [];
            returnChildren.push(clonedChild);
        }

        if (!returnOneChild) {
            returnChildren.push(reactChild);
        }
    });

    // Okay, there are divs added here. This is done because React.NET also renders them. This way we keep both environments in sync.
    // The first div is added by the renderSitecore method in React. The second one is added by React.NET. This adds the id="react_*" attribute.
    if ((typeof name !== 'undefined' || typeof placeholderIndex !== 'undefined') && !returnChildren.length) {
        return null
    } else { 
        return <div className="placeholder__container">{returnChildren.map((child, index) => <div key={index} className="placeholder">{child}</div>)}</div>
    }
}
    
export const RenderReactPlaceholder = ({renderedbyplaceholder, children}) => {
    if (renderedbyplaceholder && renderedbyplaceholder === 'true' && React.Children.count(children) > 0) {
        return children
    } else {
        return null
    }
}