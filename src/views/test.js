let objA = {
    ff: "xiaoming",
    gg: "xiaohong",
    rr: {
        xx: "xiaozhang",
        kk: [1, 2, 4],
        ll: {
            kk: 1233
        }
    },
    hh: [
        [233, 445],
        [45, 545]
    ]
}
// let nnn = JSON.parse(JSON.stringify(objA))
// nnn.rr.ll = "eeeee"
// console.log("objA",objA);
// console.log("nnn",nnn);

//螺旋数组
var spiralOrder = function (matrix) {
    if(matrix.length==0) return []
    let newArr = []
    let l = 0//1
    let t = 0//2
    let r = matrix[0].length-1//1
    let b = matrix.length-1//1
    while(l<=r&&t<=b){
        for(let i=l;i<=r;i++){
            newArr.push(matrix[t][i])
        }
        t++
        for(let i=t;i<=b;i++){
            newArr.push(matrix[i][r])
        }
        r--
        if (t > b || l > r) break
        for(let i=r;i>=l;i--){
            newArr.push(matrix[b][i])
        }
        b--
        for(let i=b;i>=t;i--){
            newArr.push(matrix[i][l])
        }
        l++
    }
    return newArr
};
// console.log(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]));


