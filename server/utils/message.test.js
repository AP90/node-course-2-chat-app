//assertion library
var expect = require("expect");

var {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", () => {
    it("should generate the correct message object", () => {
        var from = "bob";
        var text = "Hey how u doin?";
        
        
        var result = generateMessage(from, text);

        expect(result.createdAt).toBeA("number");
        expect(result).toInclude({from, text});

    });
});

describe("generateLocationMessage", () => {
    it("should generate correct location object", () => {
        var from = "Admin";
        var lat = 1;
        var lon = 1;

        var result = generateLocationMessage(from, lat, lon);

        expect(result.from).toBe("Admin");
        expect(result.url).toBe(`https://www.google.com/maps?q=1,1`);
        expect(result.createdAt).toBeA("number");
    });
});