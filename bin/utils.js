module.exports = {
    parseSentence: parseSentence,
    parseCommand: parseCommand,
    createProject: createProject,
    testCD: testCD
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

function testCD() {
    const fs = require('fs')

    const folderName = './Test'
    console.log('Starting directory: ' + process.cwd());

    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName)
            navigateCD(folderName)
        }
    } catch (err) {
        console.error(err)
    }

    function navigateCD(name) {
        try {
            process.chdir(name);
            createNewFolder()
            console.log('New directory: ' + process.cwd());
        }
        catch (err) {
            console.log('chdir: ' + err);
        }
    }

    function createNewFolder() {
        try {
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName)
            }
        } catch (err) {
            console.error(err)
        }
    }
}