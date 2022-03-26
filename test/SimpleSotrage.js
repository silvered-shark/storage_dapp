const SimpleStorage = artifacts.require("SimpleStorage")

contract("SimpleStorage", () => {
    let simpleStorage = null;
    before(async() => {
        simpleStorage = await SimpleStorage.deployed();
    })
    it('Should return data', async () => {
        const result = await simpleStorage.getData()
        assert(result !== null);
    });

    it('Should store data', async () => {
        await simpleStorage.setData("hello world!");
        const result = await simpleStorage.getData()
        assert(result === "hello world!");
    })

    it('Should add value to ids array', async() => {
        await simpleStorage.addToIds(5);
        await simpleStorage.addToIds(35);
        const result = await simpleStorage.ids(0);
        assert(result.toNumber() === 5) // truffle returns big Numbers, so we need to convert them into regular js number, we used here bn.js library that provided toNumber() method.
    });

    it('Should get a value from array', async() => {
        const result = await simpleStorage.getFromIds(1);
        assert(result.toNumber() === 35);
    })
    it('Should get ids array', async() => {
        const result = await simpleStorage.getAllIds();
        const ids = result.map((res) => res.toNumber())
        assert.deepEqual(ids, [5, 35]);
    })

    it('Should get length of ids array', async() => {
        const result = await simpleStorage.getLengthOfIds()
        assert(result.toNumber() === 2);
    })
})