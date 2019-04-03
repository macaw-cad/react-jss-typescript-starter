module.exports = function (plop) {

    // create your generators here
    //
    // plop.setGenerator('basics', {
    // 	description: 'this is a skeleton plopfile',
    // 	prompts: [], // array of inquirer prompts
    // 	actions: []  // array of actions
    // });

    plop.setGenerator('component', {
        description: 'application component logic',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'component name please'
        }],
        actions: [{
            type: 'add',
            path: 'src/jsscomponents/{{properCase name}}/index.tsx',
            templateFile: 'plop-templates/component.hbs',
            force: true
        },
        {
            type: 'add',
            path: 'sitecore/definitions/components/{{properCase name}}.sitecore.js',
            templateFile: 'plop-templates/component.sitecore.hbs',
            force: true
        }]
    });
};