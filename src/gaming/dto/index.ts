/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { Timestamp } from 'typeorm';

export class SwaggerSyncGameDto {
  @ApiProperty({
    description: 'Provider name, e.g., shack-evolution',
    example: 'tada',
  })
  provider: string;
}

export class SwaggerQtechTransactionDto {
  @ApiProperty({ description: 'Transaction type, either DEBIT or CREDIT' })
  @IsIn(['DEBIT', 'CREDIT'])
  txnType: string;

  @ApiProperty({ description: 'Player ID' })
  playerId: number;

  @ApiProperty({ description: 'Transaction amount' })
  amount: number;

  @ApiProperty({ description: 'Currency code' })
  currency: string;

  @ApiProperty({ description: 'Round ID' })
  roundId: string;

  @ApiProperty({ description: 'Game id' })
  gameId: string;

  @ApiProperty({ description: 'Game id' })
  clientId?: string
}

export class SwaggerStartGameDto {
  @ApiProperty({
    description: 'Sportsbook Id for the game',
    example: 1,
  })
  gameId: number;
  @ApiProperty({
    description: 'Client Id',
    example: 2,
  })
  clientId: number;
  @ApiProperty({
    description: 'User Initiating Game',
    example: 2,
  })
  userId: number;
  @ApiProperty({
    description: 'Url to redirect to platform home page',
    example: 'testUser',
  })
  username: string;
  @ApiProperty({
    description: 'Url to redirect to deposit page',
    example: 'testUser@test.com',
  })
  email: string;
  @ApiProperty({
    description: 'Url to redirect to platform home page',
    example: 'https://example.com',
  })
  homeUrl: string;
  @ApiProperty({
    description: 'Url to redirect to deposit page',
    example: 'https://example.com',
  })
  depositUrl: string;
  @ApiProperty({
    description: 'Provider Slug of the Game',
    example: 'smart-soft',
  })
  providerSlug: string;

  @ApiProperty({
    description: 'Start as a Demo',
    example: false,
  })
  demo: boolean;

  @ApiProperty({
    description: 'It is a mobile device',
    example: false,
  })
  isMobile: boolean;

  @ApiProperty({
    description: 'language to load game',
    example: 'en',
  })
  language: string;

  @ApiProperty({
    description: 'language to load game',
    example: '123456',
  })
  authCode: string;

  @ApiProperty({
    description: 'language to load game',
    example: 'casino',
  })
  balanceType: string;

  @ApiProperty({
    description: 'isBonus to load game',
    example: true,
  })
  isBonus: boolean;

  @ApiProperty({
    description: 'bonusType to load game',
    example: 'free_rounds',
  })
  bonusType: string;
}

export class SwaggerStartGameResponseDto {
  @ApiProperty({
    description: 'Url tto Initiate Game',
    example: 'http://example.com',
  })
  url: string;
}

export class SwaggerOKProviderResponse {
  @ApiProperty({
    description: 'provider identifier',
  })
  id: number;
  @ApiProperty({
    description: 'provider slug e.g evo-play',
  })
  slug: string;
  @ApiProperty({
    description: 'provider name e.g Evo Play',
  })
  name: string;
  @ApiProperty({
    description:
      'provider description e.g Evo Play is a xyz provider founded in 0000 bc',
  })
  description: string;
  @ApiProperty({
    description: 'image url for provider',
  })
  imagePath: string;
  @ApiProperty({
    description:
      'parent provider name or identifier if available else same as name field',
  })
  parentProvider: string;
  @ApiProperty({
    description: 'date provider object was created',
  })
  createdAt: Date;
  @ApiProperty({
    description: 'date provider object was updated',
  })
  updatedAt: Date;
}

export class SwaggerOKProviderArrayResponse {
  @ApiProperty({
    type: [SwaggerOKProviderResponse],
    description: 'Array of Provider Objects',
  })
  providers: SwaggerOKProviderResponse[];
}

