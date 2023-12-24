import {ApiProperty} from '@nestjs/swagger';

export class SwaggerOutrightsOutcomes {
    @ApiProperty({ description: 'outcome name' })
    outcomeName: string;

    @ApiProperty({ description: 'outcome ID' })
    outcomeID: string;

    @ApiProperty({ description: 'outcome odds' })
    odds: number;

    @ApiProperty({ description: 'outcome odd ID' })
    oddID: number;

    @ApiProperty({ description: 'Outcome status, 0 - Active, 1 - Suspended, 2 - Deactivated, 5 - Handed Over' })
    status: number;

    @ApiProperty({ description: 'whether odd is active or deactivated, 1 - Active, 0 - Deactivated' })
    active: number;

    @ApiProperty({ description: 'outcome producer ID' })
    producerID: number;

    @ApiProperty({ description: 'status name, Active,Suspended,Deactivated, Handed Over' })
    statusName: string;

}

export class SwaggerOutrightsMarket {
    @ApiProperty({ description: 'market ID' })
    marketID: number;

    @ApiProperty({ description: 'market name' })
    marketName: string;

    @ApiProperty({ description: 'market specifier' })
    specifier: string;

    @ApiProperty({
        type: [SwaggerOutrightsOutcomes],
        description: 'Array of Outcomes',
    })
    outcomes: SwaggerOutrightsOutcomes[];
}

export class SwaggerTournamentsData {
    @ApiProperty({ description: 'tournament name' })
    tournamentName: string;

    @ApiProperty({ description: 'Sport ID' })
    sportID: number;

    @ApiProperty({ description: 'event ID' })
    eventId: number;

    @ApiProperty({ description: 'event type' })
    eventType: string;

    @ApiProperty({ description: 'event prefix' })
    eventPrefix: string;

    @ApiProperty({ description: 'country code' })
    countryCode: string;

    @ApiProperty({
        type: [SwaggerOutrightsMarket],
        description: 'Array of markets',
    })
    markets: SwaggerOutrightsMarket[];
}

export class SwaggerOutrightsResponse {

    @ApiProperty({
        type: [SwaggerTournamentsData],
        description: 'Array of tournaments',
    })
    tournaments: SwaggerTournamentsData[];

    @ApiProperty({ description: 'Last page number' })
    lastPage: number;

    @ApiProperty({ description: 'From this record to' })
    from: number;

    @ApiProperty({ description: 'To this record count' })
    to: number;

    @ApiProperty({ description: 'Remaining records' })
    remainingRecords: number;

}