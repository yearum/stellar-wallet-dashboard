# 🚀 Stellar Wallet Dashboard

A modern Stellar Testnet wallet dashboard built using the Freighter Wallet API and Horizon API.

This project was created as part of the Stellar Journey to Master learning program and demonstrates wallet integration, balance management, transaction monitoring, and Stellar network interaction.

---

## ✨ Features

### 🔗 Wallet Connection
- Connect Freighter Wallet
- Disconnect Wallet
- Display wallet connection status

### 💰 Balance Management
- Fetch XLM balance from Stellar Testnet
- Display wallet address
- Show last update timestamp

### 📜 Transaction History
- Load recent wallet transactions
- Display transaction hashes
- Display transaction timestamps

### 🚀 Transaction Flow
- Prepare Send XLM interface
- Transaction status handling
- Ready for Freighter transaction signing integration

### ⚠️ Error Handling
- Invalid wallet detection
- Network error handling
- User-friendly status messages

---

## 🌐 Network

This project uses:

**Stellar Testnet**

Horizon Endpoint:

```text
https://horizon-testnet.stellar.org
```

---
## ⚙️ Installation

Clone repository:

```bash
git clone https://github.com/yearum/stellar-wallet-dashboard.git
```

Enter project directory:

```bash
cd stellar-wallet-dashboard
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---
### Recent Transactions

Display the latest transactions associated with the connected account.

### Send XLM

Transaction workflow prepared for:
- Build Transaction
- Sign with Freighter
- Submit to Horizon
- Display Transaction Hash

---

Built with Stellar, JavaScript, and Freighter Wallet API.