export class SwaggerCreateProviderDto {
  @ApiProperty({
    description: 'provider slug e.g evo-play',
    example: 'smart-soft',
  })
  slug: string;
  @ApiProperty({
    description: 'provider name e.g Evo Play',
    example: 'Smart Soft',
  })
  name: string;
  @ApiProperty({
    description:
      'provider description e.g Evo Play is a xyz provider founded in 0000 bc',
    example: 'Smart Soft Gaming ',
  })
  description: string;
  @ApiProperty({
    description: 'image url for provider',
    example: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
  })
  imagePath: string;
}

export class SwaggerOKGameResponse {
  @ApiProperty({
    description: 'id',
  })
  id: number;
  @ApiProperty({
    description: 'game id e.g penaldo',
  })
  gameId: string;
  @ApiProperty({
    description: 'game title e.g penaldo',
  })
  title: string;
  @ApiProperty({
    description: 'game description e.g casino game by shacks evolution',
  })
  description: string;
  @ApiProperty({
    description: 'game url',
  })
  url: string;
  @ApiProperty({
    description: 'gamee image url',
  })
  imagePath: string;
  @ApiProperty({
    description: 'game banner url',
  })
  bannerPath: string;
  @ApiProperty({
    description: 'game status',
  })
  status: boolean;
  @ApiProperty({
    description: 'game type e.g casino, slot',
  })
  type: string;
  @ApiProperty({
    description: 'game provider object',
  })
  provider: SwaggerOKProviderResponse;
  @ApiProperty({
    description: 'date game was created',
  })
  createdAt: Date;
  @ApiProperty({
    description: 'date game was updated',
  })
  updatedAt: Date;
}

export class SwaggerOKGameArrayResponse {
  @ApiProperty({
    type: [SwaggerOKGameResponse],
    description: 'Array of Game Objects',
  })
  games: SwaggerOKGameResponse[];
}

export class SwaggerCreateGameDto {
  @ApiProperty({
    description: 'game id e.g penaldo',
    example: 'Viking',
  })
  gameId: string;
  @ApiProperty({
    description: 'game title e.g penaldo',
    example: 'Viking',
  })
  title: string;
  @ApiProperty({
    description: 'game description e.g casino game by shacks evolution',
    example: 'Viking-XGames',
  })
  description: string;
  @ApiProperty({
    description: 'game url is optional depending on provider',
    example: null,
  })
  url: string;
  @ApiProperty({
    description: 'game image url',
    example: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
  })
  imagePath: string;
  @ApiProperty({
    description: 'game banner url',
    example: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
  })
  bannerPath: string;
  @ApiProperty({
    description: 'game status',
    example: true,
  })
  status: boolean;
  @ApiProperty({
    description: 'game type e.g casino, slot',
    example: 'Slots',
  })
  type: string;
  @ApiProperty({
    description: 'game provider id',
    example: 1,
  })
  providerId: number;
}

// export class SwaggerClientDto {
//   @ApiProperty({
//     description: 'client_external_key',
//     example: '3832u-9w4u-8902ehd',
//   })
//   client_external_key: string;
//   @ApiProperty({
//     description: 'username',
//     example: 'James',
//   })
//   username: string;
//   @ApiProperty({
//     description: 'currency_code',
//     example: 'NGN',
//   })
//   currency_code: string;
// }
// export class SwaggerGiftDto {
//   @ApiProperty({
//     description: 'GameName',
//     example: 'smart_soft',
//   })
//   game_name: string;
//   @ApiProperty({
//     description: 'BetLevel',
//     example: 'James',
//   })
//   bet_level: number;
//   @ApiProperty({
//     description: 'Quantity',
//     example: '45',
//   })
//   quantity: number;
//   @ApiProperty({
//     description: 'ActivationDate',
//     example: 'ISO date time',
//   })
//   activation_date: string;
//   @ApiProperty({
//     description: 'ExpirationDate',
//     example: 'ISO date time',
//   })
//   expiration_date: string;
//   @ApiProperty({
//     description: 'ActivationDate',
//     example: 'ISO date time',
//   })
//   gift_key: string;
//   @ApiProperty({
//     description: 'Lines',
//     example: 'ISO date time',
//   })
//   lines: number;
// }

