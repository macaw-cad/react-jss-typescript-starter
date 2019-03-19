const request = require('request');
const config = require('./scjssconfig.json');
const routes = require('./routeconfig.json');
const yaml = require('write-yaml');
const term = require('terminal-kit').terminal;
const fs = require('fs');
const path = require('path');

var progressBar, progress = 0;

const getRouteNames = (route) => {
    let arr = [];
    for (lang of route.lang) {
        arr.push(`${route.path} - ${route.lang}`);
    }
    if (route.routes) {
        for (subroute of route.routes) {
            let arr2 = getRouteNames(subroute);
            for (sr of arr2) {
                arr.push(sr);
            }
        }
    }
    return arr;
}

const processFields = (e) => {
    let f = {};
    Object.keys(e).forEach(p => {

        if (Array.isArray(e[p])) {
            let arr = [];
            for (ref of e[p]) {
                arr.push({
                    id: ref.id
                });
            }
            //f[p] = arr;
        }
        else {
            if (e[p].hasOwnProperty('fields')) {
                //f[p] = { id: e[p].id };
                let val = e[p].value;
                if (typeof val !== 'undefined') {
                    f[p] = e[p].value;
                }
                // else {
                //     f[p] = e[p].value;
                // }

            }
            else if (e[p].value.hasOwnProperty('linktype')) {
                delete e[p].value.id;
                f[p] = e[p].value;
            }
            else {
                f[p] = e[p].value;
            }
        }
    });
    return f;
}
const processPlaceHolders = (e) => {
    let f = {};
    Object.keys(e).forEach(p => {
        f[p] = processComponent(e[p])
    });

    return f;
}

