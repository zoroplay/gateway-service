import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SwaggerPaymentMethodRequest {
  @ApiProperty({ description: 'Client ID of the operator' })
  clientId: number;

  @ApiProperty({ description: 'Payment method title' })
  title: string;

  @ApiProperty({ description: 'Payment method provider name' })
  provider: string;

  @ApiProperty({ description: 'Secret Key for the payment method if any' })
  secretKey?: string;

  @ApiProperty({ description: 'Public Key for the payment method if any' })
  publicKey: string;

  @ApiProperty({ description: 'Merchant ID or contract code' })
  merchantId: string;

  @ApiProperty({ description: 'API base url of the payment method' })
  baseUrl: string;

  @ApiProperty({ description: 'Status of payment method (active or inactive' })
  status: number;

  @ApiProperty({ description: 'If the payment method should be used for disbursement' })
  forDisbursement: number;

  @ApiProperty({ description: 'ID of the payment method. Only available when editing' })
  id: number;
}

export class SwaggerPaymentMethodResponse {
    @ApiProperty({ description: 'Response status' })
    success: boolean;
    
    @ApiProperty({ description: 'Server Message' })
    message: string;
  
    @ApiProperty({ description: 'Request Status (true or false)' })
    status: boolean;
}

export class SwaggerGetPaymentMethodResponse {
    @ApiProperty({ description: 'Message' })
    message: string;
  
    @ApiProperty({ description: 'Request Status (true or false)' })
    status: boolean;
  
    data?: PaymentMethod[];
}

export class SwaggerInitiateDepositRequest {
    @ApiProperty({ description: 'Client ID of the operator' })
    clientId: number;
    
    @ApiProperty({ description: 'Authenticated User ID' })
    userId: number;
  
    @ApiProperty({ description: 'Deposit Amount' })
    amount: number;

    @ApiProperty({ description: 'Payment method selected for deposit' })
    paymentMethod: string
}

export class SwaggerDepositReponse {
    @ApiProperty({ description: 'Message' })
    message: string;
  
    @ApiProperty({ description: 'Request Status (true or false)' })
    success: boolean;
  
    @ApiProperty({ description: 'Data object containing deposit link and transaction reference' })
    data?: DepositResponseData
}

interface DepositResponseData {
    link: string;
    transactionRef: string;
}


interface PaymentMethod {
    title: string;
    provider: string;
    secretKey: string;
    publicKey: string;
    merchantId: string;
    baseUrl: string;
    status: number;
    forDisbursement: number;
    id: number;
}