// export class SwaggerGiftSpinDto {
//   @ApiProperty({
//     description: 'Client object',
//     example: 'Viking',
//   })
//   Client: SwaggerClientDto;
//   @ApiProperty({
//     description: 'List Of Gifts objects',
//     example: 'Viking',
//   })
//   Gifts: SwaggerGiftDto[];
//   @ApiProperty({
//     description: 'PortalName',
//     example: 'Viking-XGames',
//   })
//   Portalname: string;
// }

export class SaveCategoryRequestDto {
  @ApiProperty({
    description: 'The ID of the client associated with the category.',
    example: 123,
  })
  clientId: number;

  @ApiProperty({
    description: 'The unique ID of the category (optional).',
    example: 1,
    required: false,
  })
  id?: number;

  @ApiProperty({
    description: 'The name of the category.',
    example: 'Electronics',
  })
  name: string;

  @ApiProperty({
    example: 'active',
    required: false,
  })
  status?: string;

  @ApiProperty({
    required: false,
    example: 1,
  })
  priority?: boolean;
}

export class FindCategoryDto {
  @ApiProperty({
    description: 'The unique ID of the category to retrieve.',
    example: 1,
  })
  id: number;
}

export class UpdateGameRequestDto {
  @ApiProperty({
    description: 'Unique identifier of the game.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Unique game identifier.',
    example: 'game-12345',
  })
  gameId: string;

  @ApiProperty({
    description: 'Title of the game.',
    example: 'Awesome Game',
  })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the game.',
    example: 'This is an amazing game description.',
  })
  description: string;

  @ApiProperty({
    description: 'URL of the game.',
    example: 'https://example.com/game',
  })
  url: string;

  @ApiProperty({
    description: "Path to the game's image.",
    example: '/images/game-thumbnail.png',
  })
  imagePath: string;

  @ApiProperty({
    description: "Path to the game's banner image.",
    example: '/images/game-banner.png',
  })
  bannerPath: string;

  @ApiProperty({
    description: 'Indicates whether the game is active.',
    example: true,
  })
  status: boolean;

  @ApiProperty({
    description: 'Type or category of the game.',
    example: 'Action',
  })
  type: string;

  @ApiProperty({
    description: 'Unique identifier of the game provider.',
    example: 42,
  })
  providerId: number;
}

export class AddGameCategoriesDto {
  @ApiProperty({
    description: 'ID of the game to which categories will be added',
    example: 1,
  })
  gameId: number;

  @ApiProperty({
    description: 'List of category IDs to associate with the game',
    example: [2, 3, 4],
    type: [Number], // Indicates an array of numbers
  })
  categories: number[]; // Array of category IDs
}

export class CreatePromotionRequestDto {
  @ApiProperty({
    description: 'The unique ID of the client creating the promotion',
    example: 123,
  })
  clientId: number;

  @ApiProperty({
    description: 'The unique ID of the promotion (optional)',
    example: 1,
    required: false,
  })
  id?: number;

  @ApiProperty({
    description: 'The title of the promotion',
    example: 'Winter Sale',
  })
  title: string;

  @ApiProperty({
    description: 'URL of the image associated with the promotion',
    example: 'https://example.com/images/promotion.jpg',
  })
  imageUrl: string;

  @ApiProperty({
    description: 'Content or description of the promotion',
    example: 'Get up to 50% off on all items this winter!',
  })
  content: string;