const processComponent = (e) => {
    var arr = [];
    e.forEach(c => {
        let comp = {
            componentName: c.componentName
        };
        if (c.placeholders) {
            comp.placeholders = processPlaceHolders(c.placeholders)
        }
        if (c.fields && c.fields.data && c.fields.data.datasource) {
            let fields = {};
            // get datasource fields props
            for (prop in c.fields.data.datasource) {
                if (prop !== 'id' && prop !== 'name') {
                    //console.log(prop);
                    for (fieldprop in c.fields.data.datasource[prop]) {
                        if (typeof c.fields.data.datasource[prop][fieldprop] !== 'object') {
                            if (fieldprop === 'value') {
                                fields[prop] = c.fields.data.datasource[prop][fieldprop];
                                break;
                            }
                            else {
                                delete c.fields.data.datasource[prop].jss;
                                delete c.fields.data.datasource[prop].id;
                                delete c.fields.data.datasource[prop].definition;
                                fields[prop] = c.fields.data.datasource[prop];
                            }
                        }
                    }
                }
            }
            comp.fields = fields;
        }
        else if (c.fields) {
            comp.fields = processFields(c.fields)
        }
        arr.push(comp);
    });
    return arr;
}

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
            path: 'src/components/{{properCase name}}/index.tsx',
            templateFile: 'plop-templates/component.hbs',
            force: true
        },
        {
            type: 'add',
            path: 'sitecore/definitions/components/{{properCase name}}.sitecore.ts',
            templateFile: 'plop-templates/component.sitecore.hbs',
            force: true
        }]
    });

    const CommonFieldTypes = {
        "Single-Line Text": "SingleLineText",
        "Multi-Line Text": "MultiLineText",
        "Rich Text": "RichText",
        "Treelist": "ContentList",
        "Droptree": "ItemLink",
        "General Link": "GeneralLink",
        "Image": "Image",
        "File": "File",
        "Number": "Number",
        "Checkbox": "Checkbox",
        "Date": "Date",
        "Datetime": "DateTime"
    }

    function scaffoldTemplateManifest(template) {
        let fields = ``;
        let inherits = ``;
        let icon = ``;
        if (!template || !template.fields) {
            return '';
        }
        for (field of template.fields) {
            if(!field.fromModel) {
                if(CommonFieldTypes[field.type]) {
                    icon = "applicationsv2/32x32/document_plain_yellow.png";
                    fields += `\t\t\t\t\t\t\t{ id: '${field.id}', name: '${field.name}', type: CommonFieldTypes.${CommonFieldTypes[field.type]} },\n`;
                }                
            }
            else {
                icon = "apps/32x32/Umbrella.png";
                inherits += `\t\t\t\t\t\t\t'${field.templateId}', // ${field.templateName} \n`;
            }
        }
        const manifestTemplate = `// eslint-disable-next-line no-unused-vars
        import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';
        
        export default function(manifest) {
          manifest.addTemplate({
            name: '${template.Name}',
            id: '${template.ID}',
            icon: "${icon}",
            fields: [
${fields}\t\t\t\t\t\t],
            inherits: [
${inherits}\t\t\t\t\t\t],
          });
        }
      `;

        const templateManifestDefinitionsPath = 'sitecore/definitions/_templates';
        const exportVarName = template.Name.replace(/[^\w]+/g, '');
        const outputFilePath = path.join(
            templateManifestDefinitionsPath,
            `${exportVarName}.sitecore.js`
        );

        if (!fs.existsSync(templateManifestDefinitionsPath)) {
            fs.mkdirSync(templateManifestDefinitionsPath);
        }

        if (fs.existsSync(outputFilePath)) {
            //throw `Manifest definition path ${outputFilePath} already exists. Not creating manifest definition.`;
        }

        fs.writeFileSync(outputFilePath, manifestTemplate, 'utf8');

        return outputFilePath;
    }

    function scaffoldPlaceholdersManifest(placeholders) {
        if(placeholders.length === 0) return;
        let result = '';
        for (placeholder of placeholders) {
            result += `\t\t\t\t\t\t{ name: '${placeholder.name}', displayName: '${placeholder.displayName}', id: '${placeholder.id}' },\r`;
        }
        const manifestTemplate = `// eslint-disable-next-line no-unused-vars
        import { Manifest } from '@sitecore-jss/sitecore-jss-manifest';
        
        /**
         * Adding placeholders is optional but allows setting a user-friendly display name. Placeholder Settings
         * items will be created for any placeholders explicitly added, or discovered in your routes and component definitions.
         * Invoked by convention (*.sitecore.js) when \`jss manifest\` is run.
         * @param {Manifest} manifest
         */
        export default function addPlaceholdersToManifest(manifest) {
          manifest.addPlaceholder(
${result}
            // you can optionally pass a GUID or unique (app-wide) string as an ID
            // this will inform the ID that is set when imported into Sitecore.
            // If the ID is not set, an ID is created based on the placeholder name.
          );
        }        
      `;

      const placeholderManifestDefinitionsPath = 'sitecore/definitions';
        const exportVarName = '_placeholders';
        const outputFilePath = path.join(
            placeholderManifestDefinitionsPath,
            `${exportVarName}.sitecore.js`
        );

        if (!fs.existsSync(placeholderManifestDefinitionsPath)) {
            fs.mkdirSync(placeholderManifestDefinitionsPath);
        }

        if (fs.existsSync(outputFilePath)) {
            //throw `Manifest definition path ${outputFilePath} already exists. Not creating manifest definition.`;
        }

        fs.writeFileSync(outputFilePath, manifestTemplate, 'utf8');

        return outputFilePath;
    }

    function scaffoldComponentManifest(component) {
        let fields = ``;
        let placeholders = '';

        if (!component || !component.fields) {
            return '';
        }
        for (field of component.fields) {
            fields += `\t\t\t\t\t\t\t{ id: '${field.id}', name: '${field.name}', type: ${field.type} },\n`;
        }

        for (placeholder of component.placeholders) {
            placeholders += `\t\t\t\t\t\t\t'${placeholder.split('|')[0]}', // ${placeholder.split('|')[1]} \n`;
        }

        const manifestComponent = `// eslint-disable-next-line no-unused-vars
        import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';
        
        /**
         * Adds the ${component.name} component to the disconnected manifest.
         * This function is invoked by convention (*.sitecore.js) when 'jss manifest' is run.
         * @param {Manifest} manifest Manifest instance to add components to
         */
        export default function(manifest) {
          manifest.addComponent({
            id: '${component.id}',  
            name: '${component.name}',
            icon: '${component.icon}',
            displayName: '${component.displayName}',
            fields: [
${fields}           ],
            placeholders: [
${placeholders}           ]
          });
        }
      `;

        const componentManifestDefinitionsPath = 'sitecore/definitions/_components';
        const exportVarName = component.name.replace(/[^\w]+/g, '');
        const outputFilePath = path.join(
            componentManifestDefinitionsPath,
            `${exportVarName}.sitecore.js`
        );

        if (!fs.existsSync(componentManifestDefinitionsPath)) {
            fs.mkdirSync(componentManifestDefinitionsPath);
        }

        if (fs.existsSync(outputFilePath)) {
            //throw `Manifest definition path ${outputFilePath} already exists. Not creating manifest definition.`;
        }

        fs.writeFileSync(outputFilePath, manifestComponent, 'utf8');

        return outputFilePath;
    }

    plop.setGenerator('Templates', {
        description: 'Get Metadata from Sitecore',
        prompts: [],
        actions: function (data) {

            var uri = `${config.sitecore.layoutServiceHost}/sitecore/api/layout/render/umbrella?item=/&sc_lang=en&sc_apikey=${config.sitecore.apiKey}`;

            request(uri, { json: true }, (err, res, body) => {
                if (err) { return console.log(`-error-${err}`); }

                //task = thingsToDo.shift();
                //progressBar.startItem(task);

                let templates = body.sitecore.context.templates;
                let placeholders = body.sitecore.context.placeholders;
                let components = body.sitecore.context.renderings;
                for (template of templates) {
                    console.log(scaffoldTemplateManifest(template));
                }
                for (component of components) {
                    console.log(scaffoldComponentManifest(component));
                }

                console.log(scaffoldPlaceholdersManifest(placeholders));

                // Finish the task in...
                //setTimeout(done.bind(null, task), 500 + Math.random() * 1200);
            });

            return [];
        }
    });

    plop.setGenerator('Sync', {
        description: 'Syncing content from Sitecore',
        prompts: [

        ],
        actions: function (data) {


            var thingsToDo = getRouteNames(routes);
            var countDown = thingsToDo.length;
            var task = undefined;

            function done(task) {
                progressBar.itemDone(task);
                countDown--;

                // Cleanup and exit
                if (!countDown) {
                    setTimeout(function () { term('\n'); process.exit(); }, 200);
                }
            }

            var actions = [];

            progressBar = term.progressBar({
                width: 100,
                title: 'Importing from Sitecore:',
                eta: true,
                percent: true,
                items: thingsToDo.length
            });


            const processRoute = (route, parentRoute) => {
                if (!route) { return; }
                let parent = parentRoute || '';
                let currentRoute = (parent === '/') ? `/${route.path}` : `${parent}/${route.path}`;

                // process each language
                for (lang of route.lang) {

                    var uri = `${config.sitecore.layoutServiceHost}/sitecore/api/layout/render/jss?item=${currentRoute}&sc_lang=${lang}&sc_apikey=${config.sitecore.apiKey}`;

                    request(uri, { json: true }, (err, res, body) => {
                        if (err) { return console.log(`-error-${err}`); }

                        task = thingsToDo.shift();
                        progressBar.startItem(task);

                        var data = {
                            id: body.sitecore.route.itemId
                        };
                        data.fields = processFields(body.sitecore.route.fields);
                        data.placeholders = processPlaceHolders(body.sitecore.route.placeholders);
                        yaml.sync(`./data/routes${currentRoute}/${body.sitecore.route.itemLanguage}.yml`, data);

                        // Finish the task in...
                        setTimeout(done.bind(null, task), 500 + Math.random() * 1200);

                    });
                }

                // process underlying routes
                if (route.routes) {
                    for (subroute of route.routes) {
                        processRoute(subroute, currentRoute);
                    }
                }
            }


            processRoute(routes);

            return actions;
        }
    });
};