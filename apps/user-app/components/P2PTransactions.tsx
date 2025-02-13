import { Card } from "@repo/ui/card";

export const P2PTransactions = ({
    transactions
}: {
    transactions: {
        id: number,
        time: Date,
        amount: number,
        type: "Sent" | "Received",
        counterparty: string
    }[]
}) => {
    if (!transactions.length) {
        return (
            <Card title="P2P Transactions">
                <div className="text-center pb-8 pt-8">No Recent P2P Transactions</div>
            </Card>
        );
    }

    return (
        <Card title="P2P Transactions">
            <div className="pt-2">
                {transactions.map((t, index) => (
                    <div key={t.id || index} className="flex justify-between items-center border-b py-2">
                        <div>
                            <div className="text-sm font-medium">
                                {t.type} to {t.counterparty}
                            </div>
                            <div className="text-slate-600 text-xs">{t.time.toDateString()}</div>
                        </div>
                        <div className={`text-sm font-bold ${t.type === "Sent" ? "text-red-500" : "text-green-500"}`}>
                            {t.type === "Sent" ? "- " : "+ "}₹{t.amount / 100}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
