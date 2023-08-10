console.log("Running...");

process.on("exit", function (code) {
  return console.log(`Exiting with code ${code}`);
});

throw new Error("test");
