var expect = require("chai").expect;
var converter = require("../app/calculator")


describe("Calculator operations", ()=>{
  describe("adding", ()=>{
    it("adding two numbers", ()=>{
      var add = converter.add(2, 3)
      expect(add).to.equal(5)
    })
  });

  describe("adding", ()=>{
    it("adding two numbers", ()=>{
      var add = converter.add(2, 3)
      expect(add).to.equal(8)
    })
  });

  describe("multiplying", ()=>{
    it("multiplying two numbers", ()=>{
      var add = converter.mul(2, 3)
      expect(add).to.equal(6)
    })
  });

  describe("multiplying", ()=>{
    it("multiplying two numbers", ()=>{
      var add = converter.mul(2, 3)
      expect(add).to.equal(8)
    })
  });

  describe("Dividing", ()=>{
    it("Dividing two numbers", ()=>{
      var add = converter.div(10, 5)
      expect(add).to.equal(2)
    })
  });

  describe("Dividing", ()=>{
    it("Dividing two numbers", ()=>{
      var add = converter.div(10, 5)
      expect(add).to.equal(1)
    })
  });

  describe("Subtracting", ()=>{
    it("Subtracting two numbers", ()=>{
      var add = converter.sub(2, 3)
      expect(add).to.equal(-1)
    })
  });

  describe("Subtracting", ()=>{
    it("Subtracting two numbers", ()=>{
      var add = converter.sub(2, 3)
      expect(add).to.equal(1)
    })
  });

})