type Base = {
  name: string;
  label: string;
};

type InputTextItem = Base & {
  tagName: "input";
  type: "text";
  placeholder: string;
};

type InputEmailItem = Base & {
  tagName: "input";
  type: "email";
  placeholder: string;
};

type InputTelItem = Base & {
  tagName: "input";
  type: "tel";
  placeholder: string;
};

type InputRadioItem = Base & {
  tagName: "input";
  type: "radio";
  values: { label: string; value: number }[];
};

type InputCheckboxItem = Base & {
  tagName: "input";
  type: "checkbox";
  values: { label: string; value: number }[];
};

type SelectItem = Base & {
  tagName: "select";
  options: { text: string, value: number }[];
};

type TextAreaItem = Base & {
  tagName: "textarea";
  placeholder: string;
};

type Item =
  InputTextItem |
  InputEmailItem |
  InputTelItem |
  InputRadioItem |
  InputCheckboxItem |
  SelectItem |
  TextAreaItem;

const items: Item[] = [
  {
    name: "name",
    label: "お名前",
    tagName: "input",
    type: "text",
    placeholder: "例）山田　太郎",
  },
  {
    name: "email",
    label: "メールアドレス",
    tagName: "input",
    type: "email",
    placeholder: `例）example@gmail.com`,
  },
  {
    name: "tel",
    label: "電話番号",
    tagName: "input",
    type: "tel",
    placeholder: "例）080-1234-5678",
  },
  {
    name: "address",
    label: "ご住所",
    tagName: "input",
    type: "text",
    placeholder: "例）東京都千代田区丸の内1丁目9-2",
  },
  {
    name: "contact",
    label: "ご希望の返信方法",
    tagName: "input",
    type: "radio",
    values: [
      { label: "メール", value: 0 },
      { label: "電話", value: 1 },
      { label: "どちらでも可", value: 2 },
    ],
  },
  {
    name: "time",
    label: "連絡可能な時間帯（電話）",
    tagName: "input",
    type: "checkbox",
    values: [
      { label: "09:00〜12:00", value: 0 },
      { label: "13:00〜16:00", value: 1 },
      { label: "16:00〜19:00", value: 2 },
    ],
  },
  {
    name: "inquiry_kind",
    label: "お問い合せの種類",
    tagName: "select",
    options: [
      { text: "返品について", value: 0 },
      { text: "発送について", value: 1 },
      { text: "その他", value: 2 },
    ],
  },
  {
    name: "inquiry_detail",
    label: "お問い合せ内容",
    tagName: "textarea",
    placeholder: "例）お問い合わせ内容詳細をご記入ください",
  },
];

// _____________________________________________________________________________
//

function createInputRow(item: InputTextItem | InputEmailItem | InputTelItem): string {
  return `
    <tr>
      <th>
        ${item.label}
      </th>
      <td>
        <input type="${item.type}" name="${item.name}" placeholder="${item.placeholder}" >
      </td>
    </tr>
  `;
}

function createRadioOrCheckbox(type: "radio" | "checkbox", name: string, values: {label: string, value: number}[]): string {
  return values
    .map(({ value, label }) => {
      return `
            <span class="radioItem">
              <input type="${type}" id="${name}${value}" name="${name}" value="${value}" >
              <label for="${name}${value}">${label}</label>
            </span>
          `;
    })
    .join("");
}

function createRadioCheckboxRow(item: InputRadioItem | InputCheckboxItem): string {
  return `
    <tr>
      <th>
        ${item.label}
      </th>
      <td>
        ${createRadioOrCheckbox(item.type, item.name, item.values)}
      </td>
    </tr>
  `;
}

function createSelectOptions(options: {text: string, value: number}[]): string {
  return options
    .map(({ value, text }) => {
      return `<option value="${value}">${text}</option>`;
    })
    .join("");
}

function createSelectRow(item: SelectItem): string {
  return `
    <tr>
      <th>
        ${item.label}
      </th>
      <td>
        <select>
          ${createSelectOptions(item.options)}
        </select>
      </td>
    </tr>
  `;
}

function createTextAreaRow(item: TextAreaItem): string {
  return `
    <tr>
      <th>
        ${item.label}
      </th>
      <td>
        <textarea placeholder="${item.placeholder}"></textarea>
      </td>
    </tr>
  `;
}

function createTable() {
  const list = items
    .map((item) => {
      switch (item.tagName) {
        case "input":
          if (item.type === "radio" || item.type === "checkbox") {
            return createRadioCheckboxRow(item);
          }
          return createInputRow(item)
        case "select":
          return createSelectRow(item);
        case "textarea":
          return createTextAreaRow(item);
      }
    })
    .join("");
  return `<table>${list}</table>`;
}

function createFormDom() {
  const form = document.getElementById("form");
  if (form !== null) {
    form.innerHTML = createTable();
  }
}

createFormDom();
