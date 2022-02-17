import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./modules/_shared/services/communication.services";
import { Router, NavigationEnd } from "@angular/router";
import { NO_ERRORS_SCHEMA } from "@angular/compiler";
import { of } from "rxjs";

describe("AppComponent", () => {
    let communicationService;
    const mockRouter = {
        events: (() => {
            const event = new NavigationEnd(1, "/signout", "/");
            return of(event);
        })(),
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppComponent],
            providers: [
                CommunicationService,
                { provide: Router, useValue: mockRouter },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        communicationService = TestBed.get(CommunicationService);
    }));

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'Advisor Practices Acquisition'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual("Advisor Practices Acquisition");
    });

    // it("should render title in a h1 tag", () => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     fixture.detectChanges();
    //     const compiled = fixture.debugElement.nativeElement;
    //     expect(compiled.querySelector("h1").textContent).toContain(
    //         "Welcome to Advisor Practices Acquisition!"
    //     );
    // });
});
