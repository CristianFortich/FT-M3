var fs = require('fs');
var request = require('request');

module.exports = {
    pwd: function(args,done){
        done(process.cwd());
        // process.stdout.write(process.cwd());
    },
    date: function(args,done){
        // process.stdout.write(Date());
        done(Date());
    },
    ls: function(args,done){
        fs.readdir('.', function(err, files) {
            if (err) throw err;
            var lines = '';
            files.forEach(function(file) {
            //   process.stdout.write(file.toString() + "\n");
            lines = lines + file.toString() + "\n";
            })
            // process.stdout.write("prompt > ");
            done(lines);
        });    
    },
    echo: function(args,done){
        // process.stdout.write(args.join(' '));
        done(args.join(' '));
    },
    cat: function(args,done){
        fs.readFile(args[0], function(err, data){
            if (err) throw err;
            // process.stdout.write(data);
            // process.stdout.write("prompt > ");
            done(data);
        });
    },
    head: function(args,done){
        fs.readFile(args[0], 'utf-8' ,function(err, data){
            if (err) throw err;
            var lines = data.split('\n').slice(0,parseInt(args[1]));
            // process.stdout.write(lines.join('\n'));
            // process.stdout.write("prompt > ");
            done(lines.join('\n'));
        });
    },
    tail: function(args,done){
        fs.readFile(args[0], 'utf-8' ,function(err, data){
            if (err) throw err;
            var lines = data.split('\n').slice(-5);
            // process.stdout.write(lines.join('\n'));
            // process.stdout.write("prompt > ");
            done(lines.join('\n'));
        });
    },
    curl: function(args,done){
        request(args[0], function(err, response, data){
            if (err) throw err;
            // process.stdout.write(data);
            // process.stdout.write("prompt > ");
            done(data);
        });
    }
}
