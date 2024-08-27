import {
  Component,
  tag,
  h,
  createRef,
  OmiProps,
} from "omi";
import {
  loadSandpackClient,
  SandpackClient,
  SandboxSetup,
  ClientOptions,
} from "@codesandbox/sandpack-client";
import css from "./app.css?raw";
import { tailwind } from "./tailwind";

@tag("sandpack-wrapper")
export class SandpackWrapper extends Component {
  static css = [tailwind, css];

  iframeObject = createRef();
  client: SandpackClient | undefined = undefined;

  async setupClient() {
    const content: SandboxSetup = {
      files: {
        "package.json": {
          code: JSON.stringify({
            name: "omi-starter-spa",
            private: true,
            version: "0.0.0",
            type: "module",
            scripts: {
              start: "vite",
              dev: "vite",
              build: "tsc && vite build",
              preview: "vite preview",
              p: "prettier --write src",
            },
            dependencies: {
              omi: "latest",
              "omi-router": "latest",
              "omi-suspense": "latest",
            },
            devDependencies: {
              autoprefixer: "^10.4.16",
              eslint: "^8.45.0",
              postcss: "^8.4.31",
              prettier: "3.0.3",
              sass: "^1.55.0",
              tailwindcss: "^3.3.3",
              "ts-node": "^10.9.1",
              typescript: "^5.0.2",
              vite: "^4.4.5",
            },
          }),
        },

        "/src/main.tsx": {
          code: `
import { render, h, tag, signal, Component } from "omi";

@tag("o-counter")
class Counter extends Component {
  count = signal(0);

  add = () => {
    this.count.value++;
  };

  render() {
    return (
      <div>
        <button onClick={this.add}>add</button>
        <span>{this.count}</span>
      </div>
    );
  }
}

render(<o-counter />, document.getElementById("app")!);
`,
        },

        "index.html": {
          code: `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Omi + TS</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

          `,
        },
      },

      entry: "src/main.tsx",
    };

    const options: ClientOptions = {};

    this.client = await loadSandpackClient(
      this.iframeObject.current as HTMLIFrameElement,
      content,
      options
    );

    this.client.updateSandbox(content);
  }

  constructor() {
    super();
  }

  installed(): void {
    this.setupClient();
  }

  render(props: {} | OmiProps<{}, any>) {
    return (
      <iframe
        ref={this.iframeObject}
        class="h-[600px] w-[900px]"
      ></iframe>
    );
  }
}
