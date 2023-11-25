export const WordBankOptions = ['default', 'bitcoin'];
export type WordBankID = typeof WordBankOptions[number];

export const WordBanks: Record<WordBankID, string[]> = {
    default: ["banana", "orange", "bitcoin", "tomato"],
    bitcoin: ["bitcoin"]
}