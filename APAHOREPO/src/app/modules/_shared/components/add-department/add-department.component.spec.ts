import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { AddDepartmentComponent } from "./add-department.component";

describe("AddDepartmentComponent", () => {
    let component: AddDepartmentComponent;
    let fixture: ComponentFixture<AddDepartmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddDepartmentComponent],
            providers: [BsModalService, BsModalRef],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddDepartmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
