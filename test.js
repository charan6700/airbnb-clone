const obj = {
    one: "djlfd",
    two: {
        three: "ldkjfkld",
        fourth: [{name: "kdjfd", age: 33}]
    }
}

obj.two.fourth[0].age = 99;

console.log(obj.two.fourth[0].age);