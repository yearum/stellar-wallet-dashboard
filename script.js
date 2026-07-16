function loadDemoWallet() {

    document.getElementById("walletAddress").value =
        "GC2CWEBHST65DUOZHOYGESNDSK3WWQPTWXGMJMXY6KCJ2KHDACDSWEP4";

    document.getElementById("walletStatus").innerText =
        "🟢 Demo Wallet Loaded";
}

async function checkBalance() {

    const wallet =
        document.getElementById("walletAddress").value.trim();

    if (!wallet) {

        alert("Masukkan Public Key Stellar");

        return;
    }

    try {

        const response = await fetch(
            `https://horizon-testnet.stellar.org/accounts/${wallet}`
        );

        if (!response.ok) {
            throw new Error("Account tidak ditemukan");
        }

        const data = await response.json();

        document.getElementById("walletStatus").innerText =
            "✅ Account Active";

        document.getElementById("accountId").innerText =
            data.account_id;

        const nativeBalance =
            data.balances.find(
                asset => asset.asset_type === "native"
            );

        document.getElementById("balance").innerText =
            nativeBalance.balance + " XLM";

        document.getElementById("lastUpdated").innerText =
            new Date().toLocaleString();

        loadTransactions(wallet);

    } catch (error) {

        console.error(error);

        document.getElementById("walletStatus").innerText =
            "❌ Account Not Found";

        document.getElementById("accountId").innerText =
            "-";

        document.getElementById("balance").innerText =
            "-";

        document.getElementById("lastUpdated").innerText =
            "-";

        document.getElementById("transactions").innerHTML =
            "<li>No transactions found</li>";
    }
}

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
                "<li>No transaction found</li>";

            return;
        }

        data._embedded.records.forEach(tx => {

            const li =
                document.createElement("li");

            const date =
                new Date(tx.created_at)
                    .toLocaleString();

            li.innerText =
                `${date} | TX ID: ${tx.id}`;

            list.appendChild(li);
        });

    } catch (error) {

        console.error(error);

        document.getElementById("transactions").innerHTML =
            "<li>Failed to load transactions</li>";
    }
}

function resetDashboard() {

    document.getElementById("walletAddress").value = "";

    document.getElementById("walletStatus").innerText =
        "❌ Belum Dicek";

    document.getElementById("accountId").innerText =
        "-";

    document.getElementById("balance").innerText =
        "-";

    document.getElementById("lastUpdated").innerText =
        "-";

    document.getElementById("transactions").innerHTML =
        "<li>No transactions loaded</li>";
}