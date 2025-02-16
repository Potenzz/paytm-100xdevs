"use client";
import { useRecoilValue} from "recoil";
import { balanceAtom } from "../atoms/balance";
import { useRecoilState } from "recoil";

console.log("Debug: balanceAtom", balanceAtom); // Check if it's undefined

export const useBalance = () => {
    try {
        const value = useRecoilValue(balanceAtom);
        // const [value, setValue] = useRecoilState(balanceAtom);

        // const value = 100;
        console.log(`Value log: `, value);
        return value;
    } catch (error) {
        console.error("Error in useBalance:", error);
        return 0; // Default fallback value
    }
};
