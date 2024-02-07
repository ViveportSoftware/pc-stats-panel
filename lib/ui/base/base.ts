class Base {
  id: string = "";
  constructor() {}

  createContainer(
    id: string,
    title: string = "",
    style: any = {}
  ): HTMLElement {
    this.id = id;
    const container = document.createElement("div");
    container.style.padding = style.padding || ".4rem";
    container.style.width = style.width || "auto";
    container.style.display = "none";
    container.style.position = "absolute";
    container.style.zIndex = style.zIndex || "1000";
    container.style.backgroundColor = style.backgroundColor || "rgba(0,0,0,.4)";
    if (style.right) {
      container.style.right = style.right || "0";
    } else {
      container.style.left = "0";
    }
    container.style.top = "0";
    container.style.maxHeight = style.maxHeight || "48rem";
    container.style.overflow = style.overflow || "auto";
    container.id = id;

    const innerHTML = `
    <div class="accordion accordion-flush opacity-75">
        <div class="accordion-item">
            <div class="accordion-header" style="min-width:16rem">
                <button class="accordion-button" style="padding:.5rem" type="button" data-bs-toggle="collapse" data-bs-target="#${id}-item-list-container" aria-expanded="true" aria-controls="${id}-item-list-container">
                    ${title}
                </button>
            </div>
            <div id="${id}-item-list-container" class="accordion-collapse collapse show" data-bs-parent="#${id}">
                <div class="accordion-body">
                    <ol class="list-group" id="${id}-item-list">
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
      <span class="badge bg-secondary rounded-pill" id="${id}">${value}</span>
      `;
    return item;
  };

  createButtonItem = (
    id: string,
    title: string,
    value: string
  ): HTMLElement => {
    const item = document.createElement("li");
    item.className =
      "list-group-item d-flex justify-content-between align-items-center";
    item.innerHTML = `
      <small>${title}</small>
      <button type="button" class="btn btn-secondary btn-sm" id="${id}">${value}</button>
      `;
    return item;
  };

  createInputItem = (id: string, title: string, value: string): HTMLElement => {
    const item = document.createElement("li");
    item.className =
      "list-group-item d-flex justify-content-between align-items-center";
    item.innerHTML = `
      <small>${title}</small>
      <input style="width:8rem" class="form-control form-control-sm me-1" type="text" value="${value}" id="${id}" placeholder="${value}">
      `;
    return item;
  };

  createCheckBoxItem = (
    id: string,
    title: string,
    checked: boolean = false
  ): HTMLElement => {
    const item = document.createElement("li");
    item.className =
      "list-group-item d-flex justify-content-between align-items-center";
    item.innerHTML = `
      <small>${title}</small>
      <input class="form-check-input me-1" type="checkbox" checked="${
        checked ? "checked" : ""
      }" value="" id="${id}">
      `;
    return item;
  };

  createSelectItem = (
    id: string,
    title: string,
    value: string,
    options: string[] = []
  ) => {
    const item = document.createElement("li");
    item.className =
      "list-group-item d-flex justify-content-between align-items-center";

    let optionHTML = "";

    for (const option of options) {
      optionHTML += `<option value="${option}" ${
        option == value ? "selected" : ""
      }>${option}</option>`;
    }

    item.innerHTML = `
      <small>${title}</small>
      <select style="width:10rem" class="form-select form-select-sm" id="${id}">
        ${optionHTML}
      </select>
      `;
    return item;
  };

  show() {
    const container = document.getElementById(this.id);
    if (container) {
      container.style.display = "block";
    }
  }
}

export { Base };
