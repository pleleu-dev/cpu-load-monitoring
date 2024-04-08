# cpu-load-monitoring

A browser-based CPU load monitoring application

## Description

CPU Load Monitoring Web Application
Proof-of-concept for a browser-based CPU load monitoring application. This application will display time-series data.

A user should be able to view your application to answer the following questions about their computer:

- [x] What is my computer's current average CPU load?
- [x] How did the average CPU load change over a 10 minute window?
- [x] Has my computer been under heavy CPU load for 2 minutes or more? When? How many times?
- [x] Has my computer recovered from heavy CPU load? When? How many times?

## Product requirements:

- [x] The front-end application should communicate with a local back-end service to retrieve CPU load average information from your computer (see below).
- [x] The front-end application should retrieve CPU load information every 10 seconds.
- [x] The front-end application should maintain a 10 minute window of historical CPU load information.
- [x] The front-end application should alert the user to high CPU load.
- [x] The front-end application should alert the user when CPU load has recovered.

## Engineering requirements:

- [x] The alerting logic in your application should have tests.
- [x] The back-end service does not need to persist data.
- [x] Please write up a small explanation of how you would extend or improve your application design if you were building this for production.

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

## Building for production

If you were building this application for production, you could consider the following improvements:

### Process

- Accessibility: Ensure the application is accessible to users with disabilities by following WCAG guidelines.
- Code review: Have a code review process in place to ensure code quality and consistency.
- Testing: Implement a comprehensive testing strategy that includes unit tests, integration tests, end-to-end tests and QA testing.
- CI/CD: Implement a CI/CD pipeline to automate the build, test and deployment process.
- Monitoring: Implement monitoring and alerting to track the performance and health of the application.
- Security: Enforce robust security practices like user authentication, data encryption.
- Documentation: Create comprehensive documentation covering the application's functionality, deployment instructions, and maintenance procedures.

### Build

- Multi-platform support: Ensure the application works on different operating systems.
- Performance Optimization: Implement performance optimization strategies like code optimization, caching, and content delivery networks (CDNs).

### Backend

- Persistence: Implement a database to persist historical CPU load data for analysis and reporting.
- Scalability: Design a scalable backend architecture to handle potential increases in user traffic or data volume.

### Architecture

- WebSockets: We could consider establishing a WebSocket connection between the client and server. The client-side code would periodically calculate its CPU usage and send it to the server through the WebSocket. The server would then receive and process the client-side CPU data.
