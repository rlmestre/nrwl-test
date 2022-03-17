import { BackendService } from './backend.service';
import { catchError, take } from 'rxjs/operators';
import { of } from 'rxjs';

fdescribe('BackendService', () => {
  let service: BackendService;

  beforeEach(() => {
    // I prefer not to use TestBed unless required.
    service = new BackendService();

    // Disable delay during testing.
    spyOn(Math, 'random').and.returnValue(0);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all tickets', async () => {
    const result = await service.tickets().pipe(take(1)).toPromise();
    const expected = service.storedTickets;

    expect(result).toEqual(expected);
  });

  it('should get ticket by id', async () => {
    const id = 1;

    const result = await service.ticket(id).pipe(take(1)).toPromise();

    expect(result.id).toEqual(id);
  });

  describe('update', () => {
    it('should update a ticket', async () => {
      const id = 1;
      const description = 'new description';

      const result = await service.update(id, { description })
          .pipe(take(1)).toPromise();

      expect(result.description).toEqual(description);
    });

    it('should throw if ticket not found', async () => {
      const id = 15;
      const description = 'new description';

      const result = await service.update(id, { description }).pipe(
          take(1),
          catchError(() => of(null))
      ).toPromise();

      expect(result).toBeNull();
    });
  });
});
