const RecommendationEnum = {
    OK: 1,
    CAUTION: 2,
    AVOID: 3,
    properties: {
        1: {name: "No known problems", value: 1, color: "green", className: "ok" },
        2: {name: "Caution", value: 1, color: "orange", className: "caution"},
        3: {name: "Avoid", value: 1, color: "red", className: "avoid"}
    }
}

export { RecommendationEnum };