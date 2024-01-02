
export interface UserBetWithBonus {
    betslip: BetSlip[];
    clientId: number;
    userId: number;
    stake: number;
    bonusType: string;
    totalOdds: number;
    bonusId : number;
}

export interface BetSlip {
    eventName: string;
    eventType: string;
    eventId: number;
    producerId: number;
    marketId: number;
    marketName: string;
    specifier: string;
    outcomeId: string;
    outcomeName: string;
    odds: number;
    sportId: number;
}
