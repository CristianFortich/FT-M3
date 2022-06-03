const commands = require('./commands/index.js');
const done = function(data){
    process.stdout.write(data);
    process.stdout.write('\nprompt > ');
}

process.stdout.write('\nprompt > ');
process.stdin.on('data', function (data){
    var args = data.toString().trim().split(' '); 
    var cmd = args.shift();
    if(commands[cmd]){
        commands[cmd](args,done);
    }else{
        process.stdout.write('\nprompt > ');
    }
});

