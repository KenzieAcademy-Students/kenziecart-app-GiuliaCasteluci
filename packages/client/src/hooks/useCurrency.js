const { useReducer, useContext, createContext } = require('react');

const initialState = {
    symbol: "$",
    multiplier: 1
}

const reducer = (state,action) => {
    switch (action.type) {
        case "SET_CURRENCY":
            return {
                symbol: action.payload,
                multiplier: action.payload === "$" ? 1 : 0.8
            }
    default:
        return state;
    }
}

const currencyContext = createContext();

export const CurrencyProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <currencyContext.Provider
            value= {{state, dispatch }}
        >
            {children}
        </currencyContext.Provider>
    )
}

const useCurrency = () => {
    const {state, dispatch } = useContext(currencyContext);
    
    const setCurrency = (symbol) => {
        
        dispatch({
            type: 'SET_CURRENCY',
            payload: symbol
        })
        console.log(state)
    }

    const getPrice = (amount) => {
        const priceToDisplay = (amount * state.multiplier).toFixed(2);

        return `${state.symbol}${priceToDisplay}`
    }
    return {
        state,
        setCurrency,
        getPrice
    }
}

export default useCurrency;

//symbol €
