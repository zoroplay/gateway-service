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
  
    @ApiProperty({ description: 'Deposit Amount' })
    amount: number;

    @ApiProperty({ description: 'Payment method selected for deposit' })
    paymentMethod: string;
}

export class SwaggerVerifyBankAccountRequest {
    @ApiProperty({ description: 'Client ID of the operator' })
    clientId: number;
  
    @ApiProperty({ description: 'Deposit Amount' })
    accountNumber: number;

    @ApiProperty({ description: 'Payment method selected for deposit' })
    bankCode: string;
}

export class SwaggerWithdrawalRequest {
    @ApiProperty({ description: 'Client ID of the operator' })
    clientId: number;
  
    @ApiProperty({ description: 'Account number' })
    accountNumber: number;

    @ApiProperty({ description: 'Account name' })
    accountName: string;

    @ApiProperty({ description: 'Withdrawal Amount' })
    amount: number;
    
    @ApiProperty({ description: 'Bank Code' })
    bankCode?: string;

    @ApiProperty({ description: 'Bank name' })
    bankName?: string;

    @ApiProperty({ description: 'Withdrawal type' })
    type?: string;
}

export class SwaggerDepositReponse {
    @ApiProperty({ description: 'Message' })
    message: string;
  
    @ApiProperty({ description: 'Request Status (true or false)' })
    success: boolean;
  
    @ApiProperty({ description: 'Data object containing deposit link and transaction reference' })
    data?: DepositResponseData
}

export class SwaggerVerifyDepositReponse {
    @ApiProperty({ description: 'Message' })
    message: string;
  
    @ApiProperty({ description: 'Request Status (true or false)' })
    success: boolean;
  
    @ApiProperty({ description: 'HTTP Request status' })
    status?: number
}


export class SwaggerListTransactions {
    @ApiProperty({ description: 'Client ID of the operator' })
    clientId: number;
  
    @ApiProperty({ description: 'Account number' })
    userId: number;

    @ApiProperty({ description: 'Transaction Start date' })
    startDate: string;

    @ApiProperty({ description: 'Transaction End date' })
    endDate: number;
    
    @ApiProperty({ description: 'Bank Code' })
    page?: string;

    @ApiProperty({ description: 'Bank name' })
    perPage?: string;
}

export class SwaggerListTransactionResponse {
    @ApiProperty({ description: 'Message' })
    message: string;
  
    @ApiProperty({ description: 'Request Status (true or false)' })
    success: boolean;
  
    @ApiProperty({ description: 'data' })
    data?: any
}

export class SwaggerListWithdrawalRequests {
    @ApiProperty({ description: 'SBE Client ID' })
    clientId: number;
    @ApiProperty({ description: 'Start date' })
    from: string;
    @ApiProperty({ description: 'End Date' })
    to: string;
    @ApiProperty({ description: 'Status' })
    status?: number;
    @ApiProperty({ description: 'Username' })
    userId?: number;
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