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
import { InvoicesController } from './controllers/invoices.controller';
import { QuotesController } from './controllers/quote.controller';
import { PDFModule } from '@t00nday/nestjs-pdf';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PDFModule.register({
      view: {
        root: './templates',
        engine: 'pug',
      }
    }),
    TypeOrmModule.forRoot(),
  ],
  controllers: [
    ClientsController,
    PaymentsController,
    ProjectsController,
    InvoicesController,
    QuotesController,
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