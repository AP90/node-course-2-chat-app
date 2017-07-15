const expect = require("expect");

const {Users} = require("./users");

describe("Users", () => {
    var users;

    //gets called before each test case
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "Mike",
            room: "Node Course"
        }, {
            id: "2",
            name: "Jen",
            room: "React Course"
        }, {
            id: "3",
            name: "Julie",
            room: "Node Course"
        }];
    });


    it("should add new user", () => {
        var users = new Users();
        var user = {
            id: "123",
            name: "Andrew",
            room: "The Office Fans"
        };
        var result = users.addUser(user.id, user.name, user.room);

        // checks that only one item is in array
        expect(users.users).toEqual([user]);

    });

    it("should remove a user", () => {
        var result = users.removeUser("1");

        expect(result.name).toBe("Mike");
        expect(result.room).toBe("Node Course");
        expect(users.users.length).toBe(2);
    });

    it("should not remove user", () => {
        // check array doesn't change
        var result = users.removeUser("4");

        expect(users.users.length).toBe(3);
    });

    it("should find user", () => {
        var result = users.getUser("2");

        expect(result.name).toBe("Jen");
        expect(result.room).toBe("React Course");
        expect(users.users.length).toBe(3);
    });

    it("should not find user", () => {
        //pass invalid id
        var result = users.getUser("4");

        expect(result).toNotExist();
    });




    it("should return names for node couse", () => {
        var userList = users.getUserList("Node Course");

        expect(userList).toEqual(["Mike", "Julie"]);
    });

    it("should return names for react couse", () => {
        var userList = users.getUserList("React Course");

        expect(userList).toEqual(["Jen"]);
    });
});