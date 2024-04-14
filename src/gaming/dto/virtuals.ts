import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class XpressBalanceDto {

    @ApiProperty({
        example: 'balance'
    })
    action: string;

    @ApiProperty({
        example: 'asdfadsfadsfsd'
    })
    @IsNotEmpty()
    sessionId: string;

    @ApiProperty({
        example: 10116
    })
    @IsNotEmpty()
    gameId: number;

    @ApiProperty({
        example: 'CTB32423'
    })
    @IsNotEmpty()
    playerId: string;

    @ApiProperty({
        example: 'CTB'
    })
    group: string;

    @ApiProperty({
        example: 'NGN'
    })
    currency: string;

    @ApiProperty({
        example: '32412432'
    })
    timestamp: string;

    @ApiProperty({
        example: '2343423ewr'
    })
    requestId: string;

    @ApiProperty({
        example: '1234'
    })
    siteId: string;

    @ApiProperty({
        example: '23112323423hkghfgj'
    })
    fingerprint: string;

};

export class XpressLoginDto {

    @ApiProperty({
        example: 'login'
    })
    action: string;

    @ApiProperty({
        example: 'asdfadsfadsfsd'
    })
    @IsNotEmpty()
    token: string;

    @ApiProperty({
        example: 10116
    })
    @IsNotEmpty()
    gameId: number;

    @ApiProperty({
        example: 'mobile/desktop/retail'
    })
    @IsNotEmpty()
    clientPlatform: string;

    @ApiProperty({
        example: '127.0.0.1'
    })
    clientIp: string;

    @ApiProperty({
        example: '32412432'
    })
    timestamp: string;

    @ApiProperty({
        example: '2343423ewr'
    })
    requestId: string;

    @ApiProperty({
        example: '1234'
    })
    siteId: string;

    @ApiProperty({
        example: '23112323423hkghfgj'
    })
    fingerprint: string;

};

export class XpressDebitCreditDto {

    @ApiProperty({
        example: 'balance'
    })
    action: string;

    @ApiProperty({
        example: 'asdfadsfadsfsd'
    })
    @IsNotEmpty()
    sessionId: string;

    @ApiProperty({
        example: 10116
    })
    @IsNotEmpty()
    gameId: number;

    @ApiProperty({
        example: 'CTB32423'
    })
    @IsNotEmpty()
    playerId: string;

    @ApiProperty({
        example: 'CTB'
    })
    group: string;

    @ApiProperty({
        example: 'NGN'
    })
    currency: string;

    @ApiProperty({
        example: 'round'
    })
    gameCycle: string;

    @ApiProperty({
        example: '2343243'
    })
    transactionId: string;

    @ApiProperty({
        example: '550.00'
    })
    transactionAmount: string;

    @ApiProperty({
        example: 'bet'
    })
    transactionCategory: string;

    @ApiProperty({
        example: true
    })
    gameCycleClosed: boolean;

    @ApiProperty({
        example: '32412432'
    })
    timestamp: string;

    @ApiProperty({
        example: '2343423ewr'
    })
    requestId: string;

    @ApiProperty({
        example: '1234'
    })
    siteId: string;

    @ApiProperty({
        example: '23112323423hkghfgj'
    })
    fingerprint: string;

};

export class XpressRollbackDto {

    @ApiProperty({
        example: 'balance'
    })
    action: string;

    @ApiProperty({
        example: 'asdfadsfadsfsd'
    })
    @IsNotEmpty()
    sessionId: string;

    @ApiProperty({
        example: 10116
    })
    @IsNotEmpty()
    gameId: number;

    @ApiProperty({
        example: 'CTB32423'
    })
    @IsNotEmpty()
    playerId: string;

    @ApiProperty({
        example: 'CTB'
    })
    group: string;

    @ApiProperty({
        example: 'NGN'
    })
    currency: string;

    @ApiProperty({
        example: 'round'
    })
    gameCycle: string;

    @ApiProperty({
        example: '2343243'
    })
    transactionId: string;

    @ApiProperty({
        example: '550.00'
    })
    transactionAmount: string;

    @ApiProperty({
        example: 'bet'
    })
    transactionCategory: string;

    @ApiProperty({
        example: 'debit'
    })
    transactionType: string;

    @ApiProperty({
        example: true
    })
    gameCycleClosed: boolean;

    @ApiProperty({
        example: '32412432'
    })
    timestamp: string;

    @ApiProperty({
        example: '2343423ewr'
    })
    requestId: string;

    @ApiProperty({
        example: '1234'
    })
    siteId: string;

    @ApiProperty({
        example: '23112323423hkghfgj'
    })
    fingerprint: string;

};

export class XpressLogoutDto {

    @ApiProperty({
        example: 'login'
    })
    action: string;

    @ApiProperty({
        example: 'asdfadsfadsfsd'
    })
    @IsNotEmpty()
    sessionId: string;

    @ApiProperty({
        example: 'asdfadsfadsfsd'
    })
    @IsNotEmpty()
    playerId: string;

    @ApiProperty({
        example: 10116
    })
    @IsNotEmpty()
    gameId: number;

    @ApiProperty({
        example: 'CTB'
    })
    group: string;

    @ApiProperty({
        example: 'NGN'
    })
    currency: string;

    @ApiProperty({
        example: '32412432'
    })
    timestamp: string;

    @ApiProperty({
        example: '2343423ewr'
    })
    requestId: string;

    @ApiProperty({
        example: '1234'
    })
    siteId: string;

    @ApiProperty({
        example: '23112323423hkghfgj'
    })
    fingerprint: string;

};


export class SwaggerXpressResponse {
    @ApiProperty({example: 'success'})
    message: string;

    @ApiProperty({example: true})
    status: boolean;

    @ApiProperty({
        example: {
            playerId: '', // operator identifier+playerID
            currency: '',
            playerNickname: '', // operator identifier+username
            balance: '',
            sessionId: '',
            oldBalance: '', // for debit, credit transactions
            transactionId: '', //for debit, credit transactions
            group: '', // operator identifier
            timestamp: '',
            requestId: '',
            fingerprint: ''
        },
        nullable: true
    })// eslint-disable-next-line @typescript-eslint/ban-types
    data?: object;

    @ApiProperty({example: 200})
    code: number;
}