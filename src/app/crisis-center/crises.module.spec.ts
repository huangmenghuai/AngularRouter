import { CrisisCenterModule } from './crisis-center.module';

describe('CrisisCenterModule', () => {
  let crisesModule: CrisisCenterModule;

  beforeEach(() => {
    crisesModule = new CrisisCenterModule();
  });

  it('should create an instance', () => {
    expect(crisesModule).toBeTruthy();
  });
});
