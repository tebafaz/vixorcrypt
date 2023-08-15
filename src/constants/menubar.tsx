export const menuItems = [
    { text : "File", subMenuItems : [
        { text : "New project" },
        { text : "Export as" },
    ]}, 
    { id : "edit", text : "Edit", subMenuItems : [
        { text : "Canvas size"},
    ]}, 
    { text : "Options", subMenuItems : [
        { text : "Algorithms", subMenuItems : [
            { text : "xor-c" },
        ]},
        { text : "Cryptography operations", subMenuItems: [
            { text : "Generate shares"},
            { text : "Merge shares"},
        ]},
    ]}, 
    { text : "About", subMenuItems: [
        { text : "Help", subMenuItems: [
            { text : "docs" },
        ]},
        { text : "Github page" },
    ]}
]
