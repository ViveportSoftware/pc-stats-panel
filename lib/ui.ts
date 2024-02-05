import bootstrapCSSUrl from "bootstrap/dist/css/bootstrap.min.css?url";
import bootstrapJSUrl from "bootstrap/dist/js/bootstrap.min.js?url";

import { STATS, ATTRIBUTES, METHODS } from "./constants";
import { getValueByType } from "./utils";

class UI {
  pc: any;
  collectedMeshInstances: any[] = [];
  app: any;

  constructor(pc: any, app: any) {
    this.pc = pc;
    this.app = app;
  }

  init() {
    const stats = this.app.stats as any;
    this.injectBootstrap();

    const container = this.createContainer();
    document.body.appendChild(container);

    const itemList = container.querySelector("#item-list");

    for (const [stat, title] of Object.entries(STATS)) {
      const itemTitle = this.createItemTitle(title);
      itemList?.appendChild(itemTitle);

      // attributes
      if (stats[stat]) {
        for (const [key, value] of Object.entries(stats[stat])) {
          const attributeKey = `${stat}.${key}`;
          const attribute = (ATTRIBUTES as any)[attributeKey];
          if (attribute) {
            const item = this.createItem(
              attributeKey,
              attribute.title,
              getValueByType(value as any, attribute.valueType)
            );
            itemList?.appendChild(item);
          }
        }
      }

      // methods
      const methods = (METHODS as any)[stat];
      if (methods) {
        for (const [method, settings] of Object.entries(methods)) {
          if (stats[stat][method]) {
            const methodKey = `${stat}-${method}`;

            const item = this.createItem(
              methodKey,
              (settings as any).title,
              getValueByType(stats[stat][method], (settings as any).valueType)
            );

            itemList?.appendChild(item);
          }
        }
      }
    }
    // options
    const titleVisualizeMesh = this.createItemTitle("RENDERING OPTIONS");
    itemList?.appendChild(titleVisualizeMesh);

    const itemVisualizeMesh = this.createCheckBoxItem(
      "option-visualize-mesh",
      "Visualize mesh"
    );
    itemList?.appendChild(itemVisualizeMesh);

    //
    this.bindEvents();
  }

  update(stats: any) {
    if (stats) {
      // stats
      for (const [stat] of Object.entries(STATS)) {
        // attributes
        for (const [key, value] of Object.entries(stats[stat])) {
          const attributeKey = `${stat}.${key}`;
          const attribute = (ATTRIBUTES as any)[attributeKey];
          if (attribute) {
            const item = document.getElementById(attributeKey);
            if (item) {
              const newValue = getValueByType(
                value as any,
                attribute.valueType
              );
              item.innerHTML = newValue;
            }
          }
        }

        // methods
        const methods = (METHODS as any)[stat];
        if (methods) {
          for (const [method, settings] of Object.entries(methods)) {
            if (stats[stat][method]) {
              const methodKey = `${stat}-${method}`;
              const item = document.getElementById(methodKey);
              if (item) {
                const value = stats[stat][method];
                const newValue = getValueByType(
                  value,
                  (settings as any).valueType
                );
                item.innerHTML = newValue;
              }
            }
          }
        }
      }
    }
  }

  injectBootstrap() {
    const bootstrapCSS = document.createElement("link");
    bootstrapCSS.href = bootstrapCSSUrl;
    bootstrapCSS.rel = "stylesheet";
    document.body.appendChild(bootstrapCSS);

    const bootstrapJS = document.createElement("script");
    bootstrapJS.src = bootstrapJSUrl;
    document.body.appendChild(bootstrapJS);

    const customCSS = document.createElement("style");
    customCSS.innerHTML = `
      .list-group {
          --bs-list-group-item-padding-x: 0.5rem;
          --bs-list-group-item-padding-y: 0.2rem;
      }
      `;
    document.body.appendChild(customCSS);
  }

  createContainer(): HTMLElement {
    const container = document.createElement("div");
    container.style.padding = ".4rem";
    container.style.width = "auto";
    container.style.position = "absolute";
    container.style.zIndex = "1000";
    container.style.backgroundColor = "rgba(0,0,0,.4)";
    container.style.left = "0";
    container.style.top = "0";
    container.style.maxHeight = "64rem";
    container.style.overflow = "auto";

    const innerHTML = `
    <div class="accordion accordion-flush opacity-75" id="pc-stats">
        <div class="accordion-item">
            <div class="accordion-header" style="min-width:16rem">
                <button class="accordion-button" style="padding:.5rem" type="button" data-bs-toggle="collapse" data-bs-target="#item-list-container" aria-expanded="true" aria-controls="item-list-container">
                    PlayCanvas Stats
                </button>
            </div>
            <div id="item-list-container" class="accordion-collapse collapse show" data-bs-parent="#pc-stats">
                <div class="accordion-body">
                    <ol class="list-group" id="item-list">
                    </ol>
                </div>
            </div>
        </div>
    </div>
    `;

    container.innerHTML = innerHTML;

    return container;
  }

  createItemTitle = (title: string): HTMLElement => {
    const item = document.createElement("li");
    item.className =
      "list-group-item list-group-item-info d-flex justify-content-between align-items-center";
    item.innerHTML = title;
    return item;
  };

  createItem = (id: string, title: string, value: string) => {
    const item = document.createElement("li");
    item.className =
      "list-group-item d-flex justify-content-between align-items-center";
    item.innerHTML = `
      <small>${title}</small>
      <span class="badge bg-primary rounded-pill" id="${id}">${value}</span>
      `;
    return item;
  };

  createCheckBoxItem = (id: string, title: string): HTMLElement => {
    const item = document.createElement("li");
    item.className = "list-group-item";
    item.innerHTML = `
        <input class="form-check-input me-1" type="checkbox" value="" id="${id}">
        <label class="form-check-label" for="option-visualize-mesh">${title}</label>
      `;
    return item;
  };

  bindEvents() {
    this.bindVisualizeMesh();
  }

  bindVisualizeMesh() {
    const element = document.getElementById("option-visualize-mesh");
    if (element) {
      element.addEventListener("change", (e: any) => {
        const isVisualizeMesh = e.target.checked;
        let interval;
        if (isVisualizeMesh && !interval) {
          interval = setInterval(() => {
            this.visualizeMesh();
          }, 200);
        } else {
          if (interval) {
            clearInterval(interval);
          }
        }
      });
    }
  }

  visualizeMesh() {
    if (this.collectedMeshInstances.length) {
      this.collectedMeshInstances.splice(0, this.collectedMeshInstances.length);
    }

    this.traverseMeshes(this.app.root);

    for (const meshInstance of this.collectedMeshInstances) {
      if (!(meshInstance as any).isVisualized) {
        const material = new this.pc.StandardMaterial();
        const r = Math.random();
        const g = Math.random();
        const b = Math.random();

        material.diffuse.set(r, g, b);
        material.update();
        meshInstance.material = material;
        (meshInstance as any).isVisualized = true;
      }
    }
  }

  traverseMeshes(entity: any) {
    if (entity && entity.enabled) {
      if (entity.children && entity.children.length > 0) {
        for (const child of entity.children) {
          this.traverseMeshes(child);
        }
      }
      if (entity.render && entity.render.enabled) {
        for (const meshInstance of entity.render.meshInstances) {
          this.collectedMeshInstances.push(meshInstance);
        }
      }
    }
  }
}

export { UI };
