import { createCanvasHandler, decExportAsHandler, editCanvasSizeHandler, encExportAsHandler, openDocsHandler, openGithubPage, removeCanvasHandler } from "../handlers/menubar"

export const encryptionMenuBarItems = [
  {
    text: "File",
    subMenuItems: [
      { text: "Create canvas", handler: createCanvasHandler},
      { text: "Remove canvas", handler: removeCanvasHandler },
      { text: "Export as", handler: encExportAsHandler },
    ]
  },
  {
    text: "Edit",
    subMenuItems: [
      { text: "Canvas size", handler: editCanvasSizeHandler},
    ]
  },
  {
    text: "About",
    subMenuItems: [
      { text: "Help",
        subMenuItems: [
          { text: "Docs", handler: openDocsHandler },
        ]
      },
      { text: "Github page", handler: openGithubPage },
    ]
  }
]

export const decryptionMenuBarItems = [
  {
    text: "File",
    subMenuItems: [
      { text: "Create canvas", disabled: true },
      { text: "Remove canvas", disabled: true },
      { text: "Export as", handler: decExportAsHandler },
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
          { text: "Docs", handler: openDocsHandler },
        ]
      },
      { text: "Github page", handler: openGithubPage },
    ]
  }
]