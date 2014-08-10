jmeter-test-node
================

Create koa and express framework API to learn a few bits and bobs

## Setup

You should have npm and nginx installed.

If you haven't installed the wonderful npm 'n' module then I recommend you do.

```shell
sudo npm install -g n
sudo n latest
```

At the time of writing this 'latest' will get you 0.11.13 of nodejs.

## To run the koa application

Koa is built on [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*).

```shell
# ensure you are using the latest version of node
sudo n latest

# remember to use the harmony flag to allow generators
node --harmony koa.js
```

## Running the express application

```shell
node express.js
```

### Throttling
One thing to bear in mind with this is that it uses the 'toobusy' module, which
I failed to get to work with the koa application. I believe it has something
to do with building the module with a broken or incorrect/bad version of node-gyp
but I am unsure. All I know is that you should run the express application with
the latest **stable** version of node, at this time **0.10.30**.

You can read more about this technique [here](https://hacks.mozilla.org/2013/01/building-a-node-js-server-that-wont-melt-a-node-js-holiday-season-part-5/).

With the too-busy module, if the cpu is above a certain load, the node app will
reply quickly with an error status of 503 'Service Unavailable'.

This means the server won't crash, even though not everyone will be served.

When we load test with JMeter we won't smash the server to pieces, but we will see
a dramatic increase in the percentage of errors in the responses.

### Playing with load balancing

Make sure you have installed nginx. The one in the apt-get repos is fine.

Copy the conf to the nginx sites available folder and set up a symlink

```shell
# copy the file
sudo cp nginx/loadbalance.conf /etc/nginx/sites-available/

# go to the location will create the sym-link
cd /etc/nginx/sites-enabled/

# create the symlink
sudo ln -s ../sites-available/loadbalance.conf

# restart nginx
sudo service nginx restart
```

Now you should start up a couple of different express.js instances on different
ports. Open up three terminal windows in the project folder, since this is the
easiest way to start, stop and view console errors etc.

```shell
# terminal window 1
node express.js 3000

# terminal window 2
node express.js 3001

# terminal window 3
node express.js 3002
```

Now you should be able to see your load balanced application at [http://localhost:4040](http://localhost:4040)

Of course it's not really load balanced as we are running all the instances on
the same server, so if you look in your process manager (top) you will see three
node processes all eating around 50% of your cpu when you apply load to them in
JMeter, which pretty much defeats the purpose of the exercise.

You will however see that there are many less errors being recorded.
