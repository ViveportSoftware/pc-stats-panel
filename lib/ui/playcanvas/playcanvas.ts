import { STATS, ATTRIBUTES, METHODS } from "./constants";
import { getValueByType } from "../base/utils";
import { Base } from "../base";

class PlayCanvas extends Base {
  pc: any;
  app: any;
  collectedMeshInstances: any[] = [];
  intervalVisualizeMesh: any;

  constructor(pc: any, app: any) {
    super();
    this.pc = pc;
    this.app = app;
  }

  init() {
    const stats = this.app.stats as any;

    const container = this.createContainer("pc-stats", "PlayCanvas");
    document.body.appendChild(container);

    const itemList = container.querySelector("#pc-stats-item-list");

    for (const [stat, title] of Object.entries(STATS)) {
      console.log(stat, title);
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
              getValueByType(value as any, attribute.type)
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
              getValueByType(stats[stat][method], (settings as any).type)
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

  update() {
    if (this.app) {
      const stats = this.app.stats as any;
      // stats
      for (const [stat] of Object.entries(STATS)) {
        // attributes
        for (const [key, value] of Object.entries(stats[stat])) {
          const attributeKey = `${stat}.${key}`;
          const attribute = (ATTRIBUTES as any)[attributeKey];
          if (attribute) {
            const item = document.getElementById(attributeKey);
            if (item) {
              const newValue = getValueByType(value as any, attribute.type);
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
                const newValue = getValueByType(value, (settings as any).type);
                item.innerHTML = newValue;
              }
            }
          }
        }
      }
    }
  }

  bindEvents() {
    this.bindVisualizeMesh();
  }

  bindVisualizeMesh() {
    const element = document.getElementById("option-visualize-mesh");
    if (element) {
      element.addEventListener("change", (e: any) => {
        const isVisualizeMesh = e.target.checked;

        if (isVisualizeMesh && !this.intervalVisualizeMesh) {
          this.intervalVisualizeMesh = setInterval(() => {
            this.visualizeMesh();
          }, 200);
        } else {
          if (this.intervalVisualizeMesh) {
            clearInterval(this.intervalVisualizeMesh);
          }
        }
      });
    }
  }

  visualizeMesh() {
    console.error("visualizeMesh");
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

export { PlayCanvas };
