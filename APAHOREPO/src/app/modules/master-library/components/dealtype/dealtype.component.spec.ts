import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DealTypeComponent } from "./dealtype.component";

describe("DealTypeComponent", () => {
    let component: DealTypeComponent;
    let fixture: ComponentFixture<DealTypeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DealTypeComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DealTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
