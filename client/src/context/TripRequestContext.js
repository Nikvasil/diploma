import { createContext } from "react";

export const TripRequestContext = createContext({
    from: null,
    to: null,
    when: null
})