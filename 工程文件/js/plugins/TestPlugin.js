function testCommand() {
    var truecount = 0;
    var falsecount = 0;
    var prob = 0.7;
    for (var i = 0; i < 100; i++) {
        if (TetrisManager.randomnize(prob)) {
            truecount += 1;
        } else {
            falsecount += 1;
        }
    }
    console.log("true: " + truecount);
    console.log("false: " + falsecount);
    console.log("============================");
}
