# PDA-Based Barcode Scanning System
[Watch the demo video](https://youtu.be/VIDEO_ID)

## Overview
This project is a mobile application designed for a PDA device with a built-in barcode scanner. It was developed for a client to assist with inventory management tasks, allowing users to scan item barcodes and manage them for either storing or shipping. The application is lightweight, self-contained, and runs entirely on the PDA device, making it ideal for environments without external server dependencies.

## Features
- **Barcode Scanning:** Supports scanning of item and rack barcodes using the PDA's built-in scanner.
- **Storing Workflow:**
  - Prompts the user to scan a rack barcode after scanning an item barcode.
  - Saves both item and rack details to a local MySQL database.
- **Shipping Workflow:**
  - Saves item details directly to the database after scanning the barcode.
- **Local Backend:**
  - Runs entirely on the PDA device using Termux for hosting the Express.js backend 

## Technologies Used
- **Frontend:** React
- **Backend:** Express.js
- **Database:** MySQL
- **Environment:** Termux (for running the backend and on the PDA device)

## Usage
1. Launch the application on the PDA device.
2. Use the built-in scanner to scan item barcodes.
3. Select the operation:
   - **Storing:** Scan the rack barcode to complete the operation.
   - **Shipping:** Save the item details directly.
4. Data will be saved locally in the MySQL database.




