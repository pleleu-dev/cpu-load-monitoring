# CPU monitoring - backend

This is a simple node script that monitors the CPU of a Linux system.

## Installation

```bash
yarn
```

## Usage

Start the server on port 5000 with the following command:

```bash
yarn start
```

## API

### /cpu-monitoring/load

#### get

Returns the current CPU load as a JSON object:

```json
{
  "cpu : {
    "averageLoad": 0.01125,
    "timestamp: 1712089061094
  }
}
```
