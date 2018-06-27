import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { optionsSkatDk } from './options';
import { data } from './tables';

export class ExternalData implements InMemoryWebApiModule {

  createDb() {

      return {
        optionsSkatDk,
        data
      };
  }
}
