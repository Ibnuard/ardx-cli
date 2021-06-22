module.exports = {
    parseSentence: parseSentence,
    parseCommand: parseCommand,
    createProject: createProject,
    generateComponent: generateComponent,
    generateScreen: generateScreen
};

const { execSync } = require('child_process');

function parseSentence(words) {
    return words[1]
}

function parseCommand(words) {
    return words[0]
}

function createProject(name) {

    console.log('Generating project....')

    execSync('npm install shelljs', {
        stdio: 'ignore', // we need this so node will print the command output
    })

    const shell = require('shelljs')
    //const path = projectPath
    //shell.cd(path)
    shell.exec('git clone https://github.com/Ibnuard/ardxreact-react-native-boilerplate', {}, res => {
        doRename(name)
    })
}

function doRename(name) {
    const fs = require('fs')

    console.log('Renaming project folder...')
    fs.rename('./ardxreact-react-native-boilerplate', `./${name}`, err => {
        if (err) {
            console.error(err)
            return
        }
        doReactNativeRename()
        //done
    })

    function doReactNativeRename() {
        console.log('CD to new project folder...')
        try {
            process.chdir(name);
            doNPMRename()
            console.log('New directory: ' + process.cwd());
        }
        catch (err) {
            console.log('chdir: ' + err);
        }
    }

    function doNPMRename() {
        console.log('Install rename package...')
        execSync('npm install react-native-rename', {
            stdio: 'ignore', // we need this so node will print the command output
        })
        renameProject()
    }

    function renameProject() {
        console.log('Renaming react-native project...')
        execSync(`npx react-native-rename ${name}`, {
            stdio: 'inherit', // we need this so node will print the command output
        })
    }
}

function generateComponent(name) {
    const fs = require('fs-extra');

    console.log('Generating component.... : ' + name)
    console.log('dir : ' + process.cwd())

    const addOnsPath = './ardx/files/component'
    const addOnsgenerated = `./ardx/files/${name}`
    const dest = `./src/components/${name}`

    try {
        if (!fs.existsSync(addOnsPath)) {
            console.log('error addons folder not found')
        } else {
            copyFolder()
        }
    } catch (err) {
        console.error(err)
    }

    function copyFolder() {
        console.log('Sync...')

        fs.copy(addOnsPath, dest, function (err) {
            if (err) {
                console.log('An error occured while copying the folder.')
                return console.error(err)
            }
            console.log('Copy completed!')
        });
    }
}

function generateScreen(name) {
    const fs = require('fs-extra');

    console.log('Generating Screen.... : ' + name)
    console.log('dir : ' + process.cwd())

    const addOnsPath = './ardx/files/screens'
    const dest = `./src/screens/${name}`

    try {
        if (!fs.existsSync(addOnsPath)) {
            console.log('error addons folder not found')
        } else {
            copyFolder()
        }
    } catch (err) {
        console.error(err)
    }

    function copyFolder() {
        console.log('Sync...')

        fs.copy(addOnsPath, dest, function (err) {
            if (err) {
                console.log('An error occured while copying the folder.')
                return console.error(err)
            }
            console.log('Copy completed!')
        });
    }
}