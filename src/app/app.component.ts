/**
 * Note: If you're having issues with "ViewEncapsulation.None",
 * you can instead add '@import "~simple-keyboard/build/css/index.css";' to your styles.scss
 * https://github.com/hodgef/simple-keyboard/issues/580
 */
import { Component } from "@angular/core";
import Keyboard from "simple-keyboard";

@Component({
  selector: "app-root",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  value = "";
  keyboard: Keyboard;

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });
  }

  onChange = (input: string) => {
    this.value = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
}
