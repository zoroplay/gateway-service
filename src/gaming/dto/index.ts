import { ApiProperty } from '@nestjs/swagger';

export class SwaggerSyncGameDto {
  @ApiProperty({
    description: 'Provider name, e.g., shack-evolution',
    example: 'tada',
  })
  provider: string;
}

export class SwaggerStartGameDto {
  @ApiProperty({
    description: 'Sportsbook Id for the game',
    example: 2,
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
    example: 'https://example.com',
  })
  homeUrl: number;
  @ApiProperty({
    description: 'Url to redirect to deposit page',
    example: 'https://example.com',
  })
  depositUrl: string;
  @ApiProperty({
    description: 'Provider Slug of the Game',
    example: 'tada-games',
  })
  providerSlug: string;
  @ApiProperty({
    description: 'Start as a Demo',
    example: false,
  })
  demo: boolean;
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
