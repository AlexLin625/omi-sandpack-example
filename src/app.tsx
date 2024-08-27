import { h, tag, signal, Component } from "omi";
import css from "./app.css?raw";
import { tailwind } from "./tailwind";
import { SandpackWrapper } from "./sandpackWrapper";

@tag("my-app")
export default class extends Component {
  static css = [tailwind, css];

  constructor() {
    super();
  }

  render() {
    return (
      <>
        <div class="flex flex-col items-center justify-start gap-4 px-8 py-4 w-full h-full">
          <h1 class="text-3xl font-bold">
            OMI-with-sandpack
          </h1>

          <SandpackWrapper />
        </div>
      </>
    );
  }
}