  @ApiProperty({
    description: 'Start date of the promotion in a timestamp format',
    example: '2024-12-01T00:00:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  startDate: Timestamp;

  @ApiProperty({
    description: 'End date of the promotion in a timestamp format',
    example: '2025-01-01T23:59:59.000Z',
    type: 'string',
    format: 'date-time',
  })
  endDate: Timestamp;

  @ApiProperty({
    description: 'The type of promotion',
    example: 'Discount',
  })
  type: string;

  @ApiProperty({
    description: 'The targetUrl of tournament',
    example: 'https://example.com',
  })
  targetUrl: string;
}

// export class CreatePromotionRequestDto {
//   @ApiProperty({
//     description: 'The title of the promotion',
//     example: 'Winter Sale',
//   })
//   title: string;

//   @ApiProperty({
//     description: 'Content or description of the promotion',
//     example: 'Get up to 50% off on all items this winter!',
//   })
//   content: string;

//   @ApiProperty({
//     description: 'Start date of the promotion in a timestamp format',
//     example: '2024-12-01T00:00:00.000Z',
//     type: 'string',
//     format: 'date-time',
//   })
//   startDate: string;

//   @ApiProperty({
//     description: 'End date of the promotion in a timestamp format',
//     example: '2025-01-01T23:59:59.000Z',
//     type: 'string',
//     format: 'date-time',
//   })
//   endDate: string;

//   @ApiProperty({ description: 'The type of promotion', example: 'Discount' })
//   type: string;

//   @ApiProperty({
//     description: 'The target URL of the tournament',
//     example: 'https://example.com',
//   })
//   targetUrl: string;

//   static getProperties() {
//     return {
//       title: { type: 'string', example: 'Winter Sale' },
//       content: {
//         type: 'string',
//         example: 'Get up to 50% off on all items this winter!',
//       },
//       startDate: {
//         type: 'string',
//         format: 'date-time',
//         example: '2024-12-01T00:00:00.000Z',
//       },
//       endDate: {
//         type: 'string',
//         format: 'date-time',
//         example: '2025-01-01T23:59:59.000Z',
//       },
//       type: { type: 'string', example: 'Discount' },
//       targetUrl: { type: 'string', example: 'https://example.com' },
//     };
//   }
// }

export class CreateTournamentRequestDto {
  // @ApiProperty({
  //   description: 'The unique ID of the client creating the promotion',
  //   example: 123,
  // })
  // clientId: number;

  @ApiProperty({
    description: 'The unique ID of the promotion (optional)',
    example: 1,
    required: false,
  })
  id?: number;

  @ApiProperty({
    description: 'The title of the promotion',
    example: 'Winter Sale',
  })
  title: string;

  @ApiProperty({
    description: 'URL of the image associated with the promotion',
    example: 'https://example.com/images/promotion.jpg',
  })
  imageUrl: string;

  @ApiProperty({
    description: 'Content or description of the promotion',
    example: 'Get up to 50% off on all items this winter!',
  })
  content: string;

  @ApiProperty({
    description: 'Start date of the promotion in a timestamp format',
    example: '2024-12-01T00:00:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  startDate: Timestamp;

  @ApiProperty({
    description: 'End date of the promotion in a timestamp format',
    example: '2025-01-01T23:59:59.000Z',
    type: 'string',
    format: 'date-time',
  })
  endDate: Timestamp;

  @ApiProperty({
    description: 'The type of promotion',
    example: 'Discount',
  })
  type: string;
}

export class FindPromotionDto {
  @ApiProperty({
    description: 'The unique ID of the category to retrieve.',
    example: 1,
  })
  id: number;
}

export class SwaggerOKPromotionResponse {
  @ApiProperty({
    description: 'id',
  })
  id: number;

  @ApiProperty({
    description: 'title e.g penaldo',
  })
  title: string;

  @ApiProperty({
    description: 'promo image e.g penaldo',
  })
  imageUrl: string;

  @ApiProperty({
    description: 'promo content e.g casino game by shacks evolution',
  })
  content: string;

  @ApiProperty({
    description: 'promo type',
  })
  type: string;

  @ApiProperty({
    description: 'gamee image url',
  })
  endDate: string;

  @ApiProperty({
    description: 'game banner url',
  })
  startDate: string;

  @ApiProperty({
    description: 'game status',
  })
  status: string;

  @ApiProperty({
    description: 'date game was created',
  })
  createdAt: Date;
  @ApiProperty({
    description: 'date game was updated',
  })
  updatedAt: Date;
}
