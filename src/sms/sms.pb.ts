/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'bonus';

export interface CreateFirstDepositBonusRequest {
  clientId: number;
  expiryInHours: number;
  minimumEvents: number;
  minimumOddsPerEvent: number;
  minimumTotalOdds: number;
  applicableBetType: string;
  maximumWinning: number;
  minimumEntryAmount: number;
  bonusAmount: number;
  minimumBettingStake: number;
}
