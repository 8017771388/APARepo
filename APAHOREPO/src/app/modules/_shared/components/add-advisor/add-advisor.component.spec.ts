import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { HttpClientModule } from "@angular/common/http";

import { AddAdvisorComponent } from "./add-advisor.component";
import { AdvisorService } from "../../../admin/services/advisor.service";

describe("AddAdvisorComponent", () => {
    let component: AddAdvisorComponent;
    let fixture: ComponentFixture<AddAdvisorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddAdvisorComponent],
            imports: [HttpClientModule],
            providers: [BsModalService, BsModalRef, AdvisorService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddAdvisorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
