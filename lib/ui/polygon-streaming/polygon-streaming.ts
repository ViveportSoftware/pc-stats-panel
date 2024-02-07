import { Base, getValueByType, INPUT_TYPE } from "../base";
import { STREAMABLE_MODEL_ATTR, STREAM_CONTROLLER_ATTR } from "./constants";

class PolygonStreaming extends Base {
  pc: any;
  app: any;
  streamController: any;
  streamableModel: any;
  cameraEntity: any;

  constructor(pc: any, app: any) {
    super();
    this.pc = pc;
    this.app = app;
  }

  init() {
    const container = this.createContainer("ps-stats", "PolygonStreaming", {
      right: "0",
    });
    document.body.appendChild(container);

    const itemList = container.querySelector("#ps-stats-item-list");
    if (itemList) {
      const reloadButton = this.createButtonItem("btn-reload", "", "reload");
      itemList?.appendChild(reloadButton);

      // stream controller
      const streamControllerEntities = this.app.root.find((entity: any) => {
        return entity.script && entity.script.has("streamController");
      });
      if (streamControllerEntities && streamControllerEntities.length) {
        const streamControllerEntity = streamControllerEntities[0];
        const streamController = streamControllerEntity.script.streamController;
        this.streamController = streamController;
        if (streamController) {
          const titleStreamController =
            this.createItemTitle("StreamController");
          itemList?.appendChild(titleStreamController);

          for (const [attrKey, attr] of Object.entries(
            STREAM_CONTROLLER_ATTR
          )) {
            const value = streamController[attrKey];
            let item;

            switch ((attr as any).input) {
              case INPUT_TYPE.NONE:
                break;
              case INPUT_TYPE.TEXT:
                item = this.createInputItem(attrKey, attr.title, value);
                break;
              case INPUT_TYPE.CHECKBOX:
                item = this.createCheckBoxItem(attrKey, attr.title, value);
                break;
              case INPUT_TYPE.SELECT:
                item = this.createSelectItem(
                  attrKey,
                  attr.title,
                  value,
                  (attr as any).options
                );
                break;
              default:
                item = this.createItem(
                  attrKey,
                  attr.title,
                  getValueByType(value, attr.type)
                );
                break;
            }

            if (item) {
              itemList?.appendChild(item);
            }
          }
        }
      }

      // streamable model
      const streamableModelEntities = this.app.root.find((entity: any) => {
        return entity.script && entity.script.has("streamableModel");
      });

      if (streamableModelEntities.length) {
        for (const streamableModelEntity of streamableModelEntities) {
          const streamableModel = streamableModelEntity.script.streamableModel;

          if (streamableModel) {
            const titleStreamableModel =
              this.createItemTitle("StreamableModel");
            itemList?.appendChild(titleStreamableModel);

            for (const [attrKey, attr] of Object.entries(
              STREAMABLE_MODEL_ATTR
            )) {
              const value = streamableModel[attrKey];
              let item;

              switch ((attr as any).input) {
                case INPUT_TYPE.TEXT:
                  item = this.createInputItem(attrKey, attr.title, value);
                  break;
                case INPUT_TYPE.CHECKBOX:
                  item = this.createCheckBoxItem(attrKey, attr.title, value);
                  break;
                default:
                  item = this.createItem(
                    attrKey,
                    attr.title,
                    getValueByType(value, attr.type)
                  );
                  break;
              }

              if (item) {
                itemList?.appendChild(item);
              }
            }
          }
        }
      }
    }
    this.fetchCurrentCamera();
    this.bindEvents();
  }

  fetchCurrentCamera() {
    const cameraEntities = this.app.root.find((entity: any) => {
      return entity.camera;
    });
    this.cameraEntity = cameraEntities[0];
    if (!this.cameraEntity) {
      console.warn("camera is undefined");
    }
  }

  bindEvents() {
    document.getElementById("btn-reload")?.addEventListener("click", () => {
      console.error("btn-reload click");
    });
  }
}

export { PolygonStreaming };
