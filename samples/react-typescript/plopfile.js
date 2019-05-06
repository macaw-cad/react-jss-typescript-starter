module.exports = function (plop) {
    plop.setGenerator('jssClassComponent', {
        description: 'A JSS Class Component with props and state',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'JSS Class Component name:'
        }],
        actions: [
            {
                type: 'add',
                path: 'src/jsscomponents/{{properCase name}}/index.tsx',
                templateFile: 'plop-templates/JssClassComponent.tsx.hbs',
                force: true
            },
            {
                type: 'add',
                path: 'src/jsscomponents/{{properCase name}}/{{properCase name}}.props.ts',
                templateFile: 'plop-templates/JssComponent.props.ts.hbs',
                force: true
            },
            {
                type: 'add',
                path: 'sitecore/definitions/components/{{properCase name}}.sitecore.ts',
                templateFile: 'plop-templates/JssComponent.sitecore.ts.hbs',
                force: true
            }
        ]
    });

    plop.setGenerator('jssFunctionComponent', {
        description: 'A JSS Function Component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'JSS Function Component name:'
        }],
        actions: [
            {
                type: 'add',
                path: 'src/jsscomponents/{{properCase name}}/index.tsx',
                templateFile: 'plop-templates/JssFunctionComponent.tsx.hbs',
                force: true
            },
            {
                type: 'add',
                path: 'src/jsscomponents/{{properCase name}}/{{properCase name}}.props.ts',
                templateFile: 'plop-templates/JssComponent.props.ts.hbs',
                force: true
            },
            {
                type: 'add',
                path: 'sitecore/definitions/components/{{properCase name}}.sitecore.ts',
                templateFile: 'plop-templates/JssComponent.sitecore.ts.hbs',
                force: true
            }
        ]
    });
};