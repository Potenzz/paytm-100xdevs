import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { prisma } from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { P2PTransactions } from "../../../components/P2PTransactions";


async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    const txns = await prisma.p2pTransactions.findMany({
        where: {
            OR: [
                { fromUserId: userId },
                { toUserId: userId }
            ]
        },
        include: {
            fromUser: { select: { name: true } },
            toUser: { select: { name: true } }
        },
        orderBy: {
            timestamp: "desc"
        }
    });

    type TransactionType = "Sent" | "Received";

    return txns.map(t => ({
        id: t.id,
        time: t.timestamp,
        amount: t.amount,
        type: t.fromUserId === userId ? "Sent" as TransactionType : "Received" as TransactionType,
        counterparty: t.fromUserId === userId ? t.toUser.name ?? "Unknown" : t.fromUser.name ?? "Unknown" 
    }));
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Peer 2 Peer Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <SendCard />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <P2PTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}