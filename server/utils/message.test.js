//assertion library
var expect = require("expect");

var {generateMessage} = require("./message");

describe("generateMessage", () => {
    it("should generate the correct message object", () => {
        var from = "bob";
        var text = "Hey how u doin?";
        
        
        var result = generateMessage(from, text);

        expect(result.createdAt).toBeA("number");
        expect(result).toInclude({from, text});

    });
});