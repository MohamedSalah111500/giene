import * as userApi from "./userApi";
import * as urls from  "./apiURLs";


import MockAdapter from "axios-mock-adapter";
import axios from "axios";

describe("Test that userApi is called correctly", () => {
  it("User Login", async () => {
    //mock api call
    var mock = new MockAdapter(axios);
    mock.onPost(`/${urls.USER_API.BASE_URL}?action=login`).reply(200);

    //call api
    userApi.login();

    //assert
    expect(mock.history.post.length).toBe(0);
  });

});
