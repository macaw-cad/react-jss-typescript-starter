module.exports = function (plop) {

    const fs = require('fs');
    const chalk = require('chalk');
    const crypto = require('crypto');
    process.chdir(plop.getPlopfilePath());

    const toBase64 = (text) => {
        if (!text) return null;
        let buff = new Buffer(text);
        return buff.toString('base64');
    }
    const fromBase64 = (text) => {
        if (!text) return null;
        let buff = new Buffer(text, 'base64');
        return buff.toString('ascii');
    }
    const getTemplate = (file) => {
        let data = fs.readFileSync(file, {
            encoding: 'base64'
        })
        return fromBase64(data)
    }
    const getHashFromText = (value) => {
        if (!value) return '';
        var hash = crypto.createHash('sha1');
        hash.setEncoding('hex');
        hash.write(value);
        hash.end();
        return hash.read();
    };
    const getHashFromFile = (path) => {
        var fileContent;
        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(path)) {
                    reject('FNF');
                }
                fileContent = fs.readFileSync(path, {
                    encoding: 'base64'
                });
            } catch (e) {
                reject(e);
            }
            resolve(fileContent);
        });
    };
    const saveData = (outputFile, data, showLog) => {
        if (!data || !outputFile) {
            return;
        }
        let base64 = toBase64(data);
        if (!base64) {
            return;
        }

        let hashFromBody = getHashFromText(base64);
        getHashFromFile(outputFile).then((hash) => {
            if (!hash) {
                return;
            }
            let hashFromFile = getHashFromText(hash);
            if (hashFromBody === hashFromFile) {
                if (showLog) {
                    console.log(chalk `{gray File the same. No need to update. }`);
                }
            } else {
                fs.writeFileSync(outputFile, data);
                if (showLog) {
                    console.log(chalk `{greenBright File saved. }`);
                }
            }
        }).catch((e) => {
            // catch the FNF
            if (e === 'FNF') {
                fs.writeFileSync(outputFile, data);
            } else {
                console.log(chalk `{red ${e}}`)
            }
        });
    }

    plop.setGenerator('placeholders', {
        prompts: [{
                type: 'input',
                name: 'dryrun',
                message: 'dryrun'
            },
            {
                type: 'input',
                name: 'extension',
                message: 'extension'
            },
            {
                type: 'input',
                name: 'placeholders',
                message: 'placeholders'
            }
        ],
        actions: [
            function customAction(answers) {

                // get the template
                let dryrun = plop.renderString(`{{dryrun}}`, answers);
                let extension = plop.renderString(`{{extension}}`, answers);
                let templateFile = `${extension}/placeholders.sitecore.hbs`;
                let template = getTemplate(templateFile);

                // process the template
                let data = plop.renderString(template, answers).replace(/&(lt|gt|quot);/g, function (m, p) {
                    return (p == "lt") ? "<" : ((p == "gt") ? ">" : `"`);
                });

                process.chdir('../../sitecore/definitions');
                // save the output
                let outputFile = `placeholders.sitecore.${extension}`;
                if (!dryrun || dryrun === 'false') {
                    saveData(outputFile, data, true);
                }
            }
        ]
    });

    plop.setGenerator('component', {
        prompts: [{
                type: 'input',
                name: 'dryrun',
                message: 'dryrun'
            },
            {
                type: 'input',
                name: 'extension',
                message: 'extension'
            },
            {
                type: 'input',
                name: 'id',
                message: 'id'
            },
            {
                type: 'input',
                name: 'name',
                message: 'name'
            },
            {
                type: 'input',
                name: 'icon',
                message: 'icon'
            },
            {
                type: 'input',
                name: 'displayName',
                message: 'displayName'
            },
            {
                type: 'input',
                name: 'fields',
                message: 'fields'
            },
            {
                type: 'input',
                name: 'placeholders',
                message: 'placeholders'
            }
        ],
        actions: [
            function customAction(answers) {

                process.chdir(plop.getPlopfilePath());
                // get the template
                let dryrun = plop.renderString(`{{dryrun}}`, answers);
                let name = plop.renderString(`{{name}}`, answers);
                let extension = plop.renderString(`{{extension}}`, answers);
                let templateFile = `${extension}/component.sitecore.hbs`;
                let template = getTemplate(templateFile);

                // process the template
                let data = plop.renderString(template, answers).replace(/&(lt|gt|quot);/g, function (m, p) {
                    return (p == "lt") ? "<" : ((p == "gt") ? ">" : `"`);
                });

                process.chdir('../../sitecore/definitions/components');
                // save the output
                let outputFile = `${name}.sitecore.${extension}`;
                if (!dryrun || dryrun === 'false') {
                    saveData(outputFile, data, false);
                }
            }
        ]
    });

    plop.setGenerator('template', {
        prompts: [{
                type: 'input',
                name: 'dryrun',
                message: 'dryrun'
            },
            {
                type: 'input',
                name: 'extension',
                message: 'extension'
            },
            {
                type: 'input',
                name: 'id',
                message: 'id'
            },
            {
                type: 'input',
                name: 'name',
                message: 'name'
            },
            {
                type: 'input',
                name: 'icon',
                message: 'icon'
            },
            {
                type: 'input',
                name: 'displayName',
                message: 'displayName'
            },
            {
                type: 'input',
                name: 'fields',
                message: 'fields'
            },
            {
                type: 'input',
                name: 'inherits',
                message: 'placeholders'
            }
        ],
        actions: [
            function customAction(answers) {

                process.chdir(plop.getPlopfilePath());

                // get the template
                let dryrun = plop.renderString(`{{dryrun}}`, answers);
                let name = plop.renderString(`{{name}}`, answers);
                let extension = plop.renderString(`{{extension}}`, answers);
                let templateFile = `${extension}/template.sitecore.hbs`;
                let template = getTemplate(templateFile);

                // process the template
                let data = plop.renderString(template, answers).replace(/&(lt|gt|quot);/g, function (m, p) {
                    return (p == "lt") ? "<" : ((p == "gt") ? ">" : `"`);
                });

                process.chdir('../../sitecore/definitions/templates');
                // save the output
                let outputFile = `${name}.sitecore.${extension}`;
                if (!dryrun || dryrun === 'false') {
                    saveData(outputFile, data, false);
                }
            }
        ]
    });
};