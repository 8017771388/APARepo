import { TestBed, async, inject } from "@angular/core/testing";
import { AuthGuardService } from "./auth.guard";

describe("AuthGuardService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthGuardService],
        });
    });

    it("should ...", inject([AuthGuardService], (guard: AuthGuardService) => {
        expect(guard).toBeTruthy();
    }));
});
