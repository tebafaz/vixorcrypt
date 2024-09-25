import { createCanvasHandler, decExportAsHandler, editCanvasSizeHandler, encExportAsHandler, openDocsHandler, openGithubPage, removeCanvasHandler, decRemoveCanvasHandler } from "../handlers/menubar"

const general = {
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

export const encMenuBarItems = [
  {
    text: "File",
    subMenuItems: [
      { text: "Create project", handler: createCanvasHandler },
      { text: "Clear project", disabled: true },
      { text: "Export as", disabled: true },
    ]
  },
  {
    text: "Edit",
    subMenuItems: [
      { text: "Canvas size", disabled: true },
    ]
  },
  general
]

export const disabledMenuBarItems = [
  {
    text: "File",
    subMenuItems: [
      { text: "Create project", disabled: true },
      { text: "Clear project", disabled: true },
      { text: "Export as", disabled: true },
    ]
  },
  {
    text: "Edit",
    subMenuItems: [
      { text: "Canvas size", disabled: true },
    ]
  },
  general
]

export const encInitMenuBarItems = [
  {
    text: "File",
    subMenuItems: [
      { text: "Create project", disabled: true },
      { text: "Clear project", handler: removeCanvasHandler },
      { text: "Export as", handler: encExportAsHandler },
    ]
  },
  {
    text: "Edit",
    subMenuItems: [
      { text: "Canvas size", handler: editCanvasSizeHandler },
    ]
  },
  general
]

export const decMenuBarItems = [
  {
    text: "File",
    subMenuItems: [
      { text: "Create project", disabled: true },
      { text: "Clear project", disabled: true },
      { text: "Export as", disabled: true },
    ]
  },
  {
    text: "Edit",
    subMenuItems: [
      { text: "Canvas size", disabled: true },
    ]
  },
  general
]

export const decInitMenuBarItems = [
  {
    text: "File",
    subMenuItems: [
      { text: "Create project", disabled: true },
      { text: "Clear project", handler: decRemoveCanvasHandler },
      { text: "Export as", handler: decExportAsHandler },
    ]
  },
  {
    text: "Edit",
    subMenuItems: [
      { text: "Canvas size", disabled: true },
    ]
  },
  general
]
