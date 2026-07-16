async function checkBalance() {

    const wallet = document.getElementById("walletAddress").value.trim();

    if (!wallet) {
        alert("Masukkan Public Key Stellar");
        return;
    }

    try {

        // ACCOUNT INFO
        const accountResponse = await fetch(
            `https://horizon-testnet.stellar.org/accounts/${wallet}`
        );

        if (!accountResponse.ok) {
            throw new Error("Account tidak ditemukan");
        }

        const accountData = await accountResponse.json();

        document.getElementById("accountId").innerText =
            accountData.account_id;

        const nativeBalance =
            accountData.balances.find(
                balance => balance.asset_type === "native"
            );

        document.getElementById("balance").innerText =
            nativeBalance.balance + " XLM";

        document.getElementById("status").innerText =
            "✅ Active";

        // RECENT TRANSACTIONS
        const txResponse = await fetch(
            `https://horizon-testnet.stellar.org/accounts/${wallet}/transactions?limit=5&order=desc`
        );

        const txData = await txResponse.json();

        const txList = document.getElementById("transactions");

        txList.innerHTML = "";

        if (txData._embedded.records.length === 0) {

            txList.innerHTML =
                "<li>Tidak ada transaksi.</li>";

        } else {

            txData._embedded.records.forEach(tx => {

                const li = document.createElement("li");

                li.textContent =
                    `Transaction ID: ${tx.id}`;

                txList.appendChild(li);

            });
        }

    } catch (error) {

        console.error(error);

        document.getElementById("accountId").innerText = "-";

        document.getElementById("balance").innerText =
            "Account tidak ditemukan";

        document.getElementById("status").innerText =
            "❌ Not Found";

        document.getElementById("transactions").innerHTML =
            "<li>-</li>";
    }
}

function copyAddress() {

    const wallet =
        document.getElementById("walletAddress").value;

    if (!wallet) {

        alert("Masukkan alamat wallet terlebih dahulu");

        return;
    }

    navigator.clipboard.writeText(wallet);

    alert("✅ Address berhasil disalin");
}