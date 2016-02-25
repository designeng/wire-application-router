var exec  = require("child_process").exec;

// to stop server:
exec('lsof -t -i tcp:3000 | xargs kill', function(error, stdout, stderr) {
    console.log('server stopped!');
});