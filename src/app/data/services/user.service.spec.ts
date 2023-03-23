import { TestBed } from "@angular/core/testing";

import { UserServiceOld } from "./user.service";

describe("UserService", () => {
  let service: UserServiceOld;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserServiceOld);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
