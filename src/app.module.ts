import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import {getConnection} from "typeorm";
import { ClientsController } from './controllers/clients.controller';
import { RolladeckService } from './services/rolladeck.service';
import { StripeService } from './services/stripe.service';
import { AccountingService } from './services/accounting.service';
import { ProjectService } from './services/project.service';
import { PaymentsController } from './controllers/payments.controller';
import { ProjectsController } from './controllers/projects.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
  ],
  controllers: [
    ClientsController,
    PaymentsController,
    ProjectsController,
  ],
  providers: [
    RolladeckService, 
    StripeService,
    AccountingService,
    ProjectService,
  ],
})
export class AppModule {
  async configure(consumer: MiddlewareConsumer) {
      await this.setEntityConnections();
  }

  async setEntityConnections() {
      const connection = await getConnection();
      connection.entityMetadatas.forEach(entity => {
          (entity.target as any).useConnection(connection);
      })
  }
}