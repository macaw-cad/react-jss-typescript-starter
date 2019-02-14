const request = require('request');
const config = require('./scjssconfig.json');
const routes = require('./routeconfig.json');
const yaml = require('write-yaml');
const term = require('terminal-kit').terminal;

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
                if(typeof val !== 'undefined') {
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