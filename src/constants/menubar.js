import { dummyCreateCanvas, dummyDocs, dummyGithub } from "../handlers/dummy";
import { openCreateCanvas } from "../handlers/modal";

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
      { text: "Github page", handler: dummyGithub },
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
          { text: "Docs", handler: dummyDocs },
        ]
      },
      { text: "Github page", handler: dummyGithub },
    ]
  }
]