import { openCreateCanvas } from "../handlers/canvas";

export const encryptionMenuBarItems = [
  {
    text: "File",
    subMenuItems: [
      { text: "Create canvas", handler: openCreateCanvas},
      { text: "Remove canvas" },
      { text: "Export as" },
    ]
  },
  {
    text: "Edit",
    subMenuItems: [
      { text: "Canvas size"},
    ]
  },
  {
    text: "About",
    subMenuItems: [
      { text: "Help",
        subMenuItems: [
          { text: "Docs", },
        ]
      },
      { text: "Github page" },
    ]
  }
]

export const decryptionMenuBarItems = [
  {
    text: "File",
    subMenuItems: [
      { text: "Create canvas", handler: openCreateCanvas, disabled: true },
      { text: "Remove canvas" },
      { text: "Export as" },
    ]
  },
  {
    text: "Edit",
    subMenuItems: [
      { text: "Canvas size", disabled: true },
    ]
  },
  {
    text: "About",
    subMenuItems: [
      { text: "Help",
        subMenuItems: [
          { text: "Docs" },
        ]
      },
      { text: "Github page" },
    ]
  }
]