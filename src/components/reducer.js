export const initialState = {
    basket: [],
    user: null
}
//Selector
//☆ 질문 arrow함수 한 줄로만 써야하나
export const getBasketTotal = (basket) => basket?.reduce((amount, item) =>item.price + amount, 0)
// reduce 0은 amount(prev), item(current)
    

const reducer = (state, action) => {
    console.log(action)
    switch(action.type){

        case 'ADD_TO_BASKET': return {
            ...state,
            basket: [...state.basket, action.item],
        }

        case 'REMOVE_FROM_BASKET': 
            const index = state.basket.findIndex(basketItem => basketItem.id === action.id)
            let newBasket = [...state.basket]

            if(index >= 0){
                // index에서 1개 element삭제 
                newBasket.splice(index, 1)
            }else{ 
                console.warn(`cant remove the prodect (id: ${action.id}) as its not in basket!`);
            }
        return {
            ...state,
            basket: newBasket
        }
        // App useEffect 
        case 'SET_USER':
            return{
                ...state,
                user: action.user
            }
        
        case 'EMPTY_BASKET':
           return{
               ...state,
               basket: []
           }

        default: return 
    }
}

// export vs. export default
//export는 import할 떄 정해진 이름대로만 가져옴 but as쓰면 다른 이름으로도 가능 
//exort default는 한 파일에 한 번만 사용가능 imoport할 때 이름 아무거나 사용 가능!! naming of import is completly independent in default export 독립적으로 이름 정할 수 있음
export default reducer