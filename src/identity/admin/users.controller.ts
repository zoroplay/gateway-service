import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IDENTITY_SERVICE_NAME, IdentityServiceClient, protobufPackage } from '../identity.pb';
import { ClientGrpc } from '@nestjs/microservices';

@ApiTags('BackOffice')
@Controller('admin')
export class UsersController {
    private svc: IdentityServiceClient;

    @Inject(protobufPackage)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<IdentityServiceClient>(IDENTITY_SERVICE_NAME);
    }

    
}
