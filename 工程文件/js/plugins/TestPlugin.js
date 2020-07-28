function testCommand() {
    var actor = $gameActors.actor(1);
    alert(actor._testVar);
    actor._testVar += 1;
    alert(actor._testVar);
}
