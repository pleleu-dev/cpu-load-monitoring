# cpu-load-monitoring

A browser-based CPU load monitoring application

## Description

CPU Load Monitoring Web Application
Proof-of-concept for a browser-based CPU load monitoring application. This application will display time-series data.

A user should be able to view your application to answer the following questions about their computer:

- [ ] What is my computer's current average CPU load?
- [ ] How did the average CPU load change over a 10 minute window?
- [ ] Has my computer been under heavy CPU load for 2 minutes or more? When? How many times?
- [ ] Has my computer recovered from heavy CPU load? When? How many times?

## Product requirements:

- [ ] The front-end application should communicate with a local back-end service to retrieve CPU load average information from your computer (see below).
- [ ] The front-end application should retrieve CPU load information every 10 seconds.
- [ ] The front-end application should maintain a 10 minute window of historical CPU load information.
- [ ] The front-end application should alert the user to high CPU load.
- [ ] The front-end application should alert the user when CPU load has recovered.

## Engineering requirements:

- [ ] The alerting logic in your application should have tests.
- [ ] The back-end service does not need to persist data.
- [ ] Please write up a small explanation of how you would extend or improve your application design if you were building this for production.

## CPU Load Average

Learn about CPU load here: https://en.wikipedia.org/wiki/Load_%28computing%29

Modern computers often have multiple CPUs, and you will need to normalize the load average to account for this. For example, on macOS or linux using NodeJS you could get the number of CPUs on your computer with:

`const cpus = os.cpus().length`

You could then normalize the CPU load average with:

`const loadAverage = os.loadavg()[0] / cpus`

On Windows there are packages available to provide this information to your application.

Thresholds for high load and recovery:

- A CPU is considered under high average load when it has exceeded 1 for 2 minutes or more.
- A CPU is considered recovered from high average load when it drops below 1 for 2 minutes or more.

## How to install the application

```bash
yarn run install
```

This will install the dependencies for the backend and frontend applications.

## How to run the application

```bash
yarn run app
```

This will start the backend and frontend applications.

## How to simulate CPU load on a Linux machine

You can install stress on Linux, use the following appropriate command for your specific Linux distribution.

```bash
sudo apt install stress         [On Debian, Ubuntu and Mint]
sudo yum install stress         [On RHEL/CentOS/Fedora and Rocky/AlmaLinux]
sudo emerge -a sys-apps/stress  [On Gentoo Linux]
sudo apk add stress             [On Alpine Linux]
sudo pacman -S stress           [On Arch Linux]
sudo zypper install stress      [On OpenSUSE]
sudo pkg install stress         [On FreeBSD]
```

You can then run the following command to simulate CPU load:

```bash
stress --cpu 4 --timeout 60
```

In this example, the command will simulate CPU load on 4 cores for 60 seconds.
