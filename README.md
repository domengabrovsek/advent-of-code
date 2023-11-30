<div align="center"> 

🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄
![logo](./img/aoc.png)

🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄🎁🎄
</div>

# Advent of Code Solutions by [Domen Gabrovšek](https://www.github.com/domengabrovsek)

## Overview

This repository contains my personal solutions for the [Advent of Code](https://adventofcode.com/), an annual set of Christmas-themed programming challenges. Each folder within this repository corresponds to a different year, with subfolders for each day's challenge.

## Yearly Progress Overview

This table provides a quick glance at my journey through the Advent of Code over the years, highlighting the number of challenges completed each year.

|                                                                   |                                                                   |                                                                   |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| /                                                                 | ![2022 Badge](https://img.shields.io/badge/2022%20⭐-30/50-blue)  | ![2021 Badge](https://img.shields.io/badge/2021%20⭐-30/50-green) |
| ![2020 Badge](https://img.shields.io/badge/2020%20⭐-27/50-red)   | ![2019 Badge](https://img.shields.io/badge/2019%20⭐-8/50-purple) | ![2018 Badge](https://img.shields.io/badge/2018%20⭐-2/50-brown)  |
| ![2017 Badge](https://img.shields.io/badge/2017%20⭐-0/50-orange) | ![2016 Badge](https://img.shields.io/badge/2016%20⭐-0/50-cyan)   | ![2015 Badge](https://img.shields.io/badge/2015%20⭐-0/50-yellow) |

## Usage

This repository contains solutions for the Advent of Code challenges, written in JavaScript/TypeScript. To get started, you'll need Node.js installed on your system as we heavily rely on it for running scripts and managing dependencies.

### Setting Up and Running Solutions

```js
// Install dependencies
~ npm install

// Initialize a template source file for the specified year
~ npm run setup [year] // e.g., npm run setup 2023

// Run the solution for a specific year and day
~ npm run start [year] [day] // e.g., npm run start 2022 1
```

### Automated Data Fetching

The inputs and instructions for each challenge are automatically fetched from the Advent of Code (AoC) API. This streamlines the process, allowing you to focus on solving the puzzles without the hassle of manual data handling.

### Configuration: .env File

Before running the solutions, you need to create a `.env` file in the root directory. This file should contain your AoC session token, which is necessary for fetching challenge data from the AoC API.

Example of `.env` file content:

```
TOKEN=your_aoc_session_token_here
```

You can obtain your AoC session token by inspecting your browser cookies while logged into the AoC website. This token is essential for accessing the AoC API and retrieving puzzle inputs.