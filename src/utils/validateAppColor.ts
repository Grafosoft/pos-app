


export const ValidateAppColor = (name: string | undefined) => {
    let object = {}

    switch (name) {
        case "cuental":
            object = {
                colorApp: "#3C3F99",
                colorProduct: "bg-purple-100",
                colorComponent: ""
            }
            break;
        case "valual":
            object = {
                colorApp: "",
                colorProduct: "",
                colorComponent: ""
            }
            break;
        case "otro":
            object = {
                colorApp: "",
                colorProduct: "",
                colorComponent: ""
            }
            break;
        default:
            object = {
                colorApp: "",
                colorProduct: "",
                colorComponent: ""
            }
    }

    return object;
}