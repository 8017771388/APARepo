import {UserConfig} from './userConfig.model';

export class UserService {
    config: UserConfig;
    init: any;
    currentUser: any;
    dummyToProtectCommas: number;

    constructor() {
        this.config = new UserConfig();
    }
}
