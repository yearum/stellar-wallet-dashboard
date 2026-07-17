import {
  getAddress,
  isConnected,
  requestAccess
} from "@stellar/freighter-api";

/* =========================
   STATE
========================= */

let currentWallet = null;

/* =========================
   GLOBAL FUNCTIONS
========================= */

window.connectWallet = connectWallet;
window.disconnectWallet = disconnectWallet;
window.checkBalance = checkBalance;
window.sendXLM = sendXLM;

/* =========================
   CONNECT WALLET
========================= */

async function connectWallet() {

    try {

        console.log("STEP 1");

        console.log("Freighter Object:", window.freighter);

        const access = await requestAccess();

        console.log("STEP 2");

        console.log("ACCESS:", access);

        const result = await getAddress();

        console.log("STEP 3");

        console.log("FULL RESULT:", result);

        if (!result.address) {

            alert("Alamat wallet kosong. Cek Freighter.");

            return;
        }

        currentWallet = result.address;

        document.getElementById("walletStatus").innerText =
            "✅ Connected";

        document.getElementById("accountId").innerText =
            currentWallet;

        await checkBalance();

    } catch(error) {

        console.error("FULL ERROR:", error);

        alert(
            error?.message ||
            JSON.stringify(error, null, 2)
        );

    }

}

/* =========================
   DISCONNECT
========================= */

function disconnectWallet() {

    currentWallet = null;

    document.getElementById("walletStatus").innerText =
        "❌ Disconnected";

    document.getElementById("accountId").innerText =
        "-";

    document.getElementById("balance").innerText =
        "-";

    document.getElementById("lastUpdated").innerText =
        "-";

    document.getElementById("transactions").innerHTML =
        "<li>No transactions loaded</li>";

    document.getElementById("txResult").innerText =
        "";
}

/* =========================
   CHECK BALANCE
========================= */

async function checkBalance() {

    if (!currentWallet) {

        alert("Connect wallet terlebih dahulu");

        return;
    }

    try {

        const response = await fetch(
            `https://horizon-testnet.stellar.org/accounts/${currentWallet}`
        );

        if (!response.ok) {
            throw new Error("Account tidak ditemukan");
        }

        const data = await response.json();

        const nativeBalance =
            data.balances.find(
                asset => asset.asset_type === "native"
            );

        document.getElementById("balance").innerText =
            nativeBalance
                ? nativeBalance.balance + " XLM"
                : "0 XLM";

        document.getElementById("lastUpdated").innerText =
            new Date().toLocaleString();

        await loadTransactions(currentWallet);

    } catch (error) {

        console.error(error);

        document.getElementById("balance").innerText =
            "Error";
    }
}

/* =========================
   LOAD TRANSACTIONS
========================= */

async function loadTransactions(wallet) {

    try {

        const response = await fetch(
            `https://horizon-testnet.stellar.org/accounts/${wallet}/transactions?limit=5&order=desc`
        );

        const data = await response.json();

        const list =
            document.getElementById("transactions");

        list.innerHTML = "";

        if (
            !data._embedded ||
            data._embedded.records.length === 0
        ) {

            list.innerHTML =
                "<li>No transactions found</li>";

            return;
        }

        data._embedded.records.forEach(tx => {

            const li =
                document.createElement("li");

            const date =
                new Date(
                    tx.created_at
                ).toLocaleString();

            li.innerText =
                `${date} | ${tx.hash.substring(0, 20)}...`;

            list.appendChild(li);
        });

    } catch (error) {

        console.error(error);

        document.getElementById("transactions").innerHTML =
            "<li>Failed to load transactions</li>";
    }
}

/* =========================
   SEND XLM
========================= */

async function sendXLM() {

    const destination =
        document.getElementById("destination").value;

    const amount =
        document.getElementById("amount").value;

    if (!currentWallet) {

        alert("Connect wallet terlebih dahulu");

        return;
    }

    if (!destination || !amount) {

        alert("Isi alamat tujuan dan jumlah XLM");

        return;
    }

    document.getElementById("txResult").innerText =
        "🚧 Send XLM feature coming soon";

    /*
      Tahap berikutnya:

      1. Build Transaction
      2. Sign Transaction dengan Freighter
      3. Submit ke Horizon
      4. Tampilkan Transaction Hash
    */
}