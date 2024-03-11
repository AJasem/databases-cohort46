import setup from "./setup.js";
import transfer from "./transfer.js";
setup();
setTimeout(() => {
  transfer(101, 102, 1000, "transfer");
  transfer(101, 103, 500, "gift");
}, 1000);